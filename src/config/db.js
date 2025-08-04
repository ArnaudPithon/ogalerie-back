import 'dotenv/config';

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

export default { PGUSER, PGPASSWORD, PGHOST, PGDATABASE };
