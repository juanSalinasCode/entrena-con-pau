import expressApp from '#Config/express.js';
import fs from 'fs';
import { createServer } from 'https';

const options = {
	key: fs.readFileSync('/etc/letsencrypt/live/entrenaconpau.com/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/entrenaconpau.com/fullchain.pem'),
};

const httpServer = createServer(options, expressApp);

export default httpServer;
