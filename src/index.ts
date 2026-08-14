import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3000;
import router from "./routes/routes.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import playlistRouter from "./routes/playlist.js";

app.use(express.json());
app.use(cors());

app.use("/api/playlists", playlistRouter);
app.use("/api", router);
app.use("/api/auth", userRouter);
app.use(cookieParser());

app.get("/", (request: Request, response: Response) => {
  console.log("requete reçu");
  response.json({ message: "ok !" });
});

app.listen(port, () => {
  console.log("App listen on localhost: " + port);
});
