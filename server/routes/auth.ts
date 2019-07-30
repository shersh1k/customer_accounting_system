import * as jwt from "express-jwt";
import * as express from "express";
const secret = "secret";

function getTokenFromHeader(req: express.Request) {
  if (
    (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
}

export const auth: any = {
  required: jwt({
    secret: secret,
    userProperty: "payload",
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret,
    userProperty: "payload",
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};
