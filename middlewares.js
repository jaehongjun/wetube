import multer from "multer";
import routes from "./routes";

// dest경로 조심 /upload아님
const multerVideo = multer({
    dest: "uploads/videos/"
})

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