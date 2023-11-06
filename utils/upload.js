import multer from 'multer';
import pkg from 'multer-gridfs-storage';
import dotenv from
 
'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const { GridFsStorage } = pkg;

const storage = new GridFsStorage({
  url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.pn9ukdy.mongodb.net/?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true },
  file: (request, file) => {
    const match = ["image/png", "image/jpeg", "image/JPEG", "image/JPG", "image/jpg"];

    if (match.indexOf(file.mimeType) === -1) {
      return
 
`${Date.now()}-blog-${file.originalname}`;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`
    };
  },
});

export
 
default multer({ storage });