import * as MongoClient from "mongodb";
import { Sex } from "../enums/userEnums";

export interface IUser {
    _id?: MongoClient.ObjectID;
    registrationDate: Date;
    firstName: string;
    lastName: string;
    birthDate: Date;
    sex: Sex;
    city: string;
}