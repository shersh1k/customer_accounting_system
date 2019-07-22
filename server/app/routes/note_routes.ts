import * as express from "express";
import * as MongoClient from "mongodb";

export default function (app: express.Express, db: MongoClient.Db) {
    
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new MongoClient.ObjectID(id) };
        db.collection('notes').findOne(details, (error, item) => {
            if (error) {
                console.log(error);
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.post('/notes', (req: express.Request, res: express.Response) => {
        const note = {
            text: req.body.body,
            title: req.body.title
        };
        db.collection('notes').insertOne(note, (error, result) => {
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
        const details = {'_id': new MongoClient.ObjectID(id) };
        db.collection('notes').remove(details, (error, item) => {
            if (error) {
                console.log(error);
                res.send({'error': 'An error has occurred' });
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
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });
}