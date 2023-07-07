import React from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import styles from './NavComp.module.css';
import PropTypes from 'prop-types';
import browserStorage from 'browser-storage';

// Importa el icono "grid-fill" de React Bootstrap
import { GridFill } from 'react-bootstrap-icons';

class NavComp extends React.Component {
	static propTypes = {
		aspectRatio: PropTypes.number.isRequired,
	};

	// Estado para almacenar la clase del título del navbar
	state = {
		classNavbarTitle: null,
		classLink: null,
		classStart: null,
		userLogged: null,
	};

	componentDidMount() {
		this.updateClass(this.props.aspectRatio);
		this.checkTokenAndLoadUserData();
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
				classStart: styles.start_h,
			});
		} else {
			this.setState({
				classNavbarTitle: styles.navbarTitle_v,
				classLink: styles.link_v,
				classStart: styles.start_v,
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
						<Nav className='me-auto'>
							{this.props.aspectRatio >= 1.1 ? (
								<>
									{/* Opción para ir a la página de clases */}
									<Nav.Link as={Link} to='/'>
										<p className={this.state.classLink}>clases</p>
									</Nav.Link>
									{/* Opción para ir a la página de video diario */}
									<Nav.Link as={Link} to='/video-diario'>
										<p className={this.state.classLink}>
											video diario
										</p>
									</Nav.Link>
									{/* Boton para comenzar, sea iniciar sección o registrarse */}
									{!this.state.userLogged ? (
										<Nav.Link as={Link} to='/login'>
											<p className={this.state.classStart}>
												comenzar
											</p>
										</Nav.Link>
									) : (
										<></>
									)}
								</>
							) : (
								<NavDropdown
									title={
										<GridFill
											className={
												!this.state.userLogged
													? styles.classMoreOptionsLogo
													: null
											}
										/>
									} // Reemplaza el logotipo por el icono "grid-fill"
									id='collasible-nav-dropdown'
								>
									{/* Opción para ir a la página de clases */}
									<Nav.Link as={Link} to='/'>
										<p className={this.state.classLink}>clases</p>
									</Nav.Link>
									{/* Opción para ir a la página de video diario */}
									<Nav.Link as={Link} to='/video-diario'>
										<p className={this.state.classLink}>
											video diario
										</p>
									</Nav.Link>
									{/* Boton para comenzar, sea iniciar sección o registrarse */}
									{!this.state.userLogged ? (
										<Nav.Link as={Link} to='/login'>
											<p className={this.state.classStart}>
												comenzar
											</p>
										</Nav.Link>
									) : (
										<></>
									)}
								</NavDropdown>
							)}
						</Nav>
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
