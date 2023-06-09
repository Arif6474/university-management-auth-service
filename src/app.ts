import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import Routes from './app/Routes';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global error handler
app.use(globalErrorHandler);

//routes
app.use('/api/', Routes);

app.get('/', async (req: Request, res: Response) => {
  res.send('server is running');
});

export default app;
