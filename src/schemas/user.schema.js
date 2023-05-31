import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
	_id: { type: String, _id: false },
	name: { type: String, require: false, minLength: 2, maxLength: 50 },
	email: { type: String, require: true, unique: true },
	password: { type: String, require: true },
});

userSchema.methods.setPassword = function (newPassword) {
	this.password = newPassword;
};

const UserModel = model('User', userSchema);

export default UserModel;
