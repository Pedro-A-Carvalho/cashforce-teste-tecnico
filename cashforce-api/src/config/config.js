const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'cashforce123',
    database: process.env.DB_NAME || 'cashforce',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'cashforce123',
    database: process.env.DB_NAME || 'cashforce',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  },
};
