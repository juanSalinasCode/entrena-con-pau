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
				categories: PropTypes.arrayOf(PropTypes.string).isRequired,
				thumbnailFileName: PropTypes.string.isRequired,
				lengthTimeMinutes: PropTypes.number.isRequired,
			}),
		).isRequired,
	};

	handleClick = video => {
		browserStorage.setItem('video', JSON.stringify(video));
	};

	render() {
		const thumbnailBase = 'https://vz-2adbff09-bc7.b-cdn.net/';
		const { videoList } = this.props;

		// Ordenar la lista de videos por número de clase
		const sortedVideoList = videoList.sort((a, b) => {
			// Obtener los últimos dos caracteres del título como un número
			const aClassNumber = parseInt(a.title.slice(-2));
			const bClassNumber = parseInt(b.title.slice(-2));

			// Si uno de los títulos no tiene un número de clase, colocarlo al final
			if (isNaN(aClassNumber)) {
				return 1;
			} else if (isNaN(bClassNumber)) {
				return -1;
			}

			// Ordenar por número de clase ascendente
			return aClassNumber - bClassNumber;
		});

		return (
			<div className={styles.videoListContainer}>
				{sortedVideoList.map(video => (
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
									<div
										className={styles.timeDiv}
									>{`${video.lengthTimeMinutes} min`}</div>
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
