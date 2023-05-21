import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './CategoriesMenu.module.css';

class CategoriesMenu extends Component {
	static propTypes = {
		categories: PropTypes.shape({
			muscleGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
			activities: PropTypes.arrayOf(PropTypes.string).isRequired,
			materials: PropTypes.arrayOf(PropTypes.string).isRequired,
			nivel: PropTypes.arrayOf(PropTypes.string).isRequired,
		}).isRequired,
		videoList: PropTypes.arrayOf(
			PropTypes.shape({
				guid: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
				hide: PropTypes.bool.isRequired,
				categories: PropTypes.arrayOf(PropTypes.string).isRequired,
			}),
		).isRequired,
		updateVideoList: PropTypes.func.isRequired,
		filters: PropTypes.arrayOf(PropTypes.string).isRequired,
		updateFilters: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			categorySelected: 'activities',
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.filters !== this.props.filters) {
			this.filterVideoList(this.props.filters);
		}
	}

	filterVideoList(filters) {
		const newVideoList = this.props.videoList.map(video => {
			let hide = false;
			for (let i = 0; i < filters.length; i++) {
				if (filters[i] === 'Todas las Clases') {
					hide = false;
					break;
				} else if (!video.categories.includes(filters[i])) {
					hide = true;
				}
			}
			return { ...video, hide };
		});
		this.props.updateVideoList(newVideoList);
	}

	handleCheckboxChange(event) {
		const filterValue = event.target.value;
		const isChecked = event.target.checked;
		const filters = [...this.props.filters];

		if (isChecked) {
			filters.push(filterValue);
		} else {
			const index = filters.indexOf(filterValue);
			if (index !== -1) {
				filters.splice(index, 1);
			}
		}
		this.props.updateFilters(filters);
		// this.handleSelectAllClasses(event);// Bueno esta funcion la hare ien en otro momento
	}

	handleSelectAllClasses(event) {
		const checkboxes = document.querySelectorAll('input[type="checkbox"]');
		const allClassesCheckbox = checkboxes[0];

		if (event.target.checked === true) {
			if (event.target.value === 'Todas las Clases') {
				checkboxes.forEach((checkbox, index) => {
					if (index > 0 && checkbox.checked) {
						checkbox.dispatchEvent(
							new MouseEvent('click', {
								view: window,
								bubbles: true,
								cancelable: true,
							}),
						);
					}
				});
			} else if (allClassesCheckbox.checked) {
				allClassesCheckbox.dispatchEvent(
					new MouseEvent('click', {
						view: window,
						bubbles: true,
						cancelable: true,
					}),
				);
			}
		}
	}

	filterIsChecked(filter) {
		return this.props.filters.includes(filter);
	}

	// esto lo tendre que cambiar por el render de los divs con nombres de las categorias
	renderCheckboxes = (categoryList, categoryName) => {
		return categoryList.map(categoryItem => (
			<Form.Check
				className={styles.checkbox}
				key={categoryItem}
				id={`${categoryName.replace(/\s+/g, '_')}-${categoryItem.replace(
					/\s+/g,
					'_',
				)}`}
				type='checkbox'
				label={categoryItem}
				name={categoryName}
				value={categoryItem}
				checked={this.filterIsChecked(categoryItem)}
				onChange={event => this.handleCheckboxChange(event)}
			/>
		));
	};

	render() {
		const { categories } = this.props;
		return (
			<div className={styles.menu}>
				<div className={styles.categories}>
					<div
						className={
							styles.categoryDiv +
							' ' +
							(this.state.categorySelected === 'activities'
								? styles.categoryDivSelected
								: '')
						}
						onClick={() => {
							this.setState({
								categorySelected: 'activities',
							});
						}}
					>
						<p>Actividades</p>
					</div>
					<div
						className={
							styles.categoryDiv +
							' ' +
							(this.state.categorySelected === 'muscleGroups'
								? styles.categoryDivSelected
								: '')
						}
						onClick={() => {
							this.setState({
								categorySelected: 'muscleGroups',
							});
						}}
					>
						<p>Grupos Musculares</p>
					</div>
					<div
						className={
							styles.categoryDiv +
							' ' +
							(this.state.categorySelected === 'materials'
								? styles.categoryDivSelected
								: '')
						}
						onClick={() => {
							this.setState({
								categorySelected: 'materials',
							});
						}}
					>
						<p>Materiales</p>
					</div>
					<div
						className={
							styles.categoryDiv +
							' ' +
							(this.state.categorySelected === 'nivel'
								? styles.categoryDivSelected
								: '')
						}
						onClick={() => {
							this.setState({
								categorySelected: 'nivel',
							});
						}}
					>
						<p>nivel</p>
					</div>
				</div>
				<div>
					<Form>
						<Form.Group>
							<div
								hidden={this.state.categorySelected !== 'muscleGroups'}
								className={styles.filtersDiv}
							>
								{this.renderCheckboxes(
									categories.muscleGroups,
									'muscleGroups',
								)}
							</div>
						</Form.Group>
						<Form.Group>
							<div
								hidden={this.state.categorySelected !== 'activities'}
								className={styles.filtersDiv}
							>
								{this.renderCheckboxes(
									categories.activities,
									'activities',
								)}
							</div>
						</Form.Group>
						<Form.Group>
							<div
								hidden={this.state.categorySelected !== 'materials'}
								className={styles.filtersDiv}
							>
								{this.renderCheckboxes(categories.materials, 'materials')}
							</div>
						</Form.Group>
						<Form.Group>
							<div
								hidden={this.state.categorySelected !== 'nivel'}
								className={styles.filtersDiv}
							>
								{this.renderCheckboxes(categories.nivel, 'nivel')}
							</div>
						</Form.Group>
					</Form>
				</div>
			</div>
		);
	}
}

export default CategoriesMenu;
