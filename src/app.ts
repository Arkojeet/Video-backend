import express from 'express';
import router from './routes/video.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/videos', router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});