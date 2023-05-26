// import crypto from 'crypto';

const userMpRegisterController = async (req, res) => {
	console.log(req.body);
	// const { type } = req.body;
	// // Verificar la firma del token
	// const accessToken =
	// 	'APP_USR-63212336526969-031321-33c1bfd1eb9c67cd33c70fd6ddb36d3a-206468902'; // 'TU_ACCESS_TOKEN'; // Reemplaza con tu propia clave secreta de Webhook
	// const receivedSignature = req.headers['x-payments-signature'];
	// const expectedSignature = crypto
	// 	.createHmac('sha256', accessToken)
	// 	.update(JSON.stringify(req.body))
	// 	.digest('hex');

	// if (receivedSignature !== expectedSignature) {
	// 	return res.status(401).send('Firma del token no válida');
	// }

	// if (type !== 'subscription') return res.status(409).send({ errors: [''] });

	return res.status(200).send('Usuario registrado con éxito');
};

export default userMpRegisterController;
