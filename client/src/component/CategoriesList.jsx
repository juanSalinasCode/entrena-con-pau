import React from 'react';
import PropTypes from 'prop-types';
import styles from './CategoriesList.module.css';

class CategoriesList extends React.Component {
	static propTypes = {
		categories: PropTypes.arrayOf(PropTypes.string),
	};

	render() {
		const { categories } = this.props;
		return (
			<div className={styles.container}>
				{categories.map(category => (
					<div key={category} className={styles.category}>
						{category}
					</div>
				))}
			</div>
		);
	}
}

export default CategoriesList;
