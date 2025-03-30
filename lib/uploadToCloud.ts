'use server'
import cloudinary from "./cloudinary";

export const uploadImage = async (formdata: FormData | null, folder: string , fieldName : string , addWatermark: boolean = false):  Promise<{ secure_url: string }> => {
  if(formdata!=null){
    const file = formdata.get(fieldName) as File;
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);


  return new Promise((resolve, reject) => {
    const transformation = addWatermark
        ? [
            {
              overlay: 'bitsi_im81ph',
              gravity: 'north_west', 
              x: 10, 
              y: 10, 
              width: 30, 
              height: 30,
              opacity: 100,
              crop: 'fit'
            },
          ]
        : [];


    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: folder,
        transformation,
      },
      (err, result) => {
        if (err) {
          reject(err.message); 
        } else {
          const secure_url  =result?.secure_url || '';
          resolve({ secure_url })
        }
      }
    );

    uploadStream.end(bytes); 
  });
}else{
  return {secure_url : ''}
}
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