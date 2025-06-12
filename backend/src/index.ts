import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/api/ping', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
