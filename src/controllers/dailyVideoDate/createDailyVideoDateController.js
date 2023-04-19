import DailyVideoDateBusiness from '#Business/dailyVideoDate/dailyVideoDate.business.js';

const dailyVideoDateBusiness = new DailyVideoDateBusiness();

const dailyVideoDateCreateController = async (req, res) => {
	const { _id, videoId, date } = req.body;

	try {
		await dailyVideoDateBusiness.createDailyVideoDate(_id, videoId, date);
		return res.status(201).send('Fecha de video diario registrada con éxito');
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.send('Ocurrió un error al registrar la fecha de video diario');
	}
};

export default dailyVideoDateCreateController;
