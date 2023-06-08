import React from 'react';
import PropTypes from 'prop-types';
import styles from './Video.module.css';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

class Video extends React.Component {
	static propTypes = {
		aspectRatio: PropTypes.number.isRequired,
		idLibrary: PropTypes.string.isRequired,
		idVideo: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		categories: PropTypes.arrayOf(PropTypes.string),
		clickVideoToLogin: PropTypes.bool,
		thumbnailFileName: PropTypes.string,
	};

	render() {
		const { idLibrary, idVideo, title, thumbnailFileName, clickVideoToLogin } =
			this.props;
		const thumbnailBase = 'https://vz-2adbff09-bc7.b-cdn.net/';

		return (
			<>
				<div>
					<h1 className={styles.title}>{title}</h1>
				</div>
				<div
					className={styles.videoCenter}
					onClick={
						clickVideoToLogin ? () => (window.location.href = '/login') : NaN
					}
				>
					{clickVideoToLogin ? (
						<div className={styles.thumbnail}>
							<Image
								src={thumbnailBase + idVideo + '/' + thumbnailFileName}
								fluid
							/>
							<Button className={styles.playButton}>
								<FontAwesomeIcon icon={faPlay} />
							</Button>
						</div>
					) : (
						<iframe
							src={`https://iframe.mediadelivery.net/embed/${idLibrary}/${idVideo}?autoplay=false`}
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
					)}
				</div>
				<div>{/* <CategoriesList categories={this.state.categories} /> */}</div>

				<div className={styles.divRelleno}></div>
			</>
		);
	}
}

export default Video;
