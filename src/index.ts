import express,{json} from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './routes/router';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler';




dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);


app.use(router);

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
