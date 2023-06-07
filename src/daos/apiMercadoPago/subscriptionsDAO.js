// subscriptionsDAO.js
import fetch from 'node-fetch';

class SubscriptionsDAO {
	constructor() {
		this.mpAccessToken = process.env.MP_ACCESS_TOKEN;
	}

	async getSubscriptionData(subscriptionId) {
		const url = `https://api.mercadopago.com/preapproval/${subscriptionId}`;
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

export default SubscriptionsDAO;
