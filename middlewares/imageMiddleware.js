const uuid = require("uuid");
const fs = require("fs-extra");
const jimp = require("jimp");
const multer = require("multer");

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, next) => {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "that file type is not allowed" }, false);
    }
  }
};

module.exports = {
  uploadImage: multer(multerOptions).single("image"),
  resizeImage: async (req, res, next) => {
    console.log(req.file);
    if (!req.file) {
      next();
      return;
    }
    const extension = req.file.mimetype.split("/")[1];
    req.body.image = `${uuid.v4()}.${extension}`;
    //now we resize
    const image = await jimp.read(req.file.buffer);
    await image.resize(300, jimp.AUTO);
    await image.write(`./public/uploads/${req.body.image}`);
    //once we have written to the filesystem, keep going!

    next();
  },
  removeImage: (req, res, next) => {
    console.log("===>", req.body.imageToDelete, "<==");
    if (!req.body.imageToDelete) {
      next();
      return;
    }
    fs.remove(`./public/uploads/${req.body.imageToDelete}`)
      .then(() => {
        next();
      })
      .catch(err => {
        console.error(err);
        next();
      });
  }
};
