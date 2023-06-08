import { React, Component } from 'react';
import Video from '../component/Video.jsx';
import DailyVideoList from '../component/DailyVideoList.jsx';
import browserStorage from 'browser-storage';
import PropTypes from 'prop-types';

class VideoDiario extends Component {
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
					aspectRatio={this.props.aspectRatio}
					allDailyVideoList={this.state.allDailyVideoList}
					setDailyVideo={this.setDailyVideo}
				/>
				<Video
					aspectRatio={this.props.aspectRatio}
					idLibrary={this.state.idLibrary}
					title={this.state.title}
					idVideo={this.state.idVideo}
					categories={this.state.categories}
				/>
			</>
		);
	}
}

export default VideoDiario;
