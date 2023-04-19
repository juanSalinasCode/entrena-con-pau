import { React, Component } from 'react';
import Video from '../component/Video.jsx';
import DailyVideoList from '../component/DailyVideoList.jsx';
import browserStorage from 'browser-storage';

class VideoDiario extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			idLibrary: '71821',
			idVideo: '',
			allDailyVideoList: [],
		};
		this.setDailyVideo = this.setDailyVideo.bind(this);
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
		fetch('/videos/getDailyVideoDates')
			.then(res => res.json())
			.then(data => {
				this.setState({
					allDailyVideoList: data.allDailyVideoList,
				});
			});
	}

	setDailyVideo(item) {
		this.setState({
			title: 'Video Diario',
			idVideo: item.videoId,
		});
	}

	render() {
		return (
			<>
				<DailyVideoList
					allDailyVideoList={this.state.allDailyVideoList}
					setDailyVideo={this.setDailyVideo}
				/>
				<Video
					idLibrary={this.state.idLibrary}
					title={this.state.title}
					idVideo={this.state.idVideo}
				/>
			</>
		);
	}
}

export default VideoDiario;
