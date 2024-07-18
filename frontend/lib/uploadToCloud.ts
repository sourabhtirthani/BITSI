'use server'
import cloudinary from "./cloudinary";

export const uploadImage = async (file: File, folder: string): Promise<any> => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: folder,
      },
      (err, result) => {
        if (err) {
          reject(err.message); 
        } else {
          resolve(result); 
        }
      }
    );

    uploadStream.end(bytes); 
  });
};

interface CloudinaryUploadResult {
  secure_url: string;

}
export const uploadFile = async (fileContent: string, fileName: string, folder: string) : Promise<CloudinaryUploadResult>  => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: folder,
        public_id: fileName,
      },
      (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result as CloudinaryUploadResult);
        }
      }
    );

    uploadStream.end(Buffer.from(fileContent));
  });
};