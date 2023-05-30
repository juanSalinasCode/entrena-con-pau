import Imap from 'node-imap';

const sendEmail = (
	imapConfig,
	toEmail,
	subject = 'Hola mundo',
	content = 'Contenido del correo',
) => {
	const imap = new Imap(imapConfig);

	imap.once('ready', () => {
		const message =
			`To: ${toEmail}\r\n` + `Subject: ${subject}\r\n` + `\r\n` + `${content}`;

		imap.append(message, { mailbox: 'Sent' }, err => {
			if (err) {
				console.error('Error al enviar el correo:', err);
				return;
			}

			console.log('¡Correo enviado con éxito!');
			imap.end();
		});
	});

	imap.once('error', err => {
		console.error('Error en la conexión IMAP:', err);
	});

	imap.connect();
};

export default sendEmail;
