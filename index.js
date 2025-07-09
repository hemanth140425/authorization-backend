import express from 'express';
import {port} from './config/env.js';
import connectToMongo from './database/mongodb.js';
import cookieParser from 'cookie-parser';

//Middlewares
import errormiddleware from './middleware/error.middleware.js';
//routers
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';
import subscriptionRouter from './routes/subcription.router.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errormiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectToMongo();
  
})