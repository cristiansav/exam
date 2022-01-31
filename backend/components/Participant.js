import Sequelize from 'sequelize';
import db from '../dbConfig.js';
import Meeting from './Meeting.js';

const Participant = db.define("Participant", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: 5,
                msg: "Name must have more than 5 characters."
            }
        }
    }
})

// Participant.belongsTo(Meeting);

export default Participant;