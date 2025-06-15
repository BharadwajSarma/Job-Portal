import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import * as Sentry from "@sentry/node"
import 'dotenv/config'
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import bodyParser from 'body-parser'
import serverless from 'serverless-http'  // Added

const app = express()

// Connect to database
await connectDB()

// Middlewares
app.use(cors())

// Webhook route with raw body parser (MUST come first)
app.post('/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  clerkWebhooks
)

// Apply express.json() for all other routes
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('API is working')
})

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!")
})

Sentry.setupExpressErrorHandler(app)

// Serverless export (REQUIRED for Vercel)
export const handler = serverless(app)
