import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

console.log(process.env.AWS_KEY, process.env.AWS_PRIVATE_KEY)
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
    region:""
  });

// dest경로 조심 /upload아님
// const multerVideo = multer({
//     dest: "uploads/videos/"
// })
const multerVideo = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "hongtube/video"
    })
})

// const multerAvatar = multer({
//     dest: "uploads/avatars/"
// })
const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "hongtube/avatar"
    })
})
const multerBoardImage = multer({
    dest: "uploads/boardImage/"
})

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
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
export const uploadAvatar = multerAvatar.single('avatar');
export const uploadBoardImage = multerBoardImage.single('boardImage');