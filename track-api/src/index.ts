import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.routes';
import gamesRouter from './routes/games.routes'
import * as dotenv from 'dotenv'
dotenv.config()
export const app = express();
import './config/passport.config'

const corsOptions = {
  origin: `http://localhost:${process.env.ORIGIN_URL}`,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/games', gamesRouter)

app.listen(process.env.API_PORT, () => {
  console.log(`Server running on port ${process.env.API_PORT}`);
});
