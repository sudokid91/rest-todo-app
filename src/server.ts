import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_CONNECT!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.use('/api', todoRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
