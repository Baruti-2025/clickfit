import path from "path";
import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3500;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "upload_images");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    ); // unique image file name
  },
});

const upload = multer({ storage });

const __dirname = path.resolve();
app.use("upload_images", express.static(path.join(__dirname, "upload_images")));
app.use(cors());

app.post("/", upload.single("image"), (req, res) => {
  res.send("File uploaded successfully");
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
