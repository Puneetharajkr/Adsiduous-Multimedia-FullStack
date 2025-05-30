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
   `NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret `


5. Run the backend:
   node
