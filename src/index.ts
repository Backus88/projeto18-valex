import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/router'


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
