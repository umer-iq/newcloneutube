import express from "express";
import { deleteVideo,addVideo, addView, getByTag, getVideo, random, search, sub, trend,getVideos} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, addVideo)
router.delete("/del/:id", verifyToken, deleteVideo)
router.get("/find/:id",getVideo)
router.get("/uservideos/:id",verifyToken,getVideos)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub",verifyToken, sub)
router.get("/tags", getByTag)
router.get("/search", search)
//router.put("/like/:videoId", verifyToken, like);

//dislike a video
//router.put("/dislike/:videoId", verifyToken, dislike);
export default router;