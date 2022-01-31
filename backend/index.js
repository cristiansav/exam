import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import db from './dbConfig.js';
import Meeting from "./components/Meeting.js";
import Participant from "./components/Participant.js";
import path from 'path';
import { SocketAddress } from 'net';
import Sequelize from 'sequelize';




/////////// Connection

const sequelize = new Sequelize('exam', 'root', '12345', { dialect: 'mysql' });
let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
app.use(express.static("build"));

let conn;

mysql.createConnection({
    user: "root",
    password:"12345"
})
.then((connection) => {
    conn = connection
    return connection.query('CREATE DATABASE IF NOT EXISTS exam');
})
.then(() => {
    return conn.end();
})
.catch((err) => {
    console.warn(err.stack); 
})


//Create database
app.get('/create', async (req, res, next) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

// Meeting
app.get('/meeting', async (req, res, next) => {
    const query = {
        where: {}
    }

    try {
        const meetings = await Meeting.findAll(query)
        res.status(200).json(meetings)
    } catch (err) {
        next(err)
    }
})

app.post('/meeting', async (req, res, next) => {
    const meeting = {
        id: req.body.id,
        description: req.body.description,
        url: req.body.url,
        mDatetime: req.body.mDatetime
    }
    try {
        await Meeting.create(meeting)
        res.status(201).json({ message: 'Created!' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Meeting creation has failed!" })
    }
})

app.get('/meeting/:id', async (req, res, next) => {
    try {
        const meeting = await Meeting.findByPk(req.params.id)
        if (meeting) {
            res.status(200).json(meeting)
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

app.put('/meeting/:id', async (req, res, next) => {
    try {
        const meeting = await Meeting.findByPk(req.params.id)
        console.log(meeting)
        if (meeting) {

            const newMeeting = {
                id: req.body.id,
                description:req.body.description,
                url: req.body.url,
                mDateTime: req.body.mDateTime,
            }

            if (!req.body.id) {
                newMeeting.id = meeting.dataValues.id
            }

            if (!req.body.description) {
                newMeeting.description = meeting.dataValues.description
            }

            if (!req.body.url) {
                newMeeting.url = meeting.dataValues.url
            }

            if (!req.body.mDateTime) {
                newMeeting.mDateTime = meeting.dataValues.mDateTime
            }
            await Meeting.update(newMeeting, { where: { id: req.params.id } })
            res.status(202).json({ message: 'accepted' })
        } 
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)

    }
})

app.delete('/meeting/:id', async (req, res, next) => {
    try {
        const meeting = await Meeting.findByPk(req.params.id)
        if (meeting) {
            await meeting.destroy()
            res.status(202).json({ message: 'deleted' })
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)

    }
})

// Participant
app.get('/participant', async (req, res, next) => {
    const query = {
        where: {}
    }

    try {
        const participants = await Participant.findAll(query)
        res.status(200).json(meetings)
    } catch (err) {
        next(err)
    }
})

app.post('/participant', async (req, res, next) => {
    const participant = {
        id: req.body.id,
        name: req.body.name
    }
    try {
        await Participant.create(participant)
        res.status(201).json({ message: 'Created!' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Participant creation has failed!" })
    }
})

app.get('/participant/:id', async (req, res, next) => {
    try {
        const participant = await Participant.findByPk(req.params.id)
        if (participant) {
            res.status(200).json(participant)
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

app.put('/participant/:id', async (req, res, next) => {
    try {
        const participant = await Participant.findByPk(req.params.id)
        console.log(participant)
        if (participant) {

            const newParticipant = {
                id: req.body.id,
                name:req.body.name,
            }

            if (!req.body.id) {
                newParticipant.id = Participant.dataValues.id
            }

            if (!req.body.name) {
                newParticipant.name = Participant.dataValues.name
            }

            await Participant.update(newParticipant, { where: { id: req.params.id } })
            res.status(202).json({ message: 'accepted' })
        } 
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)

    }
})

app.delete('/participant/:id', async (req, res, next) => {
    try {
        const participant = await Participant.findByPk(req.params.id)
        if (participant) {
            await participant.destroy()
            res.status(202).json({ message: 'deleted' })
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)

    }
})

router.route('/').get(async (req, res) => {
    let projectPath = path.resolve();
    let htmlPath = path.join(projectPath, "build", "index.html");
    res.sendFile(htmlPath);
})

let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API is running at ${port}`);