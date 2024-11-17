import multer from "multer";
import path from "path";
import cloudinary from "../../config/cloudinaryConfig";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const upload = multer({ storage: storage });

export const uploadCloudinary = async (file: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      {
        public_id: file.filename,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};


