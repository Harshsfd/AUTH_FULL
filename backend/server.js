import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

connectDB();

const app = express();

// Body parser
app.use(express.json());

// CORS: allow frontend origin (set FRONTEND_URL in env on Render/Vercel)
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Health
app.get('/', (req, res) => res.send('MERN Auth Backend is running'));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handler (should be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
