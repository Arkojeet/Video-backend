import { Request, Response } from 'express';
import { renderQueue } from '../jobs/queue';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();

export const requestRender = async (req: Request, res: Response) => {
  const videoId = Number(req.params.id);
  await renderQueue.add('render', { videoId });
  res.json({ message: 'Render job queued' });
};

export const downloadVideo = async (req: Request, res: Response): Promise<void> => {
  const videoId = Number(req.params.id);
  const video = await prisma.video.findUnique({ where: { id: videoId } });

  if (!video || video.status !== 'rendered') {
    res.status(404).json({ error: 'Rendered video not found' });
    return;
  }

  const filePath = path.resolve(video.path);
  res.download(filePath); // ✅ no return here
};