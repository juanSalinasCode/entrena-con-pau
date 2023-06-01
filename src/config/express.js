import videosRouter from '#Routes/videos.routes.js';
import userRouter from '#Routes/user.routes.js';
// import userMpRegisterController from '#Controllers/user/user-mp-register.controller.js';
import express from 'express';
import path from 'path';
import cors from 'cors';

const expressApp = express();

console.log(path.join(process.cwd(), 'client/dist'));

// Middlewares
expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(express.static(path.join(process.cwd(), 'client/dist')));

// Routes
expressApp.use('/user', userRouter);

expressApp.use('/videos', videosRouter);

expressApp.get('*', (req, res) => {
	res.sendFile(path.join(process.cwd(), 'client/dist/index.html'));
});

expressApp.post('/notificaciones', (req, res) => {
	console.log(req.body); // Llame su acción sobre la solicitud aquí
	res.status(200).end(); // Responder es importante
});

export default expressApp;
