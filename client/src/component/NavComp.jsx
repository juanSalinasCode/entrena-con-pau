import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link } from 'react-router-dom';
import styles from './NavComp.module.css';
import PropTypes from 'prop-types';

class NavComp extends React.Component {
	static propTypes = {
		aspectRatio: PropTypes.number.isRequired,
	};

	// Estado para almacenar la clase del título del navbar
	state = {
		classNavbarTitle: null,
		classLink: null,
	};

	componentDidMount() {
		this.updateClass(this.props.aspectRatio);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.aspectRatio !== this.props.aspectRatio) {
			this.updateClass(this.props.aspectRatio);
		}
	}

	// Función para cambiar las clases navbar según el aspect ratio
	updateClass(aspectRatio) {
		if (aspectRatio >= 1.1) {
			this.setState({
				classNavbarTitle: styles.navbarTitle_h,
				classLink: styles.link_h,
			});
		} else {
			this.setState({
				classNavbarTitle: styles.navbarTitle_v,
				classLink: styles.link_v,
			});
		}
	}

	render() {
		return (
			<>
				{/* Navbar fijo en la parte superior de la página */}
				<Navbar className='fixed-top'>
					<Container>
						{/* Marca con el nombre de la página */}
						<Navbar.Brand href='/'>
							<p className={this.state.classNavbarTitle}>#EntrenaConPau</p>
						</Navbar.Brand>
						{/* Botón para desplegar opciones de navegación */}
						<Navbar.Toggle aria-controls='basic-navbar-nav' />
						<Navbar.Collapse id='basic-navbar-nav'>
							<Nav className='me-auto'>
								{/* Opción para ir a la página de clases */}
								<Nav.Link as={Link} to='/'>
									<p className={this.state.classLink}>clases</p>
								</Nav.Link>
								{/* Opción para ir a la página de video diario */}
								<Nav.Link as={Link} to='/video-diario'>
									<p className={this.state.classLink}>video diario</p>
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>

				{/* Sección para mostrar el contenido de la página */}
				<section>
					<Outlet></Outlet>
				</section>
			</>
		);
	}
}

export default NavComp;
