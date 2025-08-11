import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT_HTTP = Number(process.env.PORT_HTTP ?? 8080);
const PORT_HTTPS = Number(process.env.PORT_HTTPS ?? 8443);
const SESSION_SECRET = process.env.SESSION_SECRET!;

export const credentials = { PORT_HTTP, PORT_HTTPS, SESSION_SECRET };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sslDir = path.resolve(__dirname, '../../ssl');
const keyPath = path.join(sslDir, 'privkey.pem');
const certPath = path.join(sslDir, 'fullchain.pem');

export const sslPath = { keyPath, certPath };
