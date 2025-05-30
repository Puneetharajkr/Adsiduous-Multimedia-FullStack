# Multimedia Upload & Search Platform

A full-stack application that allows users to securely upload, preview, and search multimedia files (images, videos, audio, PDFs) with JWT authentication.

## Features

### Frontend (React)

- User authentication (login/registration)
- File upload interface with drag & drop
- Multimedia preview (images, videos, PDFs, audio)
- Search functionality with relevance ranking
- Responsive Material-UI design
- Redux for state management

### Backend (Node.js/Express)

- JWT authentication
- File upload handling with Cloudinary
- MongoDB for file metadata storage
- Search API with text indexing
- Protected routes
- API documentation with Swagger

## Tech Stack

**Frontend**:

- React.js
- Redux Toolkit
- Material-UI
- Axios
- React Router

**Backend**:

- Node.js
- Express.js
- MongoDB (Atlas)
- Cloudinary
- JWT
- Mongoose

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB Atlas account
- Cloudinary account
- Git

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/multimedia-app.git
cd multimedia-app/server
```

2. Install dependencies:
   npm install
3. Create `.env` file:
4. Configure environment variables:
   `NODE_ENV=development PORT=5000
    MONGODB_URI=your_mongodb_atlas_connection_string JWT_SECRET=your_jwt_secret_key JWT_EXPIRE=30d CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key 
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret `
5. Run the backend:
   `node server.js` or ` npm run dev` and The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   `cd ../client`
2. Install dependencies:
   `npm install`
3. Create `.env` file:
4. Configure environment variables:
   `REACT_APP_API_URL=http://localhost:5000/api/v1 REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name`
5. Run the frontend:
   `npm start` The frontend will open at `http://localhost:3000`

## Cloudinary Configuration

1. Create a Cloudinary account at [https://cloudinary.com/](https://cloudinary.com/)
2. In Cloudinary Dashboard:
   * Note your Cloud Name, API Key, and API Secret
   * Go to Settings → Upload
   * Create an unsigned upload preset named `multimedia_upload`
   * Set:
     * Signing Mode: Unsigned
     * Folder: multimedia-app
     * Resource Type: Auto

## Deployment

### Frontend Deployment (Vercel)

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com/) and create a new project
3. Import your GitHub repository
4. Configure environment variables:
   * `REACT_APP_API_URL`: Your backend URL (use localhost for testing)
   * Cloudinary credentials
5. Deploy

Your deployed frontend:
[https://adsidous-multi-media-frontend-puneetharaj-k-rs-projects.vercel.app](https://adsidous-multi-media-frontend-puneetharaj-k-rs-projects.vercel.app/)

## Development Workflow

1. For local development:

   * Run backend on `http://localhost:5000`
   * Run frontend on `http://localhost:3000`
   * Set `REACT_APP_API_URL=http://localhost:5000/api/v1` in frontend `.env`
2. For production:

   * Deploy backend and get its URL
   * Set `REACT_APP_API_URL=your_deployed_backend_url/api/v1` in frontend `.env`
   * Deploy frontend

   ## Contact

   For any questions or issues, please contact:
   Puneetharaj K R
   puneetharajkr123@gmail.com
   https://github.com/Puneetharajkr
