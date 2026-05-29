import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// 🔥 FORCE CONFIG (NO DEPENDENCY ISSUE)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "djud4r08t",
  api_key: process.env.CLOUD_API_KEY || "818194317827892",
  api_secret: process.env.CLOUD_API_SECRET || "shmh19Z9Hnt4KlzwGGc3zQkT1JI",
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // 🔥 EXPLICIT PASS
  params: async (req, file) => {
    return {
      folder: "uploads",
      allowed_formats: ["jpg", "png", "jpeg"],
    };
  },
});

export { cloudinary, storage };
//npm i cloudinary multer multer-storage-cloudinary
