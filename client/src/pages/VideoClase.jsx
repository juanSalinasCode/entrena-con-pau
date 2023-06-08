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
			clickVideoRedirect: null,
		};
	}

	componentDidMount() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});

		this.checkUserData();

		this.uploadVideoData();
	}

	checkUserData() {
		const token = browserStorage.getItem('jwtToken');
		if (!token) {
			this.setState({
				clickVideoRedirect: '/login',
			});
		} else {
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
					if (data.subscriptionData?.status === 'authorized') {
						this.setState({
							clickVideoRedirect: null,
						});
					} else {
						this.setState({
							clickVideoRedirect: '/register',
						});
					}
				})
				.catch(error => {
					console.error(error);
					this.setState({
						clickVideoRedirect: '/login',
					});
				});
		}
	}

	uploadVideoData() {
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
				clickVideoRedirect={this.state.clickVideoRedirect}
				thumbnailFileName={this.state.thumbnailFileName}
			/>
		);
	}
}

export default VideoClase;
