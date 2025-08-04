import 'dotenv/config';

const { PORT_HTTP = 8080, PORT_HTTPS = 8443, SESSION_SECRET } = process.env;

export default { PORT_HTTP, PORT_HTTPS, SESSION_SECRET };

