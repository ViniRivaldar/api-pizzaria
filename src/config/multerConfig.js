import multer from "multer";

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('O arquivo precisa ser uma imagem JPG ou PNG'));
    }
    return cb(null, true);
  },
  storage: multer.memoryStorage(),
};