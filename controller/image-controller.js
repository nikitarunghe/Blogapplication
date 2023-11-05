import grid from 'gridfs-stream';
import mongoose from 'mongoose';
 import { GridFSBucket } from 'mongodb';

 const url = '';


 let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
     gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');  
   
});



export const uploadImage = (request, response) => {
    if(!request.file) {
        return response.status(404).json("File not found");
    }
    const imageUrl = `${url}/file/${request.file.filename}`;

    return response.status(200).json(imageUrl);    
}




export const getImage = async (request, response) => {
  const filename = request.params.filename;

  if (!filename) {
    return response.status(400).json({ msg: "Missing filename parameter" });
  }

  try {
    const file = await gfs.files.findOne({ filename });

    if (!file) {
      return response.status(404).json({ msg: "File not found" });
    }

    const fileId = file._id;
    const readStream = gridfsBucket.openDownloadStream(fileId);

    readStream.pipe(response);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};







