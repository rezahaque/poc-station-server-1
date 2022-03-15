require('dotenv').config({ silent: true });
module.exports = {
    app: {
        name: 'POC Station',
        env: process.env.APP_ENV || 'development',
        secret: process.env.APP_SECRET || 'verysecretkey',
        port: process.env.APP_PORT || '4000',
        domain: process.env.APP_DOMAIN || 'http://127.0.0.1',
    },
    db: {
        mysql: {
          username: process.env.DB_USER || "root",
          password: process.env.DB_PASS || "",
          host: process.env.DB_HOST || "localhost",
          port: process.env.DB_PORT || "27017",
          dbname: process.env.DB_NAME || "poc_station",
          dialect: process.env.DIALECT || "mysql",
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        },
      },
};
