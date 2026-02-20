import express from 'express';

const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());

app.get('/health', (_, res) => {
    res.json({ ok: true });
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})