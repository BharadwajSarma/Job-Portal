import express from 'express';
import cors from 'cors';
import * as Sentry from "@sentry/node";
import bodyParser from 'body-parser';
import 'dotenv/config';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import { clerkMiddleware } from '@clerk/express';

const app = express();
await connectDB();
await connectCloudinary();

// ✅ RAW parser only for Clerk webhook BEFORE express.json()
app.use('/webhooks', bodyParser.raw({ type: '*/*' }));

// ✅ Clerk webhook route must come before express.json()
app.post('/webhooks', clerkWebhooks);

// General middleware AFTER webhook
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => {
  res.send('API is working');
});
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
