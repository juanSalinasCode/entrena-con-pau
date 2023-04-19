import DailyVideoDateBusiness from '#Business/dailyVideoDate/dailyVideoDate.business.js';

const dailyVideoDateBusiness = new DailyVideoDateBusiness();

const getAllDailyVideoDateController = async (req, res) => {
	try {
		const allDailyVideoList = await dailyVideoDateBusiness.getAllDailyVideoDates();
		return res.send({ allDailyVideoList });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.send('Ocurrió un error al obtener la lista de fechas de video diario');
	}
};

export default getAllDailyVideoDateController;
