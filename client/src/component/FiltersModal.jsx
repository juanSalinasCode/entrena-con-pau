import React, { Component } from 'react';
import { Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './FiltersModal.module.css';
import browserStorage from 'browser-storage';

class FiltersModal extends Component {
	static propTypes = {
		categories: PropTypes.shape({
			muscleGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
			activities: PropTypes.arrayOf(PropTypes.string).isRequired,
			materials: PropTypes.arrayOf(PropTypes.string).isRequired,
		}).isRequired,
		videoList: PropTypes.arrayOf(
			PropTypes.shape({
				guid: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
				hide: PropTypes.bool.isRequired,
				categories: PropTypes.arrayOf(PropTypes.string),
			}),
		).isRequired,
		updateVideoList: PropTypes.func.isRequired,
		handleShowFiltersModal: PropTypes.func.isRequired,
		handleCloseFiltersModal: PropTypes.func.isRequired,
		showFiltersModal: PropTypes.bool.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			filters: ['Todas las Clases'],
		};
	}

	componentDidMount() {
		browserStorage.setItem('filters', JSON.stringify(this.state.filters));
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.filters !== this.state.filters) {
			this.filterVideoList(this.state.filters);
			browserStorage.setItem('filters', JSON.stringify(this.state.filters));
		}
	}

	filterVideoList(filters) {
		const newVideoList = this.props.videoList.map(video => {
			let hide = true;
			if (filters.includes('Todas las Clases')) {
				hide = false;
			} else {
				for (let i = 0; i < video.categories.length; i++) {
					if (filters.includes(video.categories[i])) {
						hide = false;
						break;
					}
				}
			}
			return { ...video, hide };
		});
		this.props.updateVideoList(newVideoList);
	}

	handleCheckboxChange(event) {
		const filterValue = event.target.value;
		const isChecked = event.target.checked;
		const filters = [...this.state.filters];

		if (isChecked) {
			filters.push(filterValue);
		} else {
			const index = filters.indexOf(filterValue);
			if (index !== -1) {
				filters.splice(index, 1);
			}
		}
		this.setState({ filters });
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
		return this.state.filters.includes(filter);
	}

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
			<Modal
				className={styles.modal}
				show={this.props.showFiltersModal}
				onHide={this.props.handleCloseFiltersModal}
			>
				<Modal.Header closeButton>
					<Modal.Title>Filtros de Búsqueda</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Check
						key='Todas las Clases'
						id='Todas_las_Clases'
						type='checkbox'
						label='Todas las Clases'
						name='Todas las Clases'
						value='Todas las Clases'
						checked={this.filterIsChecked('Todas las Clases')}
						onChange={event => this.handleCheckboxChange(event)}
					/>
					<Form hidden={this.filterIsChecked('Todas las Clases')}>
						<Form.Group>
							<Form.Label>
								<h6>Grupos Musculares</h6>
							</Form.Label>
							<div className={styles.filtersDiv}>
								{this.renderCheckboxes(
									categories.muscleGroups,
									'muscleGroups',
								)}
							</div>
						</Form.Group>
						<Form.Group>
							<Form.Label>
								<h6>Actividades</h6>
							</Form.Label>
							<div className={styles.filtersDiv}>
								{this.renderCheckboxes(
									categories.activities,
									'activities',
								)}
							</div>
						</Form.Group>
						<Form.Group>
							<Form.Label>
								<h6>Materiales</h6>
							</Form.Label>
							<div className={styles.filtersDiv}>
								{this.renderCheckboxes(categories.materials, 'materials')}
							</div>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default FiltersModal;
