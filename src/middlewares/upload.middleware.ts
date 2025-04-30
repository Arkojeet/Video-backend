import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (_, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = `${file.fieldname}-${Date.now()}${ext}`;
        cb(null, name);
    }
});

export const upload = multer({storage});