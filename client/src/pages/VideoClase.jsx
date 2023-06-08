import { React, Component } from 'react';
import Video from '../component/Video.jsx';
import browserStorage from 'browser-storage';
import PropTypes from 'prop-types';

class VideoClase extends Component {
	static propTypes = {
		aspectRatio: PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			idLibrary: '71821',
			idVideo: '',
			categories: [],
			thumbnailFileName: '',
			clickVideoToLogin: false,
		};
	}

	componentDidMount() {
		const token = browserStorage.getItem('jwtToken');
		if (!token) {
			// window.location.href = '/login';
			this.setState({
				clickVideoToLogin: true,
			});
		}
		fetch('/user/profile', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(res => {
				if (res.status !== 200) {
					// window.location.href = '/login';
					this.setState({
						clickVideoToLogin: true,
					});
				}
				// Continue normalmente
			})
			.catch(error => {
				console.error(error);
				// window.location.href = '/login';
				this.setState({
					clickVideoToLogin: true,
				});
			});
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		const video = JSON.parse(browserStorage.getItem('video'));
		this.setState({
			title: video.title,
			idVideo: video.guid,
			categories: video.categories,
			thumbnailFileName: video.thumbnailFileName,
		});
	}

	render() {
		return (
			<Video
				aspectRatio={this.props.aspectRatio}
				idLibrary={this.state.idLibrary}
				title={this.state.title}
				idVideo={this.state.idVideo}
				categories={this.state.categories}
				clickVideoToLogin={this.state.clickVideoToLogin}
				thumbnailFileName={this.state.thumbnailFileName}
			/>
		);
	}
}

export default VideoClase;
