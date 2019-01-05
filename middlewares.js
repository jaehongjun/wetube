import routes from "./routes";
import multer from "multer";

const multerVideo = multer({dest: "videos/"})

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id: 1
    }
    next();
}
// .single 하나의 파일 single('') <- 해당 네임
export const uploadVideo = multerVideo.single('videoFile');