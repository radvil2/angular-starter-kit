require('dotenv').config();

module.exports = {
  DB: process.env.APP_DB_DEV,
  SECRET: process.env.APP_SECRET,
  PORT: process.env.APP_PORT
}