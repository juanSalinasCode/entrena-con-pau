import { React, Component } from 'react';
import browserStorage from 'browser-storage';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';

class Profile extends Component {
	static propTypes = {
		aspectRatio: PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			classTitle: null,
			classText: null,
			classDivModal: null,
			classDivModalBackground: null,
			classInputProfile: null,
			userLogged: null,
			name: '',
			email: '',
			errors: [],
		};
	}

	componentDidMount() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});

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
				classTitle: styles.title_h,
				classDivModal: styles.divModal_h,
				classDivModalBackground: styles.divModalBackground_h,
				classText: styles.text_h,
				classInputProfile: styles.inputProfile_h,
			});
		} else {
			this.setState({
				classTitle: styles.title_v,
				classDivModal: styles.divModal_v,
				classDivModalBackground: styles.divModalBackground_v,
				classText: styles.text_v,
				classInputProfile: styles.inputProfile_v,
			});
		}
	}

	render() {
		return (
			<>
				<div className='block pb-2 border-bottom'>
					<div className={styles.clasesTopDiv}>
						<p className={this.state.classTitle}>Perfil</p>
					</div>
				</div>
				<input
					className={this.state.classInputProfile}
					onChange={this.handleName}
					value={this.state.name}
					placeholder='Nombre'
				/>
				<input
					className={this.state.classInputProfile}
					onChange={this.handleEmail}
					value={this.state.email}
					placeholder='Email'
				/>
			</>
		);
	}
}

export default Profile;
