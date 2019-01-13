// passport
import passport from "passport";
import dotenv from "dotenv";
import GitHubStrategy from "passport-github";
import User from "./models/User";
import {
    githubLoginCallback
} from "./controllers/userController";
import routes from "./routes";

dotenv.config();
console.log(process.env.GH_ID);
// strategy 로그인 방식 사용
passport.use(User.createStrategy());
passport.use(new GitHubStrategy({
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())