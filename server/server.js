import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import * as Sentry from "@sentry/node"
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'

import companyRoutes from './routes/companyRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { clerkWebhooks } from './controllers/webhooks.js'

import { clerkMiddleware } from '@clerk/express'
import bodyParser from 'body-parser' // ✅ Add this

// Initialize Express
const app = express()

// Connect to database and cloudinary
await connectDB()
await connectCloudinary()

// Middlewares
app.use(cors())
app.use(clerkMiddleware())

// ✅ Handle Clerk Webhook with raw body (IMPORTANT!)
app.post('/webhooks', bodyParser.raw({ type: 'application/json' }), clerkWebhooks)

// 🧠 Regular express.json() middleware (after webhook setup)
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('API is working')
})

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!")
})

app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

// Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
