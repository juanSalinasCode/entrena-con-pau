import getVideosController from '#Controllers/apiBunny/getVideosController.js';
import getAllVideoDateController from '#Controllers/dailyVideoDate/getAllDailyVideoDateController.js';
import dailyVideoDateCreateController from '#Controllers/dailyVideoDate/createDailyVideoDateController.js';
import dailyVideoDateCreateDTO from '#Dto/dailyVideoDate-create.dto.js';
import { Router } from 'express';

const videosRouter = Router();

videosRouter.get('/getVideos', getVideosController);

videosRouter.get('/getDailyVideoDates', getAllVideoDateController);

videosRouter.post(
	'/createDailyVideoDate',
	dailyVideoDateCreateDTO,
	dailyVideoDateCreateController,
);

export default videosRouter;
