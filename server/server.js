import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import * as Sentry from "@sentry/node";
import 'dotenv/config';
import connectDB from './config/db.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import bodyParser from 'body-parser';
import serverless from 'serverless-http';

const app = express();

// Connect to database
await connectDB();

// Middlewares
app.use(cors());

// Webhook route (raw body parser)
app.post('/webhooks', bodyParser.raw({ type: 'application/json' }), clerkWebhooks);

// Other routes
app.use(express.json());
app.get('/', (req, res) => {
  res.send('API is working');
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Sentry error handling
Sentry.setupExpressErrorHandler(app);

// Export the serverless handler
export const handler = serverless(app);
