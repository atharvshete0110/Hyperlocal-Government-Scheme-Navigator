import json
import os
from typing import List, Dict, Optional

class SchemeDatabase:
    """Manages government schemes data and matching logic"""
    
    def __init__(self, schemes_file: str = "../data/schemes.json"):
        """Initialize database by loading schemes"""
        self.schemes_file = schemes_file
        self.schemes = self._load_schemes()
        
    def _load_schemes(self) -> List[Dict]:
        """Load schemes from JSON file"""
        try:
            # Try different path variations
            paths_to_try = [
                self.schemes_file,
                os.path.join(os.path.dirname(__file__), self.schemes_file),
                os.path.join(os.path.dirname(__file__), "../data/schemes.json"),
                "/home/claude/scheme-navigator/data/schemes.json"
            ]
            
            for path in paths_to_try:
                if os.path.exists(path):
                    with open(path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        return data.get("schemes", [])
            
            print(f"⚠️  Warning: Could not find schemes file. Tried: {paths_to_try}")
            return []
            
        except Exception as e:
            print(f"❌ Error loading schemes: {e}")
            return []
    
    def get_all_schemes(self) -> List[Dict]:
        """Get all active schemes"""
        return [s for s in self.schemes if s.get("active", True)]
    
    def get_scheme_by_id(self, scheme_id: str) -> Optional[Dict]:
        """Get a specific scheme by ID"""
        for scheme in self.schemes:
            if scheme.get("id") == scheme_id:
                return scheme
        return None
    
    def get_schemes_by_category(self, category: str) -> List[Dict]:
        """Get schemes filtered by category"""
        return [
            s for s in self.schemes 
            if s.get("category", "").lower() == category.lower() and s.get("active", True)
        ]
    
    def match_schemes(self, user_profile: Dict, category: Optional[str] = None) -> List[Dict]:
        """
        Match schemes based on user profile using rule-based logic
        This is a simplified RAG approach - can be enhanced with embeddings
        """
        matched = []
        
        for scheme in self.schemes:
            if not scheme.get("active", True):
                continue
            
            # Category filter
            if category and scheme.get("category", "").lower() != category.lower():
                continue
            
            # Calculate match score
            score = self._calculate_match_score(scheme, user_profile)
            
            if score > 0:
                matched.append({
                    **scheme,
                    "match_score": score,
                    "match_reasons": self._get_match_reasons(scheme, user_profile)
                })
        
        # Sort by match score
        matched.sort(key=lambda x: x["match_score"], reverse=True)
        
        return matched
    
    def _calculate_match_score(self, scheme: Dict, profile: Dict) -> float:
        """Calculate how well a scheme matches user profile (0-100)"""
        score = 0
        eligibility = scheme.get("eligibility", {})
        
        # Occupation matching
        if profile.get("occupation"):
            occupation = profile["occupation"].lower()
            if "occupation" in eligibility:
                eligible_occupations = eligibility["occupation"]
                if isinstance(eligible_occupations, list):
                    if occupation in [o.lower() for o in eligible_occupations]:
                        score += 30
            
            # Special cases
            if profile.get("is_farmer"):
                if "agriculture" in scheme.get("category", "").lower():
                    score += 25
            
            if profile.get("is_student"):
                if "education" in scheme.get("category", "").lower() or \
                   "skill" in scheme.get("category", "").lower():
                    score += 25
        
        # Age matching
        if profile.get("age"):
            age = profile["age"]
            if "age" in eligibility:
                age_criteria = eligibility["age"]
                if isinstance(age_criteria, str):
                    # Parse age range like "18-40 years"
                    if "-" in age_criteria:
                        try:
                            min_age, max_age = map(lambda x: int(x.split()[0]), age_criteria.split("-"))
                            if min_age <= age <= max_age:
                                score += 20
                        except:
                            pass
                    elif "above" in age_criteria.lower():
                        try:
                            min_age = int(age_criteria.split()[0])
                            if age >= min_age:
                                score += 20
                        except:
                            pass
        
        # Land ownership (for agricultural schemes)
        if profile.get("land_ownership") and eligibility.get("land_ownership"):
            if eligibility["land_ownership"] == "yes":
                score += 15
        
        # Economic status
        if profile.get("income"):
            income_lower = profile["income"].lower()
            if "bpl" in income_lower or "below poverty" in income_lower:
                if eligibility.get("economic_status") == "below poverty line":
                    score += 25
        
        # Location (urban/rural)
        if profile.get("location"):
            location_lower = profile["location"].lower()
            if "location" in eligibility:
                eligible_location = eligibility["location"].lower()
                if eligible_location in location_lower or location_lower in eligible_location:
                    score += 15
        
        # Bank account
        if profile.get("has_bank_account"):
            if eligibility.get("bank_account"):
                score += 10
        
        # Base score for all schemes
        score += 5
        
        return min(score, 100)  # Cap at 100
    
    def _get_match_reasons(self, scheme: Dict, profile: Dict) -> List[str]:
        """Get human-readable reasons why scheme matches"""
        reasons = []
        
        if profile.get("occupation"):
            if profile["occupation"].lower() in str(scheme.get("eligibility", {})).lower():
                reasons.append(f"Matches your occupation: {profile['occupation']}")
        
        if profile.get("is_farmer") and "agriculture" in scheme.get("category", "").lower():
            reasons.append("Designed for farmers like you")
        
        if profile.get("age"):
            reasons.append("You meet the age criteria")
        
        if profile.get("location"):
            if scheme.get("eligibility", {}).get("location"):
                reasons.append(f"Available in {profile['location']} area")
        
        if not reasons:
            reasons.append("General eligibility scheme")
        
        return reasons
    
    def match_schemes_from_conversation(self, message: str, profile: Dict) -> List[Dict]:
        """
        Match schemes based on conversation context
        This extracts intent from the message
        """
        message_lower = message.lower()
        
        # Detect category intent
        category_keywords = {
            "Agriculture": ["farm", "farmer", "crop", "agriculture", "खेती", "किसान"],
            "Healthcare": ["health", "medical", "hospital", "insurance", "स्वास्थ्य", "बीमारी"],
            "Housing": ["house", "home", "housing", "shelter", "घर", "मकान"],
            "Employment": ["job", "employment", "business", "enterprise", "रोजगार", "व्यवसाय"],
            "Education": ["education", "study", "school", "skill", "शिक्षा", "पढ़ाई"],
            "Social Security": ["pension", "retirement", "old age", "पेंशन", "बुढ़ापा"],
            "Financial Inclusion": ["bank", "account", "loan", "credit", "बैंक", "ऋण"]
        }
        
        detected_category = None
        for category, keywords in category_keywords.items():
            if any(keyword in message_lower for keyword in keywords):
                detected_category = category
                break
        
        # Update profile based on message
        enhanced_profile = profile.copy()
        
        # Detect occupation from message
        if any(word in message_lower for word in ["farmer", "किसान", "खेती"]):
            enhanced_profile["is_farmer"] = True
            enhanced_profile["occupation"] = "farmer"
        
        if any(word in message_lower for word in ["student", "छात्र", "पढ़ाई"]):
            enhanced_profile["is_student"] = True
            enhanced_profile["occupation"] = "student"
        
        # Match schemes
        return self.match_schemes(enhanced_profile, detected_category)
    
    def get_scheme_summary(self, scheme: Dict, language: str = "en") -> str:
        """Get a concise summary of a scheme"""
        if language == "hi":
            return f"{scheme.get('name_hi', scheme['name'])}: {scheme.get('description_hi', scheme['description'])}"
        else:
            return f"{scheme['name']}: {scheme['description']}"

# Test the database
if __name__ == "__main__":
    db = SchemeDatabase()
    print(f"✅ Loaded {len(db.schemes)} schemes")
    
    # Test profile
    test_profile = {
        "age": 35,
        "occupation": "farmer",
        "is_farmer": True,
        "land_ownership": True,
        "location": "rural"
    }
    
    matched = db.match_schemes(test_profile)
    print(f"\n📊 Found {len(matched)} matching schemes for farmer profile:")
    for scheme in matched[:3]:
        print(f"\n{scheme['name']} (Score: {scheme['match_score']})")
        print(f"  Reasons: {', '.join(scheme['match_reasons'])}")