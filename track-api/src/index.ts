import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.routes';
import * as dotenv from 'dotenv'
dotenv.config()
export const app = express();
import './config/passport.config'

const corsOptions = {
  origin: `${process.env.API_URL}:${process.env.API_PORT}`,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/auth', authRouter)

app.listen(process.env.API_PORT, () => {
  console.log(`Server running on port ${process.env.API_PORT}`);
});