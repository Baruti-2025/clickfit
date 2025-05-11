import path from "path";
import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
