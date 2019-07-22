import * as MongoClient from "mongodb";

export interface IUser {
    _id?: MongoClient.ObjectID;
    registrationDate: Date;
    firstName: string;
    lastName: string;
    birthDate: Date;
    sex: Sex;
    city: string;
}