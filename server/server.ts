import * as methods from "method-override";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as cors from "cors";
import * as mongoose from "mongoose";
import config from "./_config/db";
import User from "./models/User";
import Article from "./models/Article";
import Comment from "./models/Comment";
import passport from "./passport/passport";
import routes from "./routes";
User;
Article;
Comment;
passport;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(methods());
app.use(express.static(__dirname + "/public"));

app.use(session({ secret: "conduit", cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

mongoose.connect(config.url, { useNewUrlParser: true });
console.log(routes);
app.use(routes);

/// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  var err = new Error("Not Found");
  //   err.status = 404;
  next(err);
}); */

// production error handler
/* app.use(function(err: any, req: any, res: any, next: any) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
}); */

// finally, let's start our server...
const server = app.listen(/* process.env.PORT ||  */ 3000, function(a: any, ane: any) {
  console.log("Listening on port ");
  console.log(server.address());
});
