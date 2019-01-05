import routes from "../routes"
import Video from "../models/Video"
export const home = async(req, res) => {
    try{
        const videos = await Video.find({});
        res.render("Home", { pageTitle: "Home", videos});
    }catch (error) {
        console.log(error);
        res.render("Home", { pageTitle: "Home", videos: [] });
    }    
}
export const search = (req, res) => {
    // es6 이전 코딩방식
    // const searchingBy = req.query.term;

    const { query: { term: searchingBy } } = req;
    res.render("Search", { pageTitle: "Search", searchingBy, videos})
}
export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload"})
export const postUpload = async (req, res) => {
    const { body : { title, description }, 
            file : {path } 
          }= req;
          const newVideo = await Video.create({
            fileUrl : path,
            title: title,
            description: description
          })

        console.log(newVideo)
        // To do Upload and save video
        res.redirect(routes.videoDetail(newVideo.id))
}
export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "VideoDetail"})
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "EditVideo"})
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "DeleteVideo"})