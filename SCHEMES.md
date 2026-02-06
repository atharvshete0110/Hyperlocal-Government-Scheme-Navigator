# Guide to Adding New Government Schemes

This document explains how to add new government schemes to the database.

---

## Scheme Data Structure

Each scheme is a JSON object with the following structure:

```json
{
  "id": "unique-scheme-id",
  "name": "Official Scheme Name",
  "name_hi": "योजना का हिंदी नाम",
  "category": "Category Name",
  "description": "Brief description in English",
  "description_hi": "संक्षिप्त विवरण हिंदी में",
  "benefits": "What beneficiaries get",
  "benefits_hi": "लाभार्थियों को क्या मिलता है",
  "eligibility": {
    "age": "18-60 years",
    "occupation": ["farmer", "student"],
    "location": "rural/urban",
    "income": "below poverty line",
    "exclusions": ["government_employees"]
  },
  "eligibility_text": "Detailed eligibility in simple language",
  "eligibility_text_hi": "सरल भाषा में विस्तृत पात्रता",
  "application_process": [
    "Step 1: Visit portal",
    "Step 2: Register",
    "Step 3: Submit documents"
  ],
  "required_documents": [
    "Aadhaar Card",
    "Bank Account Details",
    "Income Certificate"
  ],
  "official_website": "https://scheme-website.gov.in",
  "helpline": "1800-XXX-XXXX",
  "state_specific": false,
  "active": true
}
```

---

## Field Descriptions

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (lowercase-with-hyphens) |
| `name` | string | Official English name |
| `category` | string | One of the predefined categories |
| `description` | string | Brief 1-2 sentence description |
| `benefits` | string | What beneficiaries receive |
| `eligibility_text` | string | Who can apply (simple language) |
| `active` | boolean | Whether scheme is currently active |

### Optional but Recommended

| Field | Type | Description |
|-------|------|-------------|
| `name_hi` | string | Hindi translation of name |
| `description_hi` | string | Hindi description |
| `benefits_hi` | string | Hindi benefits |
| `eligibility_text_hi` | string | Hindi eligibility |
| `eligibility` | object | Structured eligibility criteria |
| `application_process` | array | Step-by-step process |
| `required_documents` | array | List of documents needed |
| `official_website` | string | Official scheme URL |
| `helpline` | string | Contact number |
| `state_specific` | boolean | Is it state-specific? |

---

## Categories

Use one of these predefined categories:

- **Agriculture** - Farm-related schemes
- **Healthcare** - Medical insurance, health programs
- **Housing** - Home loans, housing subsidies
- **Employment** - Job creation, entrepreneurship
- **Education** - Scholarships, skill training
- **Social Security** - Pensions, welfare programs
- **Financial Inclusion** - Banking, loans
- **Welfare** - General welfare schemes
- **Skill Development** - Training programs
- **Sanitation** - Cleanliness, hygiene schemes

---

## Eligibility Object Structure

The `eligibility` object helps with automated matching:

```json
{
  "age": "18-40 years" or "above 18",
  "occupation": ["farmer", "student", "unemployed"],
  "location": "rural" or "urban" or "both",
  "income": "below poverty line" or "₹3-6 lakh per annum",
  "category": ["sc", "st", "obc", "general"],
  "land_ownership": "yes" or "no" or "not_required",
  "bank_account": "required" or "not_required",
  "exclusions": ["income_tax_payers", "government_employees"]
}
```

---

## Step-by-Step: Adding a New Scheme

### 1. Research the Scheme

Gather information from:
- Official government portals
- Ministry websites
- Scheme brochures/guidelines
- Helpline confirmation

### 2. Create Scheme Object

```json
{
  "id": "new-scheme-2024",
  "name": "New Scheme Name",
  "name_hi": "नई योजना का नाम",
  ...
}
```

### 3. Add to Database

Open `data/schemes.json` and add your scheme to the `schemes` array:

```json
{
  "schemes": [
    {
      "id": "pm-kisan",
      ...
    },
    {
      "id": "new-scheme-2024",  // <-- Your new scheme here
      "name": "New Scheme Name",
      ...
    }
  ]
}
```

### 4. Validate JSON

Ensure JSON is valid:
```bash
python -c "import json; json.load(open('data/schemes.json'))"
```

### 5. Test Matching Logic

Test if the scheme matches correctly:
```python
from schemes_db import SchemeDatabase

db = SchemeDatabase()

# Test with a sample profile
profile = {
    "age": 30,
    "occupation": "farmer",
    "location": "rural"
}

matched = db.match_schemes(profile)
print([s['name'] for s in matched])
```

### 6. Add Hindi Translation

If you don't have Hindi translation:
1. Use Google Translate as starting point
2. Review with native Hindi speaker
3. Ensure simple, accessible language

---

## Example: Complete Scheme

```json
{
  "id": "startup-india",
  "name": "Startup India Scheme",
  "name_hi": "स्टार्टअप इंडिया योजना",
  "category": "Employment",
  "description": "Government initiative to promote entrepreneurship and innovation",
  "description_hi": "उद्यमिता और नवाचार को बढ़ावा देने के लिए सरकारी पहल",
  "benefits": "Tax exemptions for 3 years, easier compliance, IPR support, funding support",
  "benefits_hi": "3 साल के लिए कर छूट, आसान अनुपालन, IPR समर्थन, वित्त पोषण सहायता",
  "eligibility": {
    "business_age": "less than 10 years",
    "turnover": "less than ₹100 crore annually",
    "innovative": true
  },
  "eligibility_text": "Startups incorporated as Private Limited Company, Partnership Firm or LLP, less than 10 years old, with annual turnover not exceeding ₹100 crore, working towards innovation",
  "eligibility_text_hi": "प्राइवेट लिमिटेड कंपनी, पार्टनरशिप फर्म या LLP के रूप में शामिल स्टार्टअप, 10 साल से कम पुराने, वार्षिक कारोबार ₹100 करोड़ से अधिक नहीं, नवाचार की दिशा में काम कर रहे",
  "application_process": [
    "Visit Startup India portal (www.startupindia.gov.in)",
    "Click on 'Register' and fill basic details",
    "Upload required documents",
    "Get recognition certificate",
    "Apply for tax benefits through portal"
  ],
  "required_documents": [
    "Certificate of Incorporation",
    "Details of Directors/Partners",
    "Brief about nature of business",
    "Patent/Trademark details (if any)",
    "Recommendation letter (if applicable)"
  ],
  "official_website": "https://www.startupindia.gov.in",
  "helpline": "1800-115-565",
  "state_specific": false,
  "active": true
}
```

---

## Best Practices

### Writing Descriptions

✅ **Good:**
"Free LPG connections to BPL households to safeguard health of women and children"

❌ **Bad:**
"This scheme provides subsidized liquefied petroleum gas connections under certain conditions to eligible beneficiaries..."

### Writing Eligibility

✅ **Good:**
"Women from BPL households who are above 18 years and do not have LPG connection"

❌ **Bad:**
"The applicant must be a female member of a household categorized below the poverty line as per SECC-2011 data..."

### Application Process

- Use simple, action-oriented steps
- Start each step with a verb
- Be specific about where to go
- Mention required documents inline if helpful

---

## State-Specific Schemes

For state-specific schemes, add:

```json
{
  "state_specific": true,
  "applicable_states": ["Maharashtra", "Gujarat"],
  "state_portals": {
    "Maharashtra": "https://mahascheme.gov.in",
    "Gujarat": "https://gujaratscheme.gov.in"
  }
}
```

---

## Updating Existing Schemes

To update a scheme:

1. Find scheme by `id` in `data/schemes.json`
2. Update required fields
3. Always update both English and Hindi if changing text
4. Test matching logic after changes
5. Document changes in commit message

---

## Quality Checklist

Before adding a scheme, ensure:

- [ ] Scheme is currently active
- [ ] Information is from official sources
- [ ] Eligibility criteria is clear
- [ ] Application process is step-by-step
- [ ] Hindi translation is accurate (if provided)
- [ ] JSON is valid
- [ ] Helpline number is correct
- [ ] Official website URL works
- [ ] Required documents list is complete
- [ ] Benefits are clearly stated

---

## Common Mistakes to Avoid

1. **Duplicate IDs** - Each `id` must be unique
2. **Wrong category** - Use only predefined categories
3. **Outdated info** - Verify scheme is still active
4. **Complex language** - Keep it simple and accessible
5. **Missing Hindi** - Try to provide Hindi versions
6. **Invalid JSON** - Always validate before committing
7. **Broken links** - Test all URLs before adding

---

## Resources

### Official Sources
- [MyScheme.gov.in](https://www.myscheme.gov.in)
- [Ministry Websites](https://www.india.gov.in)
- [State Government Portals](https://www.india.gov.in/state-government-websites)

### Validation Tools
- [JSON Validator](https://jsonlint.com)
- [Google Translate](https://translate.google.com) (for Hindi)

---

## Need Help?

If you're unsure about:
- Eligibility criteria structure
- Category selection
- Hindi translation quality

Create an issue on GitHub or contact the maintainers.

---

## Future Enhancements

Planned improvements:
1. Database migration to PostgreSQL
2. Admin panel for adding schemes
3. Automated scheme verification
4. Community contributions
5. More regional languages