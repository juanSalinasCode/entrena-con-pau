import { React, Component } from 'react';
import styles from './Welcome.module.css';
import PropTypes from 'prop-types';

class Welcome extends Component {
	static propTypes = {
		aspectRatio: PropTypes.number.isRequired,
	};

	state = {
		imageUrl: '',
		classTitle: null,
		classText: null,
		classDivModal: null,
		classDivModalBackground: null,
		classInputWelcome: null,
		classButtonWelcome: null,
		email: '',
		password: '',
		errors: [],
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
				classText: styles.text_h,
				classDivModal: styles.divModal_h,
				classDivModalBackground: styles.divModalBackground_h,
			});
		} else {
			this.setState({
				imageUrl: 'https://entrenaconpau.b-cdn.net/fondoLoginVertical.jpg',
				classTitle: styles.title_v,
				classText: styles.text_v,
				classDivModal: styles.divModal_v,
				classDivModalBackground: styles.divModalBackground_v,
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
						Bienvenid@! tu suscripción se realizo con exito, en el dia de hoy
						te enviaremos un correo con un link de acceso y tu contraseña para
						ingresar, espero que disfrutes de la app, no dudes en consultar
						cualquier duda!
					</p>
				</div>
			</div>
		);
	}
}

export default Welcome;
