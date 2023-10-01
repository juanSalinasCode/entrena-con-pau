import { React, Component } from 'react';
// import { Button } from 'react-bootstrap';
import styles from './Stripe.module.css';
import PropTypes from 'prop-types';
import browserStorage from 'browser-storage';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

class Stripe extends Component {
	static propTypes = {
		aspectRatio: PropTypes.number.isRequired,
	};

	state = {
		imageUrl: '',
		classTitle: null,
		classText: null,
		classDivModal: null,
		classDivModalBackground: null,
		classInputStripe: null,
		classButtonStripe: null,
		email: '',
		password: '',
		errors: [],
		subscriptionId: '',
		userLogged: null,
	};

	componentDidMount() {
		this.updateClass(this.props.aspectRatio);
		this.associateSubscriptionToUser().then(() => {
			this.checkTokenAndLoadUserData();
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.aspectRatio !== this.props.aspectRatio) {
			this.updateClass(this.props.aspectRatio);
		}
	}

	updateClass(aspectRatio) {
		if (aspectRatio >= 1.1) {
			this.setState({
				imageUrl: 'https://entrenaconpau.b-cdn.net/fondoLoginHorizontal.jpg',
				classTitle: styles.title_h,
				classText: styles.text_h,
				classDivModal: styles.divModal_h,
				classDivModalBackground: styles.divModalBackground_h,
				classButtonPrimary: styles.buttonPrimary_h,
			});
		} else {
			this.setState({
				imageUrl: 'https://entrenaconpau.b-cdn.net/fondoLoginVertical.jpg',
				classTitle: styles.title_v,
				classText: styles.text_v,
				classDivModal: styles.divModal_v,
				classDivModalBackground: styles.divModalBackground_v,
				classButtonPrimary: styles.buttonPrimary_v,
			});
		}
	}

	associateSubscriptionToUser = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const subscriptionIdParam = urlParams.get('preapproval_id');
		await this.setState({ subscriptionId: subscriptionIdParam });
		const token = browserStorage.getItem('jwtToken');
		const { subscriptionId } = this.state;
		return fetch('/user/update-subscription', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ subscriptionId }),
		});
	};

	checkTokenAndLoadUserData = async () => {
		const token = browserStorage.getItem('jwtToken');

		return fetch('/user/profile', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(res => {
				if (res.status === 200) {
					return res.json(); // Parse the response body as JSON
				}
				throw new Error('Invalid response');
			})
			.then(data => {
				this.setState({
					userLogged: data,
				});
			})
			.catch(error => {
				console.error(error);
				this.setState({
					userLogged: null,
				});
			});
	};

	render() {
		return (
			<div
				style={{
					backgroundImage: `url(${this.state.imageUrl})`,
				}}
				className={styles.divBackground}
			>
				<div
					className={
						this.state.classDivModal +
						' ' +
						this.state.classDivModalBackground
					}
				></div>
				<div className={this.state.classDivModal}>
					<p className={this.state.classTitle}>#EntrenaConPau</p>
					{/* <Elements stripe={stripePromise} options={options}>
						<CheckoutForm />
					</Elements> */}
				</div>
			</div>
		);
	}
}

export default Stripe;
