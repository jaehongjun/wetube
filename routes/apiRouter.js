import express from "express";
import routes from "../routes";
import { resisterView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.resisterView, resisterView);

export default apiRouter;