# AI Career Builder Platform

An intelligent career development platform that helps professionals enhance their job search and career growth through AI-powered tools.

## Features

- 📄 Smart Resume Processing: Upload and analyze resumes using NLP
- 🌐 Automatic Website Generation: Create professional websites from resume data
- 💬 AI Career Assistant: Get personalized career advice
- 📚 Learning Recommendations: Discover relevant courses from top platforms
- 🎯 Interview Preparation: Access tailored interview tips and questions

## Tech Stack

- Frontend: React.js with Next.js
- Backend: Node.js with Express
- Database: PostgreSQL
- Cloud Storage: AWS S3
- Authentication: JWT
- API Integrations: Udemy, Coursera

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Add necessary API keys and configuration

4. Start development servers:
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend (.env)
```
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/career_builder
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket_name
UDEMY_API_KEY=your_udemy_key
COURSERA_API_KEY=your_coursera_key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000
```

## Project Structure

```
ai-career-builder/
├── frontend/          # Next.js frontend application
├── backend/           # Express backend server
└── package.json       # Root package.json for project management
```

## API Documentation

Detailed API documentation is available in the `backend/docs` directory.
