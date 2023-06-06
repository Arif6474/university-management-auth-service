import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { UserRouter } from './app/modules/user/user.routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global error handler
app.use(globalErrorHandler);

//routes
app.use('/api/users/', UserRouter);

app.get('/', async (req: Request, res: Response) => {
  res.send('server is running');
});

export default app;
