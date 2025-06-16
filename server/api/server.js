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
app.use(cors())
await connectDB()

// Webhook route (required to be under /api in Vercel)
app.post('/api/webhooks', 
  express.raw({ type: 'application/json' }), // Use Express 5+ native method
  clerkWebhooks
);

app.use(express.json())

app.get('/api', (req, res) => {
  res.send('API is working')
})

app.get("/api/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!")
})

Sentry.setupExpressErrorHandler(app)

const handler = serverless(app);
export { handler as default };

