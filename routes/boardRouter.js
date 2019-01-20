import express from "express";
import routes from "../routes";
import { boards, getBoardWrite, postBoardWrite, boardDetail, deleteBoard, getEditBoard, postEditBoard } from "../controllers/boardController";
import { uploadBoardImage, onlyPrivate } from "../middlewares";

const boardRouter = express.Router();
boardRouter.get(routes.boardWrite, onlyPrivate, getBoardWrite);

boardRouter.post(routes.boardWrite, uploadBoardImage, postBoardWrite);
boardRouter.get(routes.boardList, boards);

boardRouter.get(routes.editBoard(), getEditBoard);
boardRouter.post(routes.editBoard(), postEditBoard);

boardRouter.get(routes.deleteBoard(), deleteBoard);
boardRouter.get(routes.boardDetail(), boardDetail);

export default boardRouter;