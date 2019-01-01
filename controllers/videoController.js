import routes from "../routes"
export const home = (req, res) => res.render("Home", { pageTitle: "Home", videos});

export const search = (req, res) => {
    // es6 이전 코딩방식
    // const searchingBy = req.query.term;

    const { query: { term: searchingBy } } = req;
    res.render("Search", { pageTitle: "Search", searchingBy, videos})
}
export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload"})
export const postUpload = (req, res) => {
    const {
        body: 
            { 
                file, title, description
            } 
        } = req;
        // To do Upload and save video
        res.redirect(routes.videoDetail(1))
}
export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "VideoDetail"})
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "EditVideo"})
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "DeleteVideo"})