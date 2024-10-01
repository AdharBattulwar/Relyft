import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    var fileExtension = file.originalname.split(".")
    fileExtension = fileExtension[fileExtension.length-1]
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});

export const upload = multer({ storage: storage });
