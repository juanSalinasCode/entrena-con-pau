// getVideosController.js
import VideosBusiness from '#Business/apiBunny/videosBusiness.js';

const videosBusiness = new VideosBusiness();

const getVideosController = async (req, res) => {
	try {
		const videoList = await videosBusiness.getAllVideosData();
		return res.send({ videoList });
	} catch (err) {
		return res.send(err);
	}
};

export default getVideosController;
