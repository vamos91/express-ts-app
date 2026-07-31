import express from "express";
const router = express.Router();
import { index, readOneArtist, createArtist } from "../controllers/artist.js";
import { checkToken } from "../middlewares/verifyToken.js";

router.get("/artists", checkToken, index);
router.get("/artists/:id", checkToken, readOneArtist);
router.post("/artists", checkToken, createArtist);
export default router;
