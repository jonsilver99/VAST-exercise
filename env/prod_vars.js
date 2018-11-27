// environment variables - Production Mode
const env = {
    // DB_HOST: process.env.CLEARDB_DATABASE_URL,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_SCHEMA: process.env.DB_SCHEMA
}
module.exports = env