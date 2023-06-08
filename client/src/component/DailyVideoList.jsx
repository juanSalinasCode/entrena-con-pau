import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './DailyVideoList.module.css';

class DailyVideoList extends Component {
	static propTypes = {
		aspectRatio: PropTypes.number.isRequired,
		allDailyVideoList: PropTypes.arrayOf(
			PropTypes.shape({
				_id: PropTypes.string.isRequired,
				videoId: PropTypes.string.isRequired,
				date: PropTypes.string.isRequired,
			}),
		).isRequired,
		setDailyVideo: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			dateSelected: null,
		};
	}

	componentDidMount() {
		this.updateClass(this.props.aspectRatio);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.aspectRatio !== this.props.aspectRatio) {
			this.updateClass(this.props.aspectRatio);
		}
	}

	updateClass(aspectRatio) {
		if (aspectRatio >= 1.1) {
			this.setState({
				classDailyVideoDiv: styles.dailyVideoDiv_h,
			});
		} else {
			this.setState({
				classDailyVideoDiv: styles.dailyVideoDiv_v,
			});
		}
	}

	formatDate(dateString) {
		const [day, month, year] = dateString.split('/');
		return new Date(`${year}-${month}-${day}`);
	}

	selectDailyVideoDate(item) {
		this.setState({
			dateSelected: item.date,
		});
		this.props.setDailyVideo(item);
	}

	render() {
		const { allDailyVideoList } = this.props;
		const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
		const today = new Date();

		const filteredItems = allDailyVideoList.filter(item => {
			// Filtrar los elementos que estén dentro del rango de 3 días anteriores al actual y 3 días después.
			const itemDate = this.formatDate(item.date);
			const diff =
				(this.formatDate(today.toLocaleDateString()).getTime() -
					itemDate.getTime()) /
				(1000 * 3600 * 24);
			return diff >= -3 && diff <= 3;
		});

		filteredItems.sort((a, b) => {
			const aDate = this.formatDate(a.date);
			const bDate = this.formatDate(b.date);
			return aDate - bDate;
		});

		return (
			<div className={styles.dailyVideoListContainer}>
				{filteredItems.map(item => {
					const itemDate = this.formatDate(item.date);
					const selected = this.state.dateSelected === item.date;
					if (
						item.date === today.toLocaleDateString() &&
						this.state.dateSelected === null
					) {
						this.props.setDailyVideo(item);
						this.setState({
							dateSelected: item.date,
						});
					}
					return (
						<div
							key={item._id}
							className={
								this.state.classDailyVideoDiv +
								' ' +
								(selected ? styles.selected : '')
							}
							onClick={() => this.selectDailyVideoDate(item)}
						>
							<div className={styles.divItsToday}>
								<div
									className={styles.dot}
									hidden={
										today.toLocaleDateString() !==
										itemDate.toLocaleDateString()
									}
								/>
							</div>
							<div className={styles.divDayDate}>
								<p className={styles.day}>
									{diasSemana[itemDate.getDay()]}
								</p>
								<p className={styles.date}>
									{itemDate.getDate().toString().padStart(2, '0')}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default DailyVideoList;
