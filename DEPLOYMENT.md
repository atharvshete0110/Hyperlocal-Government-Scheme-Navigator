# Deployment Guide

## Overview

This guide covers deploying Sarkari Saathi to production environments.

---

## Architecture Overview

```
┌─────────────────────┐
│   Frontend (Vercel)  │
│   React + Vite       │
└──────────┬───────────┘
           │
           ▼
┌─────────────────────┐
│   Backend (Railway)  │
│   FastAPI + Uvicorn  │
└──────────┬───────────┘
           │
           ▼
┌─────────────────────┐
│   Claude API         │
│   (Anthropic)        │
└──────────────────────┘
```

---

## Option 1: Quick Deploy (Recommended for Hackathon)

### Frontend - Vercel

1. **Push code to GitHub:**
   ```bash
   cd scheme-navigator
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Add environment variable:
     - `VITE_API_URL`: Your backend URL (will get from Railway)
   - Click "Deploy"

### Backend - Railway

1. **Deploy to Railway:**
   - Go to https://railway.app
   - Click "New Project" > "Deploy from GitHub repo"
   - Select your repository
   - Set root directory to `backend`
   - Add environment variables:
     - `ANTHROPIC_API_KEY`: Your Anthropic API key
     - `PORT`: 8000
   - Click "Deploy"

2. **Copy Railway URL:**
   - After deployment, copy the public URL (e.g., `https://your-app.railway.app`)
   - Update this in Vercel environment variables as `VITE_API_URL`

---

## Option 2: Docker Deployment

### Build Docker Images

**Backend Dockerfile:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .
COPY data/ /app/data/

EXPOSE 8000

CMD ["python", "main.py"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Deploy with Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile
    ports:
      - "8000:8000"
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    volumes:
      - ./data:/app/data

  frontend:
    build:
      context: .
      dockerfile: frontend/Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://backend:8000
```

**Deploy:**
```bash
docker-compose up -d
```

---

## Option 3: AWS Deployment

### Backend - AWS Lambda + API Gateway

1. **Install Serverless Framework:**
   ```bash
   npm install -g serverless
   ```

2. **Create serverless.yml:**
   ```yaml
   service: sarkari-saathi-api
   
   provider:
     name: aws
     runtime: python3.11
     region: ap-south-1
     environment:
       ANTHROPIC_API_KEY: ${env:ANTHROPIC_API_KEY}
   
   functions:
     api:
       handler: main.handler
       events:
         - http:
             path: /{proxy+}
             method: ANY
   ```

3. **Deploy:**
   ```bash
   cd backend
   serverless deploy
   ```

### Frontend - AWS S3 + CloudFront

1. **Build frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to S3:**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name
   ```

3. **Create CloudFront distribution** pointing to S3 bucket

---

## Option 4: Traditional VPS (DigitalOcean/AWS EC2)

### Setup Server

1. **SSH into server:**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install dependencies:**
   ```bash
   sudo apt update
   sudo apt install python3.11 python3-pip nodejs npm nginx -y
   ```

3. **Clone repository:**
   ```bash
   git clone <your-repo-url>
   cd scheme-navigator
   ```

### Setup Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create systemd service
sudo nano /etc/systemd/system/sarkari-saathi.service
```

**Service file:**
```ini
[Unit]
Description=Sarkari Saathi API
After=network.target

[Service]
User=www-data
WorkingDirectory=/path/to/scheme-navigator/backend
Environment="ANTHROPIC_API_KEY=your_key_here"
ExecStart=/path/to/venv/bin/python main.py
Restart=always

[Install]
WantedBy=multi-user.target
```

**Start service:**
```bash
sudo systemctl enable sarkari-saathi
sudo systemctl start sarkari-saathi
```

### Setup Frontend with Nginx

```bash
cd ../frontend
npm install
npm run build
sudo cp -r dist/* /var/www/html/
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /var/www/html;
        try_files $uri /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Environment Variables

### Backend (.env)
```bash
ANTHROPIC_API_KEY=sk-ant-xxx
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=production
ALLOWED_ORIGINS=https://your-frontend-url.com
```

### Frontend (.env)
```bash
VITE_API_URL=https://your-backend-url.com
```

---

## Post-Deployment Checklist

- [ ] API health check working
- [ ] Frontend loads properly
- [ ] CORS configured correctly
- [ ] HTTPS enabled (use Let's Encrypt)
- [ ] Environment variables set
- [ ] Monitoring setup (Sentry, LogRocket)
- [ ] Analytics integrated (Google Analytics)
- [ ] Database backups configured (if using DB)
- [ ] Rate limiting enabled
- [ ] Error logging working

---

## Monitoring & Analytics

### Backend Monitoring

**Install Sentry:**
```bash
pip install sentry-sdk[fastapi]
```

**Add to main.py:**
```python
import sentry_sdk

sentry_sdk.init(
    dsn="your-sentry-dsn",
    traces_sample_rate=1.0,
)
```

### Frontend Analytics

**Add Google Analytics to index.html:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Scaling Considerations

### For High Traffic:

1. **Load Balancer:** Use AWS ALB or Nginx load balancer
2. **Auto-scaling:** Configure EC2 auto-scaling groups
3. **CDN:** Use CloudFlare for static assets
4. **Caching:** Implement Redis for API responses
5. **Database:** Move to PostgreSQL/MongoDB for schemes data
6. **Queue:** Use Celery + Redis for async tasks

---

## Security Best Practices

1. **API Keys:** Store in environment variables, never commit
2. **HTTPS:** Always use SSL certificates
3. **CORS:** Restrict to specific origins
4. **Rate Limiting:** Implement to prevent abuse
5. **Input Validation:** Sanitize all user inputs
6. **Updates:** Keep dependencies updated
7. **Monitoring:** Set up alerts for errors

---

## Backup Strategy

1. **Database:** Daily automated backups
2. **Code:** Version control with Git
3. **Environment:** Document all configurations
4. **Disaster Recovery:** Test restore procedures monthly

---

## Support & Troubleshooting

**Common Issues:**

1. **CORS errors:** Check ALLOWED_ORIGINS in backend
2. **API key errors:** Verify ANTHROPIC_API_KEY is set
3. **Build failures:** Check Node/Python versions
4. **Slow responses:** Increase server resources or add caching

**Logs:**
- Backend: `journalctl -u sarkari-saathi -f`
- Nginx: `/var/log/nginx/error.log`
- Railway: View in dashboard
- Vercel: View in dashboard

---

## Cost Estimation

**Monthly costs for moderate traffic (10,000 users):**

- Vercel (Frontend): $0 - $20
- Railway (Backend): $5 - $20
- Anthropic API: $50 - $200 (depends on usage)
- Domain: $10/year
- **Total:** ~$60-$240/month

---

## Demo Deployment for Hackathon

**Quick setup for demo:**

1. Use free tiers:
   - Vercel Free
   - Railway Free ($5 credit)
   - Anthropic API (pay-as-you-go)

2. Deploy backend to Railway
3. Deploy frontend to Vercel
4. Configure environment variables
5. Test thoroughly
6. Share public URL

**Total time:** 30-45 minutes