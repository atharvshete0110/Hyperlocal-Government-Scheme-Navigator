# API Documentation

Base URL: `http://localhost:8000`

## Endpoints

### 1. Health Check
**GET** `/health`

Check if API is running and configured properly.

**Response:**
```json
{
  "status": "healthy",
  "api_key_configured": true,
  "schemes_loaded": 11
}
```

---

### 2. Get All Schemes
**GET** `/schemes`

Get all active government schemes.

**Query Parameters:**
- `category` (optional): Filter by category
- `language` (optional): `en` or `hi` (default: `en`)

**Response:**
```json
{
  "schemes": [...],
  "count": 11
}
```

---

### 3. Get Scheme by ID
**GET** `/schemes/{scheme_id}`

Get details of a specific scheme.

**Path Parameters:**
- `scheme_id`: Scheme identifier (e.g., `pm-kisan`)

**Query Parameters:**
- `language` (optional): `en` or `hi`

**Response:**
```json
{
  "id": "pm-kisan",
  "name": "PM-KISAN",
  "description": "...",
  ...
}
```

---

### 4. Search Schemes
**POST** `/schemes/search`

Search schemes based on user profile and criteria.

**Request Body:**
```json
{
  "category": "Agriculture",
  "user_profile": {
    "age": 35,
    "occupation": "farmer",
    "is_farmer": true,
    "land_ownership": true,
    "location": "rural",
    "language": "en"
  },
  "limit": 10
}
```

**Response:**
```json
{
  "matched_schemes": [
    {
      "id": "pm-kisan",
      "name": "PM-KISAN",
      "match_score": 85,
      "match_reasons": ["Matches your occupation: farmer", ...],
      ...
    }
  ],
  "count": 3
}
```

---

### 5. Chat with AI
**POST** `/chat`

Main conversational AI endpoint.

**Request Body:**
```json
{
  "message": "I am a farmer from rural area. What schemes am I eligible for?",
  "language": "en",
  "user_profile": {
    "age": 35,
    "occupation": "farmer",
    "is_farmer": true,
    "land_ownership": true,
    "location": "rural"
  },
  "conversation_history": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hello! How can I help you?"
    }
  ]
}
```

**Response:**
```json
{
  "response": "Based on your profile as a farmer with land ownership, you are eligible for several schemes...",
  "matched_schemes": [...],
  "extracted_profile": {
    "occupation": "farmer",
    "is_farmer": true
  }
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "detail": "Error message here"
}
```

**Common Error Codes:**
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## User Profile Schema

```typescript
{
  age?: number;
  occupation?: string;  // farmer, student, daily_wage, business, unemployed
  location?: string;    // rural, urban
  income?: string;      // bpl, apl, low, middle, high
  category?: string;    // general, sc, st, obc
  land_ownership?: boolean;
  is_farmer?: boolean;
  is_student?: boolean;
  has_bank_account?: boolean;
  language: string;     // en, hi
}
```

---

## Scheme Categories

- Agriculture
- Healthcare
- Housing
- Employment
- Education
- Social Security
- Financial Inclusion
- Welfare
- Skill Development
- Sanitation

---

## Language Support

The API supports English (`en`) and Hindi (`hi`). When `language=hi`, the API returns:
- `name_hi` instead of `name`
- `description_hi` instead of `description`
- `benefits_hi` instead of `benefits`
- Other Hindi fields when available

---

## Rate Limiting

Currently no rate limiting. In production, implement:
- 100 requests per minute per IP
- 1000 requests per hour per IP

---

## Authentication

Current version: No authentication required

Production version should implement:
- API key authentication
- OAuth 2.0 for user-specific features