import express, { Application, Response, Request } from 'express';
import cors from 'cors';
import { StudentRoute } from './modules/student/student.route';
const app: Application = express();

// express parse
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('hellow world');
});

export default app;
