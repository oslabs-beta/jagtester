import express from 'express';
import jagtester from '../src/middleware/index';
// import getMiddleware from '../lib/index';

const app = express();
// const port = 5001;

app.use(jagtester(app));

app.get('/', (req, res) => {
	res.sendStatus(200);
});

// const mockServer = app.listen(port, () => console.log(`Running on on port ${port}`));

// export default mockServer;
export default app;
