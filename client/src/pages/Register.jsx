import { React, Component } from 'react';
import { Button } from 'react-bootstrap';
import styles from './Register.module.css';
import PropTypes from 'prop-types';

class Login extends Component {
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
	};

	componentDidMount() {
		this.updateClass(this.props.aspectRatio);
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
				classButtonPrimary: styles.buttonPrimary_h,
				classButtonSecondary: styles.buttonSecondary_h,
				classText: styles.text_h,
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
			});
		}
	}

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
					<p className={this.state.classText}>
						Que bueno que ta haya interesado la plataforma! , comenza tu
						prueba gratuita para obtener tu usuario y contraseña. Te llegaran
						por correo. Podes consultarnos cualquier cosa a nuestro correo
						entrenaconpau@gmail.com o al +54 9 11 5318-5532
					</p>
					<div className={styles.divButton}>
						<Button
							className={this.state.classButtonPrimary}
							onClick={() => {
								window.location.href =
									'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808487562016018757c82f270099';
							}}
						>
							<div>Comenzar</div>
						</Button>
						<Button
							className={this.state.classButtonSecondary}
							onClick={() => {
								window.location.href = '/login';
							}}
						>
							<div>Login</div>
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
