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

export const auth = {
  required: jwt({
    secret: secret,
    userProperty: "user",
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret,
    userProperty: "user",
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};
