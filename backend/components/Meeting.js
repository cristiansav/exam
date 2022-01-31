import Sequelize from 'sequelize';
import db from '../dbConfig.js';
import Participant from './Participant.js';

const Meeting = db.define("Meeting", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: 3,
                msg: "Description must have more than 3 characters."
            }
        }
    },

    url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
            msg: "URL is not valid."
        }
    },

    mDatetime: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

Meeting.hasMany(Participant);

export default Meeting;