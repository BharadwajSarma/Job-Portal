# 🧑‍💼 Job Portal - MERN Stack Application

This is a full-featured **Job Portal** built using the **MERN Stack** (MongoDB, Express, React, Node.js) with **Clerk authentication**. It allows **job seekers** to register/login, view and apply for jobs, and manage their profiles, while **recruiters** can post jobs, view applicants, and accept/reject applications.

Deployed with **Vercel** (both frontend and backend).

---

## 🚀 Features

### 👤 Job Seeker
- Clerk-based user authentication
- View all available jobs
- Apply to jobs
- Upload resume (Cloudinary integration)
- Track applied jobs

### 🧑‍💼 Recruiter
- Recruiter login (JWT auth)
- Post new job listings
- View applicants
- Accept / Reject job applications

### 🛠 Admin
- Clerk Webhooks store user in MongoDB
- Sentry error tracking
- Clean MVC structure

---

## 🧾 Tech Stack

| Frontend         | Backend           | Database     | Auth     | Deployment |
|------------------|-------------------|--------------|----------|------------|
| React, Tailwind  | Node.js, Express  | MongoDB      | Clerk    | Vercel     |

---

## 📦 Dependencies

### 📁 Backend

```json
"@clerk/clerk-sdk-node": "^4.13.23",
"@clerk/express": "^1.7.1",
"@sentry/node": "^9.24.0",
"@sentry/profiling-node": "^9.24.0",
"@vercel/node": "^5.2.2",
"bcrypt": "^6.0.0",
"cloudinary": "^2.6.1",
"cors": "^2.8.5",
"dotenv": "^16.5.0",
"express": "^5.1.0",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.15.1",
"multer": "^2.0.0",
"nodemon": "^3.1.10",
"svix": "^1.42.0"
```

### 📁 Frontend

```json
"@clerk/clerk-react": "^5.24.2",
"axios": "^1.10.0",
"dom": "^0.0.3",
"k-convert": "^1.0.6",
"moment": "^2.30.1",
"quill": "^2.0.3",
"react": "^19.0.0",
"react-dom": "^19.0.0",
"react-router-dom": "^7.3.0",
"react-toastify": "^11.0.5",
"router": "^1.3.8"
```

---

## 📁 Folder Structure

### 📂 `client/` (Frontend)
client/
├── public/
├── src/
│   ├── assets/              # Images, logos
│   ├── components/          # Navbar, JobCard, etc.
│   ├── context/             # AppContext for global state
│   ├── pages/               # Home, Dashboard, ApplyJob, etc.
│   ├── App.jsx              # Routing
│   ├── main.jsx             # Entry point
├── .env                     # VITE env (CLERK key, backend URL)
├── tailwind.config.js       # Tailwind CSS config
├── vite.config.js           # Vite build config
└── README.md

### 📂 server/ (Backend)
server/
├── config/                  # DB, Cloudinary, Sentry
├── controllers/             # Business logic
├── middleware/              # Clerk & JWT auth
├── models/                  # Mongoose schemas
├── routes/                  # Express API routes
├── utils/                   # Token utilities
├── server.js                # Entry point
├── .env                     # Secrets
└── vercel.json              # Vercel backend config


✅ Prerequisites
Make sure you have the following:

✅ Node.js (v18 or above)

✅ MongoDB (Cloud or Local)

✅ Vercel account (for deployment)

✅ Clerk account (for user authentication)

🛠️ Setup Instructions
1️⃣ Clone the Repo
git clone https://github.com/yourusername/job-portal.git
cd job-portal
2️⃣ Setup Frontend (client/)
cd client
npm install
Create .env:

.env

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=https://your-backend-url.vercel.app
3️⃣ Setup Backend (server/)

cd ../server
npm install
Create .env:

env

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
▶️ Run Locally
Start Backend

cd server
npm run dev
Start Frontend

cd client
npm run dev
Open in browser: http://localhost:5173

☁️ Deployment (Vercel)
🔹 Frontend
Deploy client/ to Vercel

Set env variables

Build: npm run build

Output: dist

🔹 Backend
Deploy server/ folder separately

Add this to vercel.json:

{
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "/server.js" }]
}
Set env variables in Vercel Dashboard

🔁 Webhook Setup
Go to Clerk → Webhooks → Add Endpoint

URL: https://your-backend-url.vercel.app/webhooks

Event type: user.created

Use the webhook secret in your backend .env

🙋‍♂️ Author
Sai Bharadwaj Sarma

🎓 B.Tech CSE (Core) @ SASTRA University

💼 Portfolio: 

📧 Email: chickkubharadwajsarma@gmail.com


