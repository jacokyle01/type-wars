import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import resultRoutes from './routes/result';
import leaderboardRoutes from './routes/leaderboard';



declare const process: {
  env: {
    DATABASE_URL: string;
  };
};

dotenv.config();
const app = express();
app.use(express.json());

import cors from 'cors';
app.use(cors());

const PORT = 3000;

mongoose
  .connect(process.env.DATABASE_URL || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/api/user', userRoutes);
app.use('/api/result', resultRoutes);
app.use('/api/leaderboard', leaderboardRoutes);


