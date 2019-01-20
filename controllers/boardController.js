import routes from "../routes";
import Board from "../models/Board";

export const boards = async (req, res) => {
    try {
        const boards =  await Board.find({}).sort({
            id: -1
        })
        console.log(boards)
        res.render("boardList", {pageTitle: "boardList", boards})
    } catch (error) {
        res.ridirect(routes.home)
    }
}

export const boardDetail = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;

    try {
        const board = await Board.findById(id).populate('creator');
        res.render("boardDetail", { pageTitle: board.title, board})
    } catch (error) {
        res.redirect(routes.home)
    }
}
export const getBoardWrite = (req, res) => {
    res.render("boardWrite", {pageTitle: "BoardWrite"})
}
export const postBoardWrite = async (req, res) => {
    const {
        body: {
            title, description
        },
        file: {
            path
        }
    } = req;
    await Board.create({
        title,
        description,
        imageUrl : path,
        creator: req.user.id
    })
    res.redirect(`/boards${routes.boardList}`)
}
export const getEditBoard = async(req, res) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const board = await Board.findById(id);
        console.log(board.creator != req.user.id)
        if(board.creator != req.user.id){
            throw Error();
        } else {
            res.render("editBoard", {pageTitle: "Editboard", board})
        }
    } catch (error) {
        res.redirect(routes.home)
    }
    
}
export const postEditBoard = async (req, res) => {
    const {
        body: {
            title,
            description
        },
        params: {
            id
        }
    } = req;

    try {
        await Board.findOneAndUpdate({
            _id: id
        }, {
            title,
            description
        })
        res.redirect(routes.boardDetail(id))
    } catch (error) {
        res.redirect(routes.home)
    }
}
export const deleteBoard = async(req, res) => {
    const {
        params : {
            id
        }
    } = req;

    try {
        const board = await Board.findById(id);
        if(board.creator != req.user.id){
            throw Error();
        }
        else {
            await Board.findByIdAndDelete({
                _id: id
            })
            res.ridirect(routes.boardList)
        }
    } catch (error) {
        res.redirect(routes.home)
    }
}