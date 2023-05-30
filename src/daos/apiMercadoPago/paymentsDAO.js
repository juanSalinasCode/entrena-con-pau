// paymentsDAO.js
import fetch from 'node-fetch';

class PaymentsDAO {
	constructor() {
		this.mpAccessToken = process.env.MP_ACCESS_TOKEN;
	}

	async getPaymentData(paymentId) {
		const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${this.mpAccessToken}`,
			},
		};

		try {
			const resFetch = await fetch(url, options);
			const json = await resFetch.json();
			return json;
		} catch (err) {
			console.error('error:' + err);
			throw err;
		}
	}
}

export default PaymentsDAO;
