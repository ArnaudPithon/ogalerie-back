import 'dotenv/config';

const PGUSER = process.env.PGUSER!;
const PGPASSWORD = process.env.PGPASSWORD!;
const PGHOST = process.env.PGHOST!;
const PGDATABASE = process.env.PGDATABASE!;

export default { PGUSER, PGPASSWORD, PGHOST, PGDATABASE };
