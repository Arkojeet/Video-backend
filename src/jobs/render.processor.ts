import { Worker, Job } from 'bullmq';
import { renderFinalVideo } from '../services/render.service';
import { RedisOptions } from 'ioredis';

const connection: RedisOptions = { host: 'localhost', port: 6379 };

export const renderWorker = new Worker(
  'render',
  async (job: Job) => {
    const { videoId } = job.data;
    console.log(`Rendering video ID ${videoId}`);
    await renderFinalVideo(videoId);
  },
  { connection }
);