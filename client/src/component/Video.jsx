import React from 'react';
import PropTypes from 'prop-types';
import styles from './Video.module.css';

class Video extends React.Component {
	static propTypes = {
		idLibrary: PropTypes.string.isRequired,
		idVideo: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		categories: PropTypes.arrayOf(PropTypes.string),
	};

	render() {
		const { idLibrary, idVideo, title } = this.props;
		return (
			<>
				<div>
					<h1 className={styles.title}>{title}</h1>
				</div>
				<div className={styles.videoCenter}>
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
				</div>
				<div>{/* <CategoriesList categories={this.state.categories} /> */}</div>
			</>
		);
	}
}

export default Video;
