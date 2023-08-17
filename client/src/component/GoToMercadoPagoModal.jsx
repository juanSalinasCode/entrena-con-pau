import React, { Component } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './GoToMercadoPagoModal.module.css';

class GoToMercadoPagoModal extends Component {
	static propTypes = {
		handleShowGoToMercadoPagoModal: PropTypes.func.isRequired,
		handleCloseGoToMercadoPagoModal: PropTypes.func.isRequired,
		showGoToMercadoPagoModal: PropTypes.bool.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Modal
				className={styles.modal}
				show={this.props.showGoToMercadoPagoModal}
				onHide={this.props.handleCloseGoToMercadoPagoModal}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						Recorda presionar este boton para volver a la web, de esta forma
						tu usuario quedara asociado a la prueba gratis para que puedas
						comenzar! 💪{' '}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Image
						className={styles.image}
						src='https://entrenaconpau.b-cdn.net/recordarBoton.png'
					></Image>
					<br></br>
					<Button
						className={styles.button}
						onClick={() => {
							window.location.href =
								'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808487562016018757c82f270099';
						}}
					>
						Ok! Continuar
					</Button>
				</Modal.Body>
			</Modal>
		);
	}
}

export default GoToMercadoPagoModal;
