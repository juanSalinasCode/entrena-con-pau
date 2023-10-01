// <iframe
// 	src='https://iframe.mediadelivery.net/embed/71821/1739174e-cf41-44a8-aeb5-59e28eff0c1b?autoplay=false'
// 	loading='lazy'
// 	allow='accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;'
// 	allowfullscreen='true'
// 	style='padding: 1%; width: 80vw; height: 45vw; border-radius: 2vw;'
// ></iframe>

import { React, Component } from 'react';
import PropTypes from 'prop-types';

class VideoClase extends Component {
	static propTypes = {
		aspectRatio: PropTypes.number.isRequired,
	};

	componentDidMount() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	render() {
		return (
			<>
				<h1>probando</h1>;
				<iframe
					src={`https://iframe.mediadelivery.net/embed/71821/9d942759-a782-4498-ae2d-15ffefa75114?autoplay=false`}
					loading='lazy'
					style={{
						padding: '1%',
						width: '80vw',
						height: '45vw',
						borderRadius: '2vw',
					}}
					allow={
						'accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;'
					}
					allowfullscreen='true'
				/>
				;
			</>
		);
	}
}

export default VideoClase;
