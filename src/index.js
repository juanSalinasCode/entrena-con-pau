import connectDB from '#Config/db.js';
import '#Config/env.js';
import httpServer from '#Config/http.js';
// import sendEmail from '#Config/sendEmail.js';

// Función para inicializar el servidor
const bootstrap = async () => {
	// Conectar a la base de datos utilizando la URL especificada en las variables de entorno
	await connectDB(process.env.MONGODB_URL);

	// Iniciar el servidor HTTP en el puerto especificado en las variables de entorno
	httpServer.listen(process.env.PORT, () => {
		// Imprimir un mensaje en la consola indicando que el servidor está escuchando en el puerto especificado
		console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
	});

	// Configuración de la cuenta de correo
	// const imapConfig = {
	// 	user: 'juansalinas008@gmail.com',
	// 	password: 'pemocpvzlcaleddf',
	// 	host: 'imap.gmail.com',
	// 	port: 993,
	// 	tls: true,
	// };

	// const toEmail = 'entrenaconpau@gmail.com';

	// sendEmail(
	// 	imapConfig,
	// 	toEmail,
	// 	'Hola desde mi app',
	// 	'¡Hola mundo! Este es mi correo personalizado.',
	// );
};

// Ejecutar la función bootstrap para iniciar el servidor
bootstrap();
