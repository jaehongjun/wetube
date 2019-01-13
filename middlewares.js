import multer from "multer";
import routes from "./routes";

// dest경로 조심 /upload아님
const multerVideo = multer({
    dest: "uploads/videos/"
})

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = req.user || null;
    next();
}

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
}

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect(routes.home);
    }
}

// .single 하나의 파일 single('') <- 해당 네임
export const uploadVideo = multerVideo.single('videoFile');