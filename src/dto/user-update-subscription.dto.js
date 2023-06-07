import { subscriptionIdDTOSchema } from '#Dto/dto-types.js';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

const UpdateSubscriptionDTOSchema = Type.Object(
	{
		subscriptionId: subscriptionIdDTOSchema,
	},
	{
		additionalProperties: false,
		errorMessage: {
			additionalProperties: 'El formato del objeto no es válido',
		},
	},
);

const ajv = new Ajv({ allErrors: true }).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(UpdateSubscriptionDTOSchema);

const userUpdateSubscriptionDTO = (req, res, next) => {
	const isDTOValid = validateSchema(req.body);

	if (!isDTOValid)
		return res.status(400).send({
			errors: validateSchema.errors.map(error => error.message),
		});

	next();
};

export default userUpdateSubscriptionDTO;
