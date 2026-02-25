import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes';
import pantryRoutes from './routes/pantryRoutes'

const app = express();

app.use(express.json());

app.use('/auth', authRoutes)

app.use('/pantry', pantryRoutes)

app.get('/health', (_, res) => {
    res.json({ ok: true });
});

export default app