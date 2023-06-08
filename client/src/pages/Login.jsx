import { React, Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import styles from './Login.module.css';
import PropTypes from 'prop-types';
import browserStorage from 'browser-storage';

class Login extends Component {
	static propTypes = {
		aspectRatio: PropTypes.number.isRequired,
	};

	state = {
		imageUrl: '',
		classTitle: null,
		classDivModal: null,
		classDivModalBackground: null,
		classInputLogin: null,
		classButtonPrimary: null,
		classButtonSecondary: null,
		email: '',
		password: '',
		errors: [],
		userLogged: null,
	};

	componentDidMount() {
		this.updateClass(this.props.aspectRatio);
		const urlParams = new URLSearchParams(window.location.search);
		const emailParam = urlParams.get('email');
		const passwordParam = urlParams.get('password');
		this.setState({ email: emailParam, password: passwordParam });
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
				classDivModal: styles.divModal_h,
				classDivModalBackground: styles.divModalBackground_h,
				classInputLogin: styles.inputLogin_h,
				classButtonPrimary: styles.buttonPrimary_h,
				classButtonSecondary: styles.buttonSecondary_h,
			});
		} else {
			this.setState({
				imageUrl: 'https://entrenaconpau.b-cdn.net/fondoLoginVertical.jpg',
				classTitle: styles.title_v,
				classDivModal: styles.divModal_v,
				classDivModalBackground: styles.divModalBackground_v,
				classInputLogin: styles.inputLogin_v,
				classButtonPrimary: styles.buttonPrimary_v,
				classButtonSecondary: styles.buttonSecondary_v,
			});
		}
	}

	// estas funciones handle estan generando errores por consola pero funcionan

	handleEmail = event => {
		const email = event.target.value.trim(); // Eliminar espacios en blanco al inicio y al final

		this.setState({ email });
	};

	handlePassword = event => {
		this.setState({ password: event.target.value });
	};

	handleLogin = async () => {
		const { email, password } = this.state;
		const res = await fetch('/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await res.json();
		if (res.status === 200) {
			browserStorage.setItem('jwtToken', data.jwt);
			this.checkUserSubscriptionState();
		} else {
			this.setState({ errors: data.errors });
		}
	};

	checkUserSubscriptionState = async () => {
		const token = browserStorage.getItem('jwtToken');
		if (!token) {
			this.setState({
				userLogged: null,
			});
			return;
		}

		fetch('/user/profile', {
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
				if (data?.subscriptionData?.status === 'authorized') {
					window.location.href = '/';
				} else {
					window.location.href = '/register';
				}
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
					<input
						className={this.state.classInputLogin}
						onChange={this.handleEmail}
						value={this.state.email}
						placeholder='Email'
					/>
					<input
						className={this.state.classInputLogin}
						onChange={this.handlePassword}
						value={this.state.password}
						placeholder='Contraseña'
					/>
					<div className={styles.divButton}>
						<Button
							className={this.state.classButtonPrimary}
							onClick={this.handleLogin}
						>
							<div>A Entrenar!</div>
						</Button>
						<Button
							className={this.state.classButtonSecondary}
							onClick={() => {
								window.location.href = '/register';
							}}
						>
							<div>Registrarse</div>
						</Button>
					</div>
				</div>
				{this.state.errors.length > 0 && (
					<Alert
						variant='danger'
						onClose={() => this.setState({ errors: [] })}
						dismissible
						className={this.state.classDivModal}
					>
						{this.state.errors.map((error, index) => (
							<p key={index}>{error}</p>
						))}
					</Alert>
				)}
			</div>
		);
	}
}

export default Login;
