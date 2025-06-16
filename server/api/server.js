// server/api/server.js

import '../config/instrument.js'
import express from 'express'
import cors from 'cors'
import * as Sentry from "@sentry/node"
import 'dotenv/config'
import connectDB from '../config/db.js'
import { clerkWebhooks } from '../controllers/webhooks.js'
import bodyParser from 'body-parser'
import serverless from 'serverless-http'

const app = express()

// Connect to database
await connectDB()

app.use(cors())
app.use(express.json())

// Webhook route (must be under /api for Vercel)
app.post('/api/webhooks', bodyParser.raw({ type: 'application/json' }), clerkWebhooks)

app.get('/api', (req, res) => {
  res.send('API is working')
})

app.get('/api/debug-sentry', (req, res) => {
  throw new Error('My first Sentry error!')
})

// Sentry error handler
Sentry.setupExpressErrorHandler(app)

// ✅ Use default export for Vercel serverless functions
export default serverless(app)
