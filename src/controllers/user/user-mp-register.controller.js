import UserBusiness from '#Business/user/userBusiness.js';

const userBusiness = new UserBusiness();

const userMpRegisterController = async (req, res) => {
	try {
		const { resource } = req.body;
		const id = extractIdFromResource(resource);
		await userBusiness.createNewUserFromPaymentId(id);
		console.log('nuevo usuario creado');
		return res.status(201).send('Usuario registrado con éxito');
	} catch (error) {
		console.error('Error al registrar usuario:', error);
		return res.status(200).send(error);
	}
};

function extractIdFromResource(resource) {
	const parts = resource.split('/');
	return parts[parts.length - 1];
}

export default userMpRegisterController;
