import multer from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import express from 'express'
declare module 'express' {
  interface Request {
    image?: string;
  }
}
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, 'public/images/productImage/');
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload2 = multer({ storage: storage });

const handleProductImageUpload = (req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    req.image = `${req.file.path}`;
  }
  next();
};



export { upload2, handleProductImageUpload };

