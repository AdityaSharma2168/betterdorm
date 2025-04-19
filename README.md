# BetterDorm

A comprehensive dormitory discovery and roommate matching platform.

## Project Architecture

BetterDorm follows a modern full-stack architecture:

- **Frontend**: React with TypeScript, Vite, and TailwindCSS
- **Backend**: Node.js/Express API with TypeScript
- **Database**: MongoDB
- **Cloud Services**: AWS (S3, SES) for file storage and emails
- **AI Integration**: OpenAI for chatbot and natural language search
- **Containerization**: Docker for development and deployment

### Key Features

- Interactive map-based dorm discovery using Mapbox
- AI-powered natural language search for dorms
- Roommate matching algorithm based on preferences
- 3D virtual tours of dorms (GLTF/GLB models)
- User authentication and profile management
- Direct file uploads to S3 via presigned URLs

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and docker-compose (for containerized development)
- MongoDB (local or Atlas) or use the provided docker-compose setup
- AWS account with S3 bucket and access credentials
- OpenAI API key

### Environment Setup

1. Clone the repository
   ```bash
   git clone https://github.com/7HE-LUCKY-FISH/betterdorm.git
   cd betterdorm
   ```

2. Create environment files
   ```bash
   # Create backend .env file
   cp backend/.env.example backend/.env
   # Edit backend/.env with your credentials
   
   # Create frontend .env file
   echo "VITE_API_URL=http://localhost:4000/api" > .env.local
   ```

3. Start the development environment
   ```bash
   # Option 1: Using docker-compose (recommended)
   docker-compose up -d
   
   # Option 2: Running services manually
   # Terminal 1 - Frontend
   npm install
   npm run dev
   
   # Terminal 2 - Backend
   cd backend
   npm install
   npm run dev
   
   # Terminal 3 - MongoDB (if not using Atlas)
   # Install MongoDB locally or use an Atlas instance
   ```

4. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - API Documentation: http://localhost:4000/api-docs (when implemented)

## Project Structure

```
betterdorm/
├── src/                   # Frontend React app
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React contexts (Auth, API, etc.)
│   ├── layouts/           # Page layouts
│   └── pages/             # Application pages
├── backend/               # Node.js API server
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # Mongoose data models
│   │   ├── routes/        # API route definitions
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── config/        # Server configuration
│   │   └── utils/         # Helper functions
│   └── Dockerfile         # Backend container definition
├── Dockerfile.frontend    # Frontend container definition
├── docker-compose.yml     # Development container orchestration
└── nginx.conf             # Nginx configuration for frontend
```

## Development Workflow

1. **Backend Development**:
   - Create models using Mongoose schemas
   - Implement controllers for API endpoints
   - Add services for business logic

2. **Frontend Development**:
   - Use components and contexts to build UI
   - Integrate with backend API using ApiContext
   - Implement map and 3D viewing features

3. **Testing**:
   - Backend tests using Jest
   - Frontend tests using Vitest/Jest
   - End-to-end testing with Cypress (future)

## Deployment

The application can be deployed to AWS using:

1. **Frontend**: S3 + CloudFront
2. **Backend**: ECS with Fargate
3. **Database**: MongoDB Atlas
4. **File Storage**: S3 buckets
5. **CI/CD**: GitHub Actions pipeline

Detailed deployment instructions will be provided in a separate document.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 
