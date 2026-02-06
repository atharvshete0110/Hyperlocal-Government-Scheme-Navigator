# 🏛️ Sarkari Saathi - Hyperlocal Government Scheme Navigator

**AI-Powered Platform to Bridge the Information Gap for Government Schemes**

Sarkari Saathi helps citizens discover and understand government schemes they're eligible for through conversational AI, available in multiple regional languages with voice support.

---

## 🎯 Problem Statement

Millions of citizens miss out on government benefits due to:
- **Information asymmetry**: People don't know schemes exist
- **Complex eligibility criteria**: Hard to understand if they qualify
- **Language barriers**: Official documentation only in English/Hindi
- **Digital divide**: Low literacy and limited internet access

## 💡 Solution

An AI-powered assistant that:
- ✅ Understands user profiles through simple conversation
- ✅ Matches them with relevant schemes using RAG (Retrieval Augmented Generation)
- ✅ Explains eligibility in simple language
- ✅ Provides step-by-step application guidance
- ✅ Works in regional languages with voice input/output
- ✅ Optimized for low-bandwidth environments

---

## 🏗️ Architecture

```
┌─────────────────┐
│   User Interface │
│  (React + Voice) │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  FastAPI Backend │
│   (Python 3.11)  │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌──────────────┐
│ Claude │ │ Scheme DB    │
│  API   │ │ (JSON/SQLite)│
└────────┘ └──────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Anthropic API Key

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
python main.py
```

Backend runs on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 📁 Project Structure

```
scheme-navigator/
├── backend/
│   ├── main.py                 # FastAPI app entry point
│   ├── schemes_db.py           # Scheme database and RAG logic
│   ├── voice_service.py        # Text-to-speech integration
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── components/        # UI components
│   │   └── services/          # API integration
│   ├── package.json
│   └── index.html
├── data/
│   └── schemes.json           # Government schemes database
├── docs/
│   ├── API.md                 # API documentation
│   ├── DEPLOYMENT.md          # Deployment guide
│   └── SCHEMES.md             # How to add new schemes
└── README.md
```

---

## 🎨 Features

### ✨ Core Features
- **Conversational Interface**: Natural language queries in multiple languages
- **Smart Matching**: AI-powered eligibility detection
- **Voice Support**: Speech-to-text and text-to-speech
- **Multi-language**: Hindi, English, and easily extensible to other languages
- **Low-bandwidth Mode**: Optimized API responses

### 🔮 Advanced Features
- **Profile Building**: Saves user information for better recommendations
- **Application Tracking**: Step-by-step guidance through application process
- **Notification System**: Alerts for scheme deadlines
- **Offline Support**: PWA for basic functionality without internet

---

## 🗃️ Database Schema

Current schemes include:
- PM-KISAN (Farmer Income Support)
- Ayushman Bharat (Health Insurance)
- Pradhan Mantri Awas Yojana (Housing)
- National Pension Scheme
- Skill India Programs
- And 15+ more...

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- TailwindCSS for styling
- Axios for API calls
- Web Speech API for voice

**Backend**
- FastAPI (Python)
- Anthropic Claude API
- Pydantic for validation
- CORS middleware

**AI/ML**
- Claude Sonnet 4 for conversation
- RAG for scheme matching
- Custom prompts for regional languages

---

## 🌍 Regional Language Support

Currently supports:
- 🇮🇳 Hindi
- 🇬🇧 English

Coming soon:
- Marathi, Tamil, Telugu, Bengali, Gujarati

---

## 📊 Impact Metrics

Target metrics for hackathon demo:
- **Coverage**: 20+ major government schemes
- **Accuracy**: 90%+ correct eligibility matching
- **Speed**: <2s response time
- **Languages**: 2+ regional languages
- **User Profiles**: Support 5+ demographic categories

---

## 🤝 Contributing

This is a hackathon project, but contributions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 👥 Team

Built for AWS Ai hackathon by Atharv Shete

---

## 🙏 Acknowledgments

- Government of India for open data on schemes
- Anthropic for Claude API
- Community feedback and testing

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: atharvashete0110@gmail.com
- Demo Video: [link]

---

**Made with ❤️ for the people of India**
