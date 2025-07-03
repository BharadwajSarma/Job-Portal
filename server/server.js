import express from 'express';
import cors from 'cors';
import * as Sentry from "@sentry/node";
import 'dotenv/config';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import { clerkWebhooks } from './controllers/webhooks.js';

// Import raw from express for Clerk
import bodyParser from 'body-parser';

const app = express();

await connectDB();
await connectCloudinary();

app.use(cors());

// ✅ USE RAW ONLY FOR WEBHOOK FIRST
app.post('/webhooks', bodyParser.raw({ type: '*/*' }), clerkWebhooks);

// ✅ THEN use json body parser after webhook
app.use(express.json());
app.use(clerkMiddleware());

// 🔁 Routes
app.get('/', (req, res) => {
  res.send('API is working');
});
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Vercel server listen
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
