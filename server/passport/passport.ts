import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as mongoose from "mongoose";

const LocalStrategy = passportLocal.Strategy;
const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]"
    },
    function(email, password, done) {
      User.findOne({ email: email })
        .then((user: any) => {
          if (!user || !user.validPassword(password)) {
            return done(null, false /* , { errors: { "email or password": "is invalid" } } */);
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);

export default passport;
