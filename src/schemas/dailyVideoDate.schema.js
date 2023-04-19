import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const dailyVideoDateSchema = new Schema({
	_id: { type: String, _id: false },
	videoId: { type: String, required: true },
	date: { type: String, required: true, unique: true },
});

const DailyVideoDateModel = model('daily_video_date', dailyVideoDateSchema);

export default DailyVideoDateModel;
