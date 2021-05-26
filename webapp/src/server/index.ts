import express from 'express';
const app = express();
const port = 5000;

app.get('/', (_, res) => {
    res.send('got here');
});

app.listen(port, () => console.log(`Running on on port ${port}`));
