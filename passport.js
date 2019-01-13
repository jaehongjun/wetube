// passport

import passport from "passport";
import User from "./models/User";

// strategy 로그인 방식 사용
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())