import express from 'express';
import testRouter from './testrouter';
// TODO use cluster to imrpove our server performance

const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (_, res) => {
    res.send(`Worker ${process.pid} responds`); // TODO make this serve the build folder
});

app.use('/api', testRouter);

app.listen(port, () => console.log(`Running on on port ${port}`));

console.log(`Server running on http://localhost:${port}`);
