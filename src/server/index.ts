#!/usr/bin/env node
// TODO use cluster to imrpove our server performance
import { http } from './server';
import open from 'open';

let port = 15000;

http.on('error', function (e: NodeJS.ErrnoException) {
	if (e.code === 'EADDRINUSE') {
		port++;
		http.listen(port);
	}
});

http.on('listening', function () {
	console.log(`Jagtester running on http://localhost:${port}`);
	open(`http://localhost:${port}`).catch((err) => console.log(err));
});

http.listen(port);
