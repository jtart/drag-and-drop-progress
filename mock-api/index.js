const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(_1, _2, cb) {
    cb(null, "uploads/");
  },
  filename: function(_, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single("file");

const app = express();

app.post("/file", upload, (req, res, next) => {
  res.json(req.file);
});

app.listen(4000, () => console.log(`Listening: 4000.`));
