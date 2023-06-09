import React, { Component } from 'react';
import { Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './FiltersModal.module.css';

class FiltersModal extends Component {
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
		handleShowFiltersModal: PropTypes.func.isRequired,
		handleCloseFiltersModal: PropTypes.func.isRequired,
		showFiltersModal: PropTypes.bool.isRequired,
		filters: PropTypes.arrayOf(PropTypes.string).isRequired,
		updateFilters: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {};
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
						<Form.Group>
							<Form.Label>
								<h6>Nivel</h6>
							</Form.Label>
							<div className={styles.filtersDiv}>
								{this.renderCheckboxes(categories.nivel, 'nivel')}
							</div>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default FiltersModal;
