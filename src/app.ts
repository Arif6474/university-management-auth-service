import express, { Application, Request, Response, NextFunction } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import Routes from './app/Routes';
import httpStatus from 'http-status';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global error handler
app.use(globalErrorHandler);

//routes
app.use('/api/', Routes);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

app.get('/', async (req: Request, res: Response) => {
  res.send('server is running');
});

export default app;
