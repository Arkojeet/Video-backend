import { renderWorker } from './jobs/render.processor';

console.log('Render worker is running...');

renderWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed for video ID: ${job.data.videoId}`);
});

renderWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});