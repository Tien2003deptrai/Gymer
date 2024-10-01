// mysql2, sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gymer1', 'root', 'Tien2003@',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
    }
);

module.exports = sequelize;