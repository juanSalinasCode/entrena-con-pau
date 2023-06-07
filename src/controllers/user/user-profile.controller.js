import UserModel from '#Schemas/user.schema.js';
import UserBusiness from '#Business/user/userBusiness.js';

const userBusiness = new UserBusiness();

const userProfileController = async (req, res) => {
	const { id } = req;

	const existingUserById = await UserModel.findById(id).exec();
	if (!existingUserById)
		return res.status(401).send({ errors: ['Usuario no autorizado'] });

	const { _id, name, email } = existingUserById;

	const subscriptionData = existingUserById.subscriptionId
		? await userBusiness.getUserSubscriptionData(existingUserById.subscriptionId)
		: null;
	return res.send({ _id, name, email, subscriptionData });
};

export default userProfileController;
