import express from 'express';
import path from 'path';
import testRouter from './testrouter';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, '../client')));

app.use('/api', testRouter);

app.get(['/', '/results'], (req, res) => {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/*', (req, res) => {
	res.redirect('/');
});

export { app };
