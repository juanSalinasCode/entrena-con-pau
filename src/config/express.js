import videosRouter from '#Routes/videos.routes.js';
import userRouter from '#Routes/user.routes.js';
import express from 'express';
import path from 'path';

const expressApp = express();

console.log(path.join(process.cwd(), 'client/dist'));

// Middlewares
expressApp.use(express.json());
expressApp.use(express.static(path.join(process.cwd(), 'client/dist')));

// Routes
expressApp.use('/user', userRouter);

expressApp.use('/videos', videosRouter);

expressApp.get('*', (req, res) => {
	res.sendFile(path.join(process.cwd(), 'client/dist/index.html'));
});

export default expressApp;