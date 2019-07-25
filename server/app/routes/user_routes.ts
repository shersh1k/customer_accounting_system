import * as express from "express";
import * as MongoClient from "mongodb";
import { IUser } from "../../interfaces/IUser";

export default function (app: express.Express, db: MongoClient.Db) {

    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new MongoClient.ObjectID(id) };
        db.collection('users').findOne(details, (error, item) => {
            if (error) {
                console.log(error);
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });

    app.post('/users', (req: express.Request, res: express.Response) => {
        const user: IUser = {
            registrationDate: new Date(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: new Date(req.body.birthDate),
            sex: req.body.sex,
            city: req.body.city,
        };
        db.collection('users').insertOne(user, (error, result) => {
            if (error) {
                console.log(error);
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new MongoClient.ObjectID(id) };
        db.collection('notes').remove(details, (error, item) => {
            if (error) {
                console.log(error);
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Note ' + id + ' deleted'); //TODO: если нету такой заметки?
            }
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new MongoClient.ObjectID(id) };
        const note = {
            $set:
            {
                text: req.body.body,
                title: req.body.title
            }
        };
        db.collection('notes').updateOne(details, note, (error, result) => {
            if (error) {
                console.log(error);
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
            }
        });
    });
}