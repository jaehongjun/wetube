import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({
            id: -1
        });
        res.render("Home", {
            pageTitle: "Home",
            videos
        });
    } catch (error) {
        res.render("Home", {
            pageTitle: "Home",
            videos: []
        });
    }
}
export const search = async (req, res) => {
    // es6 이전 코딩방식
    // const searchingBy = req.query.term;

    const {
        query: {
            term: searchingBy
        }
    } = req;
    let videos = [];
    try {
        videos = await Video.find({
            title: {
                $regex: searchingBy,
                $options: "i"
            }
        })
    } catch (error) {
        console.log(error)
    }
    res.render("Search", {
        pageTitle: "Search",
        searchingBy,
        videos
    })
}
export const getUpload = (req, res) => res.render("upload", {
    pageTitle: "Upload"
})
export const postUpload = async (req, res) => {
    const {
        body: {
            title,
            description
        },
        file: {
            path
        }
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title: title,
        description: description,
        creator: req.user.id
    })
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id))
}
export const videoDetail = async (req, res) => {
    const {
        params: {
            id
        }
    } = req
    try {
        // .populate('') 객체를 불러오는 함수 object만
        const video = await Video.findById(id).populate('creator');
        res.render("videoDetail", {
            pageTitle: video.title,
            video
        })
    } catch (error) {
        res.redirect(routes.home)
    }

}
export const getEditVideo = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const video = await Video.findById(id);
        if(video.creator != req.user.id){
            throw Error();
        } else {
            res.render("editVideo", {
                pageTitle: `Edit ${video.title}`,
                video
            });
        }
    } catch (error) {
        res.redirect(routes.home)
    }

}
export const postEditVideo = async (req, res) => {
    const {
        params: {
            id
        },
        body: {
            title,
            description
        }
    } = req;
    try {
        await Video.findOneAndUpdate({
            _id: id
        }, {
            title,
            description
        })
        res.redirect(routes.videoDetail(id))
    } catch (error) {
        res.redirect(routes.home)
    }
}

export const deleteVideo = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    console.log("deleteVideo",id)
    try {
        const video = await Video.findById(id);
        if(video.creator != req.user.id){
            throw Error();
        } else {
            await Video.findByIdAndDelete({
                _id: id
            })
            res.redirect(routes.home)
        }
    } catch (error) {
        res.redirect(routes.home)
    }
}