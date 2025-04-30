import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import ffmpeg from 'fluent-ffmpeg';

const prisma = new PrismaClient();

export const uploadVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    const file = req.file;
    const filePath = req.file.path;
    const size = req.file.size;

    ffmpeg.ffprobe(filePath, async (err, metadata) => {
      if (err) {
        res.status(500).json({ error: 'Failed to process video metadata' });
        return;
      }

      const duration = metadata?.format?.duration || 0;

      const video = await prisma.video.create({
        data: {
          filename: file.filename,
          path: filePath,
          size,
          duration,
        },
      });

      res.status(200).json({ message: 'Upload successful', video });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
