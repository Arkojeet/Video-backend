import { PrismaClient } from '@prisma/client';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

const prisma = new PrismaClient();

export const renderFinalVideo = async (videoId: number): Promise<void> => {
  const video = await prisma.video.findUnique({ where: { id: videoId } });
  if (!video) throw new Error('Video not found');

  const input = path.resolve(video.path).replace(/\\/g, '/');
  const output = path.resolve('uploads', `rendered-${Date.now()}.mp4`).replace(/\\/g, '/');

  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .output(output)
      .on('end', async () => {
        await prisma.video.update({
          where: { id: videoId },
          data: {
            status: 'rendered',
            path: output,
          }
        });
        resolve();
      })
      .on('error', reject)
      .run();
  });
};