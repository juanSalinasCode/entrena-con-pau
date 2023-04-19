import React from 'react';
import styles from './VideoList.module.css';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import browserStorage from 'browser-storage';

class VideoList extends React.Component {
	static propTypes = {
		videoList: PropTypes.arrayOf(
			PropTypes.shape({
				guid: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
				hide: PropTypes.bool.isRequired,
				categories: PropTypes.arrayOf(PropTypes.string),
				thumbnailFileName: PropTypes.string,
			}),
		).isRequired,
	};

	handleClick = video => {
		browserStorage.setItem('video', JSON.stringify(video));
	};

	render() {
		const thumbnailBase = 'https://vz-2adbff09-bc7.b-cdn.net/';
		const { videoList } = this.props;

		return (
			<div className={styles.videoListContainer}>
				{videoList.map(video => (
					<>
						<div
							className={styles.video}
							onClick={() => this.handleClick(video)}
							hidden={video.hide}
						>
							<Link to='/video-clase'>
								<p className={styles.title}>{'        ' + video.title}</p>

								<div className={styles.thumbnail}>
									<Image
										src={
											thumbnailBase +
											video.guid +
											'/' +
											video.thumbnailFileName
										}
										fluid
									/>
									<Button className={styles.playButton}>
										<FontAwesomeIcon icon={faPlay} />
									</Button>
								</div>
							</Link>
						</div>
					</>
				))}
			</div>
		);
	}
}

export default VideoList;
