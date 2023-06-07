import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import styles from './Register.module.css';
import PropTypes from 'prop-types';
import browserStorage from 'browser-storage';
import { v4 as uuidv4 } from 'uuid';

class Register extends Component {
	static propTypes = {
		aspectRatio: PropTypes.number.isRequired,
	};

	state = {
		imageUrl: '',
		classTitle: null,
		classText: null,
		classDivModal: null,
		classDivModalBackground: null,
		classButtonPrimary: null,
		classButtonSecondary: null,
		userLogged: null,
		name: '',
		email: '',
		confirmEmail: '',
		password: '',
		confirmPassword: '',
		errors: [],
	};

	componentDidMount() {
		this.updateClass(this.props.aspectRatio);
		this.checkTokenAndLoadUserData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.aspectRatio !== this.props.aspectRatio) {
			this.updateClass(this.props.aspectRatio);
		}
	}

	checkTokenAndLoadUserData() {
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
			})
			.catch(error => {
				console.error(error);
				this.setState({
					userLogged: null,
				});
			});
	}

	updateClass(aspectRatio) {
		if (aspectRatio >= 1.1) {
			this.setState({
				imageUrl: 'https://entrenaconpau.b-cdn.net/fondoLoginHorizontal.jpg',
				classTitle: styles.title_h,
				classDivModal: styles.divModal_h,
				classDivModalBackground: styles.divModalBackground_h,
				classButtonPrimary: styles.buttonPrimary_h,
				classButtonSecondary: styles.buttonSecondary_h,
				classText: styles.text_h,
				classInputLogin: styles.inputLogin_h,
			});
		} else {
			this.setState({
				imageUrl: 'https://entrenaconpau.b-cdn.net/fondoLoginVertical.jpg',
				classTitle: styles.title_v,
				classDivModal: styles.divModal_v,
				classDivModalBackground: styles.divModalBackground_v,
				classButtonPrimary: styles.buttonPrimary_v,
				classButtonSecondary: styles.buttonSecondary_v,
				classText: styles.text_v,
				classInputLogin: styles.inputLogin_v,
			});
		}
	}

	generateId() {
		return uuidv4();
	}

	handleName = event => {
		this.setState({ name: event.target.value });
	};

	handleEmail = event => {
		this.setState({ email: event.target.value });
	};

	handleConfirmEmail = event => {
		this.setState({ confirmEmail: event.target.value });
	};

	handlePassword = event => {
		this.setState({ password: event.target.value });
	};

	handleConfirmPassword = event => {
		this.setState({ confirmPassword: event.target.value });
	};

	handleRegister = async () => {
		const { name, email, password, confirmEmail, confirmPassword } = this.state;
		const errors = [];

		if (name.length < 2 || name.length > 50) {
			errors.push(
				'Nombre de usuario invalido ingresa un nombre que contenga entre 2 y 50 caracteres',
			);
		}

		if (email !== confirmEmail) {
			errors.push(
				'Confirmacion de correo invalida. Debes confirmar tu correo y debe coincidir en ambos campos',
			);
		}

		if (password !== confirmPassword) {
			errors.push(
				'Confirmacion de contraseña invalida. Debes confirmar tu contraseña y debe coincidir en ambos campos',
			);
		}

		if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
			errors.push('El formato del correo ingresado es icorrecto.');
		}

		if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g.test(password)) {
			errors.push(
				'La contraseña debe contener entre 8 y 25 caracteres, tener almenos una mayuscula, una minuscula y un numero ',
			);
		}

		if (errors.length > 0) {
			this.setState({ errors });
			return;
		}

		const _id = this.generateId();

		const res = await fetch('/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, password, _id }),
		});
		if (res.status === 201) {
			this.handleLogin();
		} else {
			this.setState({ errors: res.errors });
		}
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
			this.checkTokenAndLoadUserData();
		} else {
			this.setState({ errors: data.errors });
		}
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
					{!this.state.userLogged ? (
						<>
							<input
								className={this.state.classInputLogin}
								onChange={this.handleName}
								value={this.state.name}
								placeholder='Nombre'
							/>
							<input
								className={this.state.classInputLogin}
								onChange={this.handleEmail}
								value={this.state.email}
								placeholder='Email'
							/>
							<input
								className={this.state.classInputLogin}
								onChange={this.handleConfirmEmail}
								value={this.state.confirmEmail}
								placeholder='Confirmar Email'
							/>
							<input
								className={this.state.classInputLogin}
								onChange={this.handlePassword}
								value={this.state.password}
								placeholder='Contraseña entre 8 y 25 caracteres, con números, mayusculas y minusculas'
							/>
							<input
								className={this.state.classInputLogin}
								onChange={this.handleConfirmPassword}
								value={this.state.confirmPassword}
								placeholder='Confirmar Contraseña'
							/>
						</>
					) : (
						<>
							{!this.state.userLogged?.subscriptionData?.status ? (
								<p className={this.state.classText}>
									Que bueno que te haya interesado la plataforma! Tu
									usuario fue creado con éxito, solo falta que actives
									tu suscripción para comenzar la prueba gratuita.
									Puedes consultarnos cualquier cosa a nuestro correo
									entrenaconpau@gmail.com o al +54 9 11 5318-5532
								</p>
							) : (
								<>
									{this.state.userLogged?.subscriptionData?.status ===
									'authorized' ? (
										<p className={this.state.classText}>
											Ya tienes una suscripción activa. Puedes
											consultarnos cualquier cosa a nuestro correo
											entrenaconpau@gmail.com o al +54 9 11
											5318-5532
										</p>
									) : (
										<p className={this.state.classText}>
											Tu suscripción ya no se encuentra activa.
											Puedes escribirnos para reactivarla o
											cualquier cosa a nuestro correo
											entrenaconpau@gmail.com o al +54 9 11
											5318-5532
										</p>
									)}
								</>
							)}
						</>
					)}
					<div className={styles.divButton}>
						<Button
							hidden={this.state.userLogged?.subscriptionData?.status}
							className={this.state.classButtonSecondary}
							onClick={() => {
								window.location.href = '/login';
							}}
						>
							<div>Login</div>
						</Button>
						{!this.state.userLogged && (
							<Button
								className={this.state.classButtonPrimary}
								onClick={this.handleRegister}
							>
								<div>Registrarse</div>
							</Button>
						)}
						{this.state.userLogged &&
							!this.state.userLogged?.subscriptionData?.status && (
								<Button
									className={this.state.classButtonPrimary}
									onClick={() => {
										window.location.href =
											'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808487562016018757c82f270099';
									}}
								>
									<div>Comenzar</div>
								</Button>
							)}
						{this.state.userLogged?.subscriptionData?.status ===
							'authorized' && (
							<Button
								className={this.state.classButtonPrimary}
								onClick={() => {
									window.location.href = '/';
								}}
							>
								<div>Home</div>
							</Button>
						)}
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

export default Register;
