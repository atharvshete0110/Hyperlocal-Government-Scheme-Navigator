# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │  Web App   │  │ Mobile PWA │  │ Voice Bot  │        │
│  │  (React)   │  │  (Future)  │  │  (Future)  │        │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘        │
└─────────┼────────────────┼────────────────┼─────────────┘
          │                │                │
          └────────────────┴────────────────┘
                           │
                    ┌──────▼──────┐
                    │  API Gateway │
                    │   (FastAPI)  │
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
    │  Claude   │   │  Scheme   │   │   Voice   │
    │   API     │   │ Database  │   │  Service  │
    │ (Sonnet4) │   │  (JSON)   │   │  (Speech) │
    └───────────┘   └───────────┘   └───────────┘
```

## Component Details

### Frontend Layer
```
React Application
├── App.jsx (Main component)
├── Components
│   ├── ChatMessage.jsx (Chat bubble UI)
│   ├── SchemeCard.jsx (Scheme display)
│   └── ProfileForm.jsx (User profile)
├── Services
│   └── api.js (API integration)
└── Styling
    └── index.css (Tailwind + custom)
```

### Backend Layer
```
FastAPI Server
├── main.py (API endpoints)
│   ├── /health
│   ├── /schemes
│   ├── /schemes/{id}
│   ├── /schemes/search
│   └── /chat
├── schemes_db.py (RAG logic)
│   ├── SchemeDatabase class
│   ├── Matching algorithm
│   └── Profile extraction
└── Data
    └── schemes.json (Scheme database)
```

## Data Flow

### User Query Flow
```
1. User Input (Text/Voice)
   │
   ▼
2. Frontend captures input
   │
   ▼
3. API request to /chat
   │
   ▼
4. Backend processes:
   ├── Extract profile info
   ├── Match schemes (RAG)
   └── Call Claude API
   │
   ▼
5. Claude generates response
   │
   ▼
6. Backend returns:
   ├── AI response
   ├── Matched schemes
   └── Updated profile
   │
   ▼
7. Frontend displays results
   ├── Chat message
   └── Scheme cards in sidebar
```

### Scheme Matching Flow
```
User Profile
    │
    ▼
┌───────────────────┐
│ Rule-based Scorer │
│  • Age matching   │
│  • Occupation     │
│  • Location       │
│  • Income level   │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│ Score Calculation │
│  (0-100 points)   │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│ Sort & Filter     │
│  Top 5 schemes    │
└────────┬──────────┘
         │
         ▼
  Matched Schemes
```

## Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS 3.4
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Voice**: Web Speech API

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11
- **AI**: Anthropic Claude Sonnet 4
- **Validation**: Pydantic
- **CORS**: FastAPI Middleware

### Deployment
- **Frontend**: Vercel / Netlify
- **Backend**: Railway / AWS Lambda
- **Database**: JSON (→ PostgreSQL in future)

## Security Architecture

```
┌──────────────┐
│    User      │
└──────┬───────┘
       │ HTTPS
       ▼
┌──────────────┐
│   Vercel     │
│  (Frontend)  │
└──────┬───────┘
       │ HTTPS
       ▼
┌──────────────┐
│   Railway    │
│  (Backend)   │
└──────┬───────┘
       │ API Key
       ▼
┌──────────────┐
│  Claude API  │
└──────────────┘
```

### Security Measures
- ✅ HTTPS everywhere
- ✅ API key in environment variables
- ✅ CORS restrictions
- ✅ Input validation (Pydantic)
- ✅ Rate limiting (planned)
- ✅ No PII storage

## Scalability Considerations

### Current Architecture (MVP)
- Single server instance
- In-memory scheme database
- Synchronous API calls
- ~100 concurrent users

### Scaled Architecture (Production)
```
┌─────────────┐
│ CloudFlare  │  CDN + DDoS protection
└──────┬──────┘
       │
┌──────▼──────┐
│ Load        │  Distribute traffic
│ Balancer    │
└──────┬──────┘
       │
   ┌───┴───┐
   │       │
┌──▼──┐ ┌──▼──┐
│ API │ │ API │  Multiple instances
│  #1 │ │ #2 │
└──┬──┘ └──┬──┘
   │       │
   └───┬───┘
       │
   ┌───▼────┐
   │ Redis  │  Cache + Session
   └───┬────┘
       │
   ┌───▼────┐
   │Postgres│  Persistent database
   └────────┘
```

## Future Enhancements

### Phase 1 (Current)
- ✅ 11 central schemes
- ✅ English + Hindi
- ✅ Text + Voice input
- ✅ Basic matching

### Phase 2 (3 months)
- 50+ schemes
- 5 languages
- State scheme integration
- User accounts
- Application tracking

### Phase 3 (6 months)
- 100+ schemes
- 10+ languages
- WhatsApp bot
- SMS integration
- Direct application submission

### Phase 4 (12 months)
- All major schemes
- 15+ languages
- Offline mode
- Government portal integration
- Analytics dashboard