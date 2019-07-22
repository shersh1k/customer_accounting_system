import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as MongoClient from "mongodb";
import * as bodyParser from "body-parser";
import db from "./_config/db"
import noteRoutes from "./app/routes";

const app: express.Express = express();
const port: number = 8000;

app.use(favicon(__dirname + '/client/images/favicon/favicon-16x16.png'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client")));


MongoClient.connect(db.url, { useNewUrlParser: true }, (error, database) => {
    if (error) return console.log(error);
    noteRoutes(app, database.db());
    app.listen(port, () => {
        console.log('We are live on ' + port + ' with auto restart');
    });
})