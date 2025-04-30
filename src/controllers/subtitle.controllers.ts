import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { addSubtitleToVideo } from '../services/ffmpeg.service';
import path from 'path';

const prisma = new PrismaClient();

export const addSubtitleController = async (req: Request, res: Response): Promise<void> => {
  const videoId = Number(req.params.id);
  const { text, start, end } = req.body;

  if (!text || start == null || end == null || start >= end) {
    res.status(400).json({ error: 'Invalid subtitle parameters' });
    return;
  }

  try {
    const original = await prisma.video.findUnique({ where: { id: videoId } });

    if (!original) {
      res.status(404).json({ error: 'Video not found' });
      return;
    }

    const ext = path.extname(original.filename);
    const subtitleFilename = `subtitle-${Date.now()}${ext}`;
    const outputPath = await addSubtitleToVideo(original.path, subtitleFilename, text, start, end);

    const video = await prisma.video.create({
      data: {
        filename: subtitleFilename,
        path: outputPath,
        size: 0, // optional: calculate
        duration: original.duration,
        status: 'subtitled',
      },
    });

    res.status(200).json({ message: 'Subtitle added', video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Subtitle processing failed' });
  }
};
