// mysql2, sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('orm_pjj2334', 'root', 'Tien2003@',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
    }
);

module.exports = sequelize;