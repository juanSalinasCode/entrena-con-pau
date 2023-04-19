import DailyVideoDateDAO from '#DAO/dailyVideoDate/dailyVideoDate.dao.js';

class DailyVideoDateBusiness {
	constructor() {
		this.dailyVideoDateDAO = new DailyVideoDateDAO();
	}

	async createDailyVideoDate(_id, videoId, date) {
		const existingDailyVideoDateById = await this.dailyVideoDateDAO.findById(_id);
		if (existingDailyVideoDateById) {
			throw new Error('Ya existe un dailyVideoDate con ese id registrado');
		}

		const existingDailyVideoDateByDate = await this.dailyVideoDateDAO.findByDate(
			date,
		);
		if (existingDailyVideoDateByDate) {
			throw new Error('Ya existe un dailyVideoDate con esa fecha registrada');
		}

		await this.dailyVideoDateDAO.create(_id, videoId, date);
	}

	async getAllDailyVideoDates() {
		return this.dailyVideoDateDAO.findAll();
	}
}

export default DailyVideoDateBusiness;
