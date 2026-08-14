import express from "express";
const playlistRouter = express.Router();
import {
  addTrack,
  create,
  index,
  read,
} from "../controllers/playlistController.js";
import { checkToken } from "../middlewares/verifyToken.js";

playlistRouter.get("/", checkToken, index);
playlistRouter.post("/", checkToken, create);
playlistRouter.get("/:id_playlist/tracks/:id_track", checkToken, addTrack);
playlistRouter.get("/:id/tracks", checkToken, read);

export default playlistRouter;
