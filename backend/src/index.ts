import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());

app.use('/auth', authRoutes)

app.get('/health', (_, res) => {
    res.json({ ok: true });
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})