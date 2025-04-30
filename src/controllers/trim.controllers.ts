import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { trimVideo } from '../services/ffmpeg.service';
import path from 'path';

const prisma = new PrismaClient();

export const trimVideoController = async (req: Request, res: Response): Promise<void> => {
  const videoId = Number(req.params.id);
  const { start, end } = req.body;

  if (isNaN(videoId) || start == null || end == null || start >= end) {
    res.status(400).json({ error: 'Invalid input parameters' });
    return;
  }

  try {
    const original = await prisma.video.findUnique({ where: { id: videoId } });

    if (!original) {
      res.status(404).json({ error: 'Video not found' });
      return;
    }

    const ext = path.extname(original.filename);
    const trimmedFileName = `trimmed-${Date.now()}${ext}`;
    const trimmedPath = await trimVideo(original.path, trimmedFileName, start, end);

    const trimmed = await prisma.video.create({
      data: {
        filename: trimmedFileName,
        path: trimmedPath,
        size: 0, // optionally calculate with fs.stat
        duration: end - start,
        status: 'trimmed',
      },
    });

    res.status(200).json({ message: 'Video trimmed successfully', trimmed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Trimming failed' });
  }
};
