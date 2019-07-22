import * as express from "express";
import * as MongoClient from "mongodb";
import noteRoutes from "./note_routes";

export default function(app: express.Express, db: MongoClient.Db){
    noteRoutes(app, db);
};