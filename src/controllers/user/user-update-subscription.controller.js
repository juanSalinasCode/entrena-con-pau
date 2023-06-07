import UserModel from '#Schemas/user.schema.js';

const userUpdateEmailController = async (req, res) => {
	const { id } = req;
	const { subscriptionId } = req.body;

	const existingUserById = await UserModel.findById(id).exec();
	if (!existingUserById)
		return res.status(401).send({ errors: ['Usuario no autorizado'] });

	if (existingUserById.subscriptionId)
		// con esto así solo se permite cargar un idSubscription si antes no había, pero no modificar uno existente
		return res
			.status(401)
			.send({ errors: ['Error al intentar asosiar la suscripcion al usuario'] });

	existingUserById.subscriptionId = subscriptionId;

	await existingUserById.save();

	return res.send('Subscripcion del usuario actualizada');
};

export default userUpdateEmailController;
