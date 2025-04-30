import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

export const trimVideo = (
  inputPath: string,
  outputName: string,
  start: number,
  end: number
): Promise<string> => {
  const outputPath = path.join('uploads', outputName);

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .setStartTime(start)
      .setDuration(end - start)
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
};

export const addSubtitleToVideo = (
  inputPath: string,
  outputName: string,
  text: string,
  start: number,
  end: number
): Promise<string> => {
  const outputPath = path.join('uploads', outputName);

  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }

  // Escape special characters
  const escapedText = text.replace(/:/g, '\\:').replace(/'/g, "\\'");

  const drawtextFilter = `drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='${escapedText}':fontsize=54:fontcolor=white:box=1:boxcolor=black@0.5:boxborderw=5:x=(w-text_w)/2:y=h-100:enable=between(t\\,${start}\\,${end})`;

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoFilter(drawtextFilter)
      .output(outputPath)
      .on('start', (cmd) => console.log('FFmpeg command:', cmd))
      .on('end', () => resolve(outputPath))
      .on('error', (err) => {
        console.error('FFmpeg error:', err.message);
        reject(err);
      })
      .run();
  });
};
