import { Type } from '@sinclair/typebox';

export const idDTOSchema = Type.String({
	format: 'uuid',
	errorMessage: {
		type: 'El tipo de _id no es válido, debe ser un string',
		format: 'El formato de _id no es válido, debe ser un uuid4',
	},
});

export const subscriptionIdDTOSchema = Type.String({
	errorMessage: {
		type: 'El tipo de subscriptionId no es válido, debe ser un string',
	},
});

export const videoIdDTOSchema = Type.String({
	errorMessage: {
		type: 'El tipo de _id no es válido, debe ser un string',
	},
});

export const dateDTOSchema = Type.String({
	format: 'date',
	errorMessage: {
		format: 'El formato de la fecha no es válido, debe ser en formato d/M/yyyy',
	},
});

export const nameDTOSchema = Type.String({
	minLength: 2,
	maxLength: 50,
	errorMessage: {
		minLength: 'name debe tener al menos 2 caracteres de longitud',
		maxLength: 'name debe tener como máximo 20 caracteres de longitud',
	},
});

export const emailDTOSchema = Type.String({
	format: 'email',
	errorMessage: {
		type: 'El tipo del email no es válido, debe ser un string',
		format: 'El formato del email no es válido, debe cumplir el RFC 5322',
	},
});

export const passwordDTOSchema = Type.String({
	format: 'password',
	minLength: 8,
	maxLength: 25,
	errorMessage: {
		type: 'El tipo de la password no es válido, debe ser un string',
		format: 'El formato de la password, debe contener una mayúscula, una minúcula y un número',
		minLength: 'password debe tener al menos 8 caracteres de longitud',
		maxLength: 'password debe tener como máximo 25 caracteres de longitud',
	},
});
