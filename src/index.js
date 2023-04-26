import connectDB from '#Config/db.js';
import '#Config/env.js';
import httpServer from '#Config/express.js';

// Función para inicializar el servidor
const bootstrap = async () => {
	// Conectar a la base de datos utilizando la URL especificada en las variables de entorno
	await connectDB(process.env.MONGODB_URL);

	// Iniciar el servidor HTTP en el puerto especificado en las variables de entorno
	httpServer.listen(process.env.PORT, () => {
		// Imprimir un mensaje en la consola indicando que el servidor está escuchando en el puerto especificado
		console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
	});
};

// Ejecutar la función bootstrap para iniciar el servidor
bootstrap();
