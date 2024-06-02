import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use((req, res, next) => {
  console.log('firs middleware');
  next();
});

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toISOString()}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
