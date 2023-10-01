import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.routes';
import gamesRouter from './routes/games.routes';
import './config/settings.config';
export const app = express();
import './config/passport.config';
import userRouter from './routes/user.routes';

const originUrl = `${process.env.JWT_SECURE_COOKIE === 'true' ? 'https' : 'http'}://${process.env.ORIGIN_URL as string}`
const corsOptions = {
  origin: originUrl,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/games', gamesRouter)
app.use('/api/user', userRouter)

app.listen(process.env.API_PORT, () => {
  console.log(`Server running on port ${process.env.API_PORT as string}`);
});
