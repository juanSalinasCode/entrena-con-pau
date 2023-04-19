import { idDTOSchema, dateDTOSchema, videoIdDTOSchema } from '#Dto/dto-types.js';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { parse } from 'date-fns';

const CreateDTOSchema = Type.Object(
	{
		_id: idDTOSchema,
		videoId: videoIdDTOSchema,
		date: dateDTOSchema,
	},
	{
		additionalProperties: false,
		errorMessage: {
			additionalProperties: 'El formato del objeto no es válido',
		},
	},
);

const ajv = new Ajv({ allErrors: true }).addKeyword('kind').addKeyword('modifier');

ajv.addFormat('date', '^\\d{1,2}/[1-9]|1[0-2]/\\d{4}$');
addFormats(ajv, ['uuid']);
addErrors(ajv);

const validateSchema = ajv.compile(CreateDTOSchema);

const dailyVideoDateCreateDTO = (req, res, next) => {
	const isDTOValid = validateSchema(req.body);

	if (!isDTOValid) {
		return res.status(400).send({
			errors: validateSchema.errors.map(error => error.message),
		});
	}

	const { date } = req.body;
	const parsedDate = parse(date, 'dd/MM/yyyy', new Date());

	if (isNaN(parsedDate.getTime())) {
		return res.status(400).send({
			errors: ['La fecha proporcionada no es válida'],
		});
	}

	next();
};

export default dailyVideoDateCreateDTO;
