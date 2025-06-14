import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import * as Sentry from "@sentry/node"
import 'dotenv/config'
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import bodyParser from 'body-parser' // 🔁 NEW

const app = express()

await connectDB()

app.use(cors())
// Don't use express.json() before webhook route

// Routes
app.get('/', (req, res) => {
  res.send('API is working');
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// 🔁 Apply raw body parser only for this webhook route
app.post('/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  clerkWebhooks
)

app.use(express.json()) // 👍 Apply globally AFTER webhook route

const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app)

app.listen(PORT, () => {
  console.log(`Server is runnin on port ${PORT}`)
})
