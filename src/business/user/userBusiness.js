// userBusiness.js
import PaymentsDAO from '#DAO/apiMercadoPago/paymentsDAO.js';
import SubscriptionsDAO from '#DAO/apiMercadoPago/subscriptionsDAO.js';
import { SALT } from '#Constants/salt.js';
import UserModel from '#Schemas/user.schema.js';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class UserBusiness {
	constructor() {
		this.paymentsDAO = new PaymentsDAO();
		this.subscriptionsDAO = new SubscriptionsDAO();
	}

	async getUserSubscriptionData(subscriptionId) {
		try {
			const subscriptionData = await this.subscriptionsDAO.getSubscriptionData(
				subscriptionId,
			);
			const subscription = {
				id: subscriptionData.id,
				status: subscriptionData.status,
			};

			return subscription;
		} catch (err) {
			console.error('error:' + err);
			throw err;
		}
	}

	async createNewUserFromPaymentId(paymentId) {
		try {
			const paymentData = await this.paymentsDAO.getPaymentData(paymentId);
			const email = paymentData.payer.email;
			const existingUserByEmail = await UserModel.findOne({ email }).exec();
			if (existingUserByEmail) {
				throw new Error('Ya existe un usuario con ese email registrado');
			}
			const password = this.createPassword();
			const hashedPassword = await hash(password, SALT);
			const user = new UserModel({
				_id: uuidv4(),
				email: paymentData.payer.email,
				password: hashedPassword,
			});

			await user.save();

			user.setPassword(password);

			return user;
		} catch (err) {
			console.error('error:' + err);
			throw err;
		}
	}

	createPassword() {
		const characters =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let password = '';
		let hasLowerCase = false;
		let hasUpperCase = false;
		let hasNumber = false;

		while (password.length < 10 || !hasLowerCase || !hasUpperCase || !hasNumber) {
			const randomChar = characters[Math.floor(Math.random() * characters.length)];
			password += randomChar;

			if (!hasLowerCase && /[a-z]/.test(randomChar)) {
				hasLowerCase = true;
			}
			if (!hasUpperCase && /[A-Z]/.test(randomChar)) {
				hasUpperCase = true;
			}
			if (!hasNumber && /[0-9]/.test(randomChar)) {
				hasNumber = true;
			}
		}

		return password;
	}
}

export default UserBusiness;
