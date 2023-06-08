import { React, Component } from 'react';
import { Spinner } from 'react-bootstrap';
import VideoList from '../component/VideoList.jsx';
import FiltersModal from '../component/FiltersModal.jsx';
import CategoriesMenu from '../component/CategoriesMenu.jsx';
import styles from './Home.module.css';
import PropTypes from 'prop-types';
import browserStorage from 'browser-storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Home extends Component {
	static propTypes = {
		aspectRatio: PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			videoList: [],
			classTitle: null,
			filters: [],
			showFiltersModal: false,
			showCategoriesMenu: true,
			categories: {
				muscleGroups: [
					'full body',
					'piernas',
					'gluteos',
					'abs',
					'tren sup.',
					'brazos',
					'musc. prof. ab',
					'core',
				],
				activities: [
					'stretching',
					'pilates',
					'hiit',
					'cardio',
					'local',
					'diastasis',
				],
				materials: ['silla', 'pelota', 'mat', 'mancuernas', 'bandas'],
				nivel: ['inicial', 'intermedio-avanzado'],
			},
		};
		this.updateVideoList = this.updateVideoList.bind(this);
		this.updateFilters = this.updateFilters.bind(this);
		this.handleShowFiltersModal = this.handleShowFiltersModal.bind(this);
		this.handleCloseFiltersModal = this.handleCloseFiltersModal.bind(this);
	}

	componentDidMount() {
		const token = browserStorage.getItem('jwtToken');
		if (!token) {
			// window.location.href = '/login';
		}
		fetch('/user/profile', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(res => {
				if (res.status !== 200) {
					// window.location.href = '/login';
				}
				// Continue normalmente
			})
			.catch(error => {
				console.error(error);
				// window.location.href = '/login';
			});
		fetch('/videos/getVideos')
			.then(res => res.json())
			.then(data => {
				this.setState({
					videoList: data.videoList,
					loading: false,
				});
			});
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		this.updateClass(this.props.aspectRatio);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.aspectRatio !== this.props.aspectRatio) {
			this.updateClass(this.props.aspectRatio);
		}
	}

	updateVideoList(newVideoList) {
		this.setState({ videoList: newVideoList });
	}

	updateFilters(newFilters) {
		this.setState({ filters: newFilters, showCategoriesMenu: false });
	}

	updateClass(aspectRatio) {
		if (aspectRatio >= 1.1) {
			this.setState({
				classTitle: styles.title_h,
				classSearchBox: styles.searchBox_h,
				classSearchText: styles.searchText_h,
			});
		} else {
			this.setState({
				classTitle: styles.title_v,
				classSearchBox: styles.searchBox_v,
				classSearchText: styles.searchText_v,
			});
		}
	}

	handleShowFiltersModal() {
		this.setState({
			showFiltersModal: true,
		});
	}

	handleCloseFiltersModal() {
		this.setState({
			showFiltersModal: false,
		});
	}

	render() {
		const hasAllClassesFilter = this.state.filters.includes('Todas las Clases');
		return (
			<>
				<FiltersModal
					videoList={this.state.videoList}
					updateVideoList={this.updateVideoList}
					categories={this.state.categories}
					handleShowFiltersModal={this.handleShowFiltersModal}
					handleCloseFiltersModal={this.handleCloseFiltersModal}
					showFiltersModal={this.state.showFiltersModal}
					filters={this.state.filters}
					updateFilters={this.updateFilters}
				></FiltersModal>

				<div className='block pb-2 border-bottom'>
					<div className={styles.clasesTopDiv}>
						{this.state.showCategoriesMenu ? (
							<>
								<p className={this.state.classTitle}>
									Clases por Categorias
								</p>
							</>
						) : (
							<>
								{hasAllClassesFilter ? (
									<p className={this.state.classTitle}>
										Todas las Clases
									</p>
								) : (
									<p className={this.state.classTitle}>
										{this.state.filters.join(' - ')}
									</p>
								)}
							</>
						)}

						<div className={styles.searchDiv}>
							<div
								className={this.state.classSearchBox}
								onClick={() => this.handleShowFiltersModal()}
							>
								<FontAwesomeIcon icon={faSearch} />
								<p className={this.state.classSearchText}>{'  Buscar'}</p>
							</div>
						</div>
					</div>
				</div>
				<div
					className={
						this.state.loading ? styles.provisionalBackround : undefined
					}
				>
					<div>
						{this.state.showCategoriesMenu ? (
							<div>
								<CategoriesMenu
									videoList={this.state.videoList}
									updateVideoList={this.updateVideoList}
									categories={this.state.categories}
									filters={this.state.filters}
									updateFilters={this.updateFilters}
								></CategoriesMenu>
							</div>
						) : (
							<div>
								{this.state.loading ? (
									<Spinner
										className={styles.spinerLoading}
										type='Circles'
										animation='grow'
									/>
								) : (
									<VideoList videoList={this.state.videoList} />
								)}
							</div>
						)}
					</div>
					<div className={styles.divRelleno}></div>
				</div>
			</>
		);
	}
}

export default Home;
