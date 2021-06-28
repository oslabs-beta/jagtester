import express from 'express';
import jagtester from '../src/middleware/index';
// import getMiddleware from '../lib/index';

const app = express();
const port = 5001;

app.use(jagtester(app));

app.get('/', 
  // function fn1 (req, res, next) {console.log("fn1"); setTimeout(next, 200)},
  // function fn2 (req, res, next) {console.log("fn2"); setTimeout(next, 400)},
  // function fn3 (req, res, next) {console.log("fn3"); setTimeout(next, 600)},
  (req, res) => {
    res.sendStatus(200);
});


const mockServer = app.listen(port, () => console.log(`Running on on port ${port}`));


export default mockServer;