import * as passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/User";

passport.use(
  new Strategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]"
    },
    function(email, password, done) {
      User.findOne({ email: email })
        .then(user => {
          if (!user || !user.validPassword(password))
            return done(null, false, { message: "email or password is invalid" });
          return done(null, user);
        })
        .catch(done);
    }
  )
);

export default passport;
