import UserBusiness from '#Business/user/userBusiness.js';
import nodemailer from 'nodemailer';

const userBusiness = new UserBusiness();

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_APP_PASSWORD,
	},
});

const userMpRegisterController = async (req, res) => {
	try {
		const { resource } = req.body;
		const id = extractIdFromResource(resource);
		const user = await userBusiness.createNewUserFromPaymentId(id);
		console.log('nuevo usuario creado');
		const mailOptions = {
			from: process.env.GMAIL_USER,
			to: user.email,
			subject: '#EntrenaConPau alta de usuari@',
			html: `<p>Bienvenid@! Espero que disfrutes la plataforma, podés acceder desde aquí <a href="https://www.entrenaconpau.com/login">https://www.entrenaconpau.com/login</a> con tu usuario: ${user.email} y contraseña: <strong>${user.password}</strong></p>`,
		};

		// Enviar el correo electrónico
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
				// res.send('Error al enviar el correo electrónico');
			} else {
				console.log('Correo electrónico enviado: ' + info.response);
				// res.send('Correo electrónico enviado correctamente');
			}
		});
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
