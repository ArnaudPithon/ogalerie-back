import 'dotenv/config';

const PORT_HTTP = Number(process.env.PORT_HTTP ?? 8080);
const PORT_HTTPS = Number(process.env.PORT_HTTPS ?? 8443);
const SESSION_SECRET = process.env.SESSION_SECRET!;

export default { PORT_HTTP, PORT_HTTPS, SESSION_SECRET };
