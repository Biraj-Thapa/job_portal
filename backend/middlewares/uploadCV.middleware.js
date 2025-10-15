
import multer from "multer";
import path from "path";
import fs from "fs";

const cvFolder = "uploads/cv";
if (!fs.existsSync(cvFolder)) {
  fs.mkdirSync(cvFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, cvFolder);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF or Word files are allowed"), false);
  }
};

export const uploadCV = multer({ storage, fileFilter });
