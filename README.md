# BetterDorm

A modern web platform for discovering student housing, posting listings, and roommate matching for SJSU and beyond. 

---
# Demo
[Watch Demo Video](https://drive.google.com/file/d/1IIMk-0MWOGf2fjMbeUr5U74lz-j-Nf-G/view?usp=sharing)



# Live Site
https://wonderful-daifuku-5d221e.netlify.app/

## Tech Stack

- **Frontend:** React (TypeScript), Vite, TailwindCSS
- **Backend:** Node.js, Express (TypeScript)
- **Database:** MongoDB (local or Atlas)
- **Authentication:** JWT-based, with 2FA support
- **Cloud Services:** AWS S3 (image uploads), AWS SES (email)
- **AI Integration:** OpenAI (chatbot, search)
- **Mapping:** Mapbox GL JS
- **Containerization:** Docker, docker-compose
- **Other:** Lucide React icons, ESLint, Prettier

---

## Monorepo Structure

```
betterdorm/
│
├── backend/                # Express API (TypeScript)
│   ├── src/
│   ├── .env.example
│   └── ...
│
├── src/                    # Frontend React app (TypeScript)
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── contexts/
│   ├── hooks/
│   ├── App.tsx
│   └── ...
│
├── public/                 # Static assets
├── .env.local              # Frontend environment variables
├── docker-compose.yml
├── README.md
└── ...
```

---

## Key Features

- **Interactive Map:** Browse listings on a Mapbox-powered map
- **AI Search:** Natural language search for housing and roommates
- **Roommate Matching:** Match based on preferences and profiles
- **3D Virtual Tours:** GLTF/GLB model support for immersive tours
- **Listing Management:** Create, edit, and manage your own listings
- **Image Uploads:** Direct to S3 via presigned URLs
- **Secure Auth:** JWT, 2FA, and protected routes
- **Profile Management:** Edit your info, preferences, and listings

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Docker & docker-compose (optional, for full stack)
- MongoDB (local or Atlas)
- AWS S3 bucket & credentials
- OpenAI API key

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/7HE-LUCKY-FISH/betterdorm.git
   cd betterdorm
   ```

2. **Environment Variables**
   - Backend:  
     ```bash
     cp backend/.env.example backend/.env
     # Edit backend/.env with your MongoDB, AWS, and OpenAI credentials
     ```
   - Frontend:  
     ```bash
     echo "VITE_API_URL=http://localhost:4000/api" > .env.local
     ```

3. **Start Development**
   - **With Docker (recommended):**
     ```bash
     docker-compose up --build
     ```
   - **Manually:**
     - Terminal 1 (Frontend):
       ```bash
       npm install
       npm run dev
       ```
     - Terminal 2 (Backend):
       ```bash
       cd backend
       npm install
       npm run dev
       ```

4. **Access the App**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000](http://localhost:4000)
   - API Docs: [http://localhost:4000/api-docs](http://localhost:4000/api-docs) (if enabled)

---

## Contributing

1. Fork the repo and create a feature branch.
2. Follow the code style (ESLint/Prettier).
3. Submit a pull request with a clear description.

---

## License

MIT

---
