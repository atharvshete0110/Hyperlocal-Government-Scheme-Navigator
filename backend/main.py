from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
from anthropic import Anthropic
from scheme_db import SchemeDatabase
import json

app = FastAPI(title="Sarkari Saathi API", version="1.0.0")

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Anthropic client
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
if not ANTHROPIC_API_KEY:
    print("⚠️  Warning: ANTHROPIC_API_KEY not set. Please add it to .env file")
    
client = Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

# Initialize scheme database
scheme_db = SchemeDatabase()

# Pydantic models
class UserProfile(BaseModel):
    age: Optional[int] = None
    occupation: Optional[str] = None
    location: Optional[str] = None
    income: Optional[str] = None
    category: Optional[str] = None  # SC/ST/OBC/General
    land_ownership: Optional[bool] = None
    is_farmer: Optional[bool] = None
    is_student: Optional[bool] = None
    has_bank_account: Optional[bool] = None
    language: str = "en"  # en, hi

class ChatRequest(BaseModel):
    message: str
    language: str = "en"
    user_profile: Optional[UserProfile] = None
    conversation_history: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    response: str
    matched_schemes: Optional[List[dict]] = []
    extracted_profile: Optional[dict] = None

class SchemeSearchRequest(BaseModel):
    category: Optional[str] = None
    user_profile: Optional[UserProfile] = None
    limit: int = 10

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Sarkari Saathi API",
        "version": "1.0.0",
        "endpoints": {
            "/chat": "POST - Chat with AI assistant",
            "/schemes": "GET - Get all schemes",
            "/schemes/search": "POST - Search schemes by criteria",
            "/schemes/{scheme_id}": "GET - Get scheme details",
            "/health": "GET - Health check"
        }
    }

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "api_key_configured": ANTHROPIC_API_KEY is not None,
        "schemes_loaded": len(scheme_db.schemes)
    }

# Get all schemes
@app.get("/schemes")
async def get_schemes(category: Optional[str] = None, language: str = "en"):
    schemes = scheme_db.get_all_schemes()
    
    if category:
        schemes = [s for s in schemes if s.get("category", "").lower() == category.lower()]
    
    # Format based on language
    if language == "hi":
        schemes = [{
            **s,
            "name": s.get("name_hi", s["name"]),
            "description": s.get("description_hi", s["description"]),
            "benefits": s.get("benefits_hi", s["benefits"])
        } for s in schemes]
    
    return {"schemes": schemes, "count": len(schemes)}

# Get scheme by ID
@app.get("/schemes/{scheme_id}")
async def get_scheme(scheme_id: str, language: str = "en"):
    scheme = scheme_db.get_scheme_by_id(scheme_id)
    
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    
    # Format based on language
    if language == "hi":
        scheme = {
            **scheme,
            "name": scheme.get("name_hi", scheme["name"]),
            "description": scheme.get("description_hi", scheme["description"]),
            "benefits": scheme.get("benefits_hi", scheme["benefits"]),
            "eligibility_text": scheme.get("eligibility_text_hi", scheme["eligibility_text"])
        }
    
    return scheme

# Search schemes
@app.post("/schemes/search")
async def search_schemes(request: SchemeSearchRequest):
    matched_schemes = scheme_db.match_schemes(
        user_profile=request.user_profile.dict() if request.user_profile else {},
        category=request.category
    )
    
    return {
        "matched_schemes": matched_schemes[:request.limit],
        "count": len(matched_schemes)
    }

# Chat endpoint - Main AI interaction
@app.post("/chat")
async def chat(request: ChatRequest):
    if not client:
        raise HTTPException(
            status_code=500,
            detail="Anthropic API key not configured. Please set ANTHROPIC_API_KEY environment variable."
        )
    
    try:
        # Build system prompt
        system_prompt = build_system_prompt(request.language)
        
        # Extract or use existing user profile
        user_profile_dict = request.user_profile.dict() if request.user_profile else {}
        
        # Build conversation messages
        messages = []
        
        # Add conversation history
        if request.conversation_history:
            messages.extend(request.conversation_history)
        
        # Add current message with context
        user_message = build_user_message(
            request.message,
            user_profile_dict,
            scheme_db.get_all_schemes()[:5]  # Send sample schemes for context
        )
        messages.append({
            "role": "user",
            "content": user_message
        })
        
        # Call Claude API
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=messages
        )
        
        # Extract response
        assistant_response = response.content[0].text
        
        # Try to match schemes based on the conversation
        matched_schemes = scheme_db.match_schemes_from_conversation(
            request.message,
            user_profile_dict
        )
        
        # Try to extract profile information from conversation
        extracted_profile = extract_profile_from_conversation(request.message, user_profile_dict)
        
        return ChatResponse(
            response=assistant_response,
            matched_schemes=matched_schemes[:5] if matched_schemes else [],
            extracted_profile=extracted_profile
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")

# Helper functions
def build_system_prompt(language: str) -> str:
    """Build system prompt for Claude based on language"""
    
    if language == "hi":
        return """आप सरकारी साथी हैं, एक सहायक AI जो भारतीय नागरिकों को सरकारी योजनाओं के बारे में जानकारी देता है।

आपकी भूमिका:
1. उपयोगकर्ता से उनकी प्रोफ़ाइल के बारे में सवाल पूछें (उम्र, पेशा, आय, स्थान)
2. उनकी प्रोफ़ाइल के आधार पर प्रासंगिक सरकारी योजनाओं की सिफारिश करें
3. पात्रता मानदंड को सरल भाषा में समझाएं
4. आवेदन प्रक्रिया के बारे में मार्गदर्शन दें
5. सहायक और धैर्यवान बनें

महत्वपूर्ण:
- सरल हिंदी का उपयोग करें
- तकनीकी शब्दों से बचें
- छोटे, स्पष्ट वाक्य बोलें
- यदि उपयोगकर्ता पात्र नहीं है तो विकल्प सुझाएं"""
    
    else:  # English
        return """You are Sarkari Saathi, a helpful AI assistant that helps Indian citizens discover government schemes they're eligible for.

Your role:
1. Ask the user questions about their profile (age, occupation, income, location)
2. Recommend relevant government schemes based on their profile
3. Explain eligibility criteria in simple language
4. Guide them through the application process
5. Be helpful and patient

Important:
- Use simple, clear language
- Avoid bureaucratic jargon
- Speak in short, clear sentences
- If user is not eligible, suggest alternatives
- Be encouraging and supportive

When recommending schemes:
- Explain WHY they're eligible
- Highlight the key benefits
- Provide clear next steps
- Mention required documents"""

def build_user_message(message: str, profile: dict, sample_schemes: list) -> str:
    """Build enhanced user message with context"""
    
    context_parts = [f"User message: {message}"]
    
    if profile:
        profile_str = "\n".join([f"- {k}: {v}" for k, v in profile.items() if v])
        context_parts.append(f"\nUser profile:\n{profile_str}")
    
    # Add sample schemes for reference
    if sample_schemes:
        schemes_str = "\n".join([
            f"- {s['name']}: {s['description']}" 
            for s in sample_schemes[:3]
        ])
        context_parts.append(f"\nSample schemes available:\n{schemes_str}")
    
    return "\n".join(context_parts)

def extract_profile_from_conversation(message: str, existing_profile: dict) -> dict:
    """Extract user profile information from conversation"""
    
    extracted = existing_profile.copy()
    message_lower = message.lower()
    
    # Simple keyword extraction (can be enhanced with Claude)
    if "farmer" in message_lower or "खेती" in message_lower:
        extracted["is_farmer"] = True
        extracted["occupation"] = "farmer"
    
    if "student" in message_lower or "छात्र" in message_lower:
        extracted["is_student"] = True
        extracted["occupation"] = "student"
    
    # Extract age if mentioned
    import re
    age_match = re.search(r'\b(\d{1,2})\s*(?:year|साल|वर्ष)', message_lower)
    if age_match:
        extracted["age"] = int(age_match.group(1))
    
    return extracted if extracted != existing_profile else None

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Sarkari Saathi API...")
    print("📍 API will be available at http://localhost:8000")
    print("📚 API docs at http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)