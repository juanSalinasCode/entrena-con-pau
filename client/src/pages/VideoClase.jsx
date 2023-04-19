import { React, Component } from 'react';
import Video from '../component/Video.jsx';
import browserStorage from 'browser-storage';

class VideoClase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			idLibrary: '71821',
			idVideo: '',
		};
	}

	componentDidMount() {
		const token = browserStorage.getItem('jwtToken');
		if (!token) {
			window.location.href = '/login';
		}
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		const video = JSON.parse(browserStorage.getItem('video'));
		this.setState({
			title: video.title,
			idVideo: video.guid,
		});
	}

	render() {
		return (
			<Video
				idLibrary={this.state.idLibrary}
				title={this.state.title}
				idVideo={this.state.idVideo}
			/>
		);
	}
}

export default VideoClase;
