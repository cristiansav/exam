import Sequelize from 'sequelize';

const db = new Sequelize({
    dialect: 'mysql',
    database: 'exam',
    username: 'root',
    password: '12345',
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

export default db;