import { Router } from "express";
import { uploadVideo } from "../controllers/video.controller";
import { upload } from "../middlewares/upload.middleware";
import { trimVideoController } from "../controllers/trim.controllers";
import { addSubtitleController } from "../controllers/subtitle.controllers";
import { downloadVideo, requestRender } from "../controllers/render.controller";

const router = Router();

router.post('/upload', upload.single('video'), uploadVideo);

router.post('/:id/trim', trimVideoController);

router.post('/:id/subtitles', addSubtitleController);

router.post('/:id/render', requestRender);

router.get('/:id/download', downloadVideo);

export default router;