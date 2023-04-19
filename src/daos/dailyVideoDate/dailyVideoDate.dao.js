import DailyVideoDateModel from '#Schemas/dailyVideoDate.schema.js';

class DailyVideoDateDAO {
	async findById(_id) {
		return DailyVideoDateModel.findById(_id).exec();
	}

	async findByDate(date) {
		return DailyVideoDateModel.findOne({ date }).exec();
	}

	async findAll() {
		return DailyVideoDateModel.find().exec();
	}

	async create(_id, videoId, date) {
		const dailyVideoDate = new DailyVideoDateModel({ _id, videoId, date });
		await dailyVideoDate.save();
	}
}

export default DailyVideoDateDAO;
