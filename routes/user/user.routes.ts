import express, { Router, Request, Response, NextFunction } from 'express';
import { verifyUser } from '../../helper/verifyUser';
import { verifyToken } from '../../helper/verifyToken';
import { handleProfileImageUpload, upload } from '../../helper/ImageUpload';
import {
  signup,
  login,
  userProfile,
  resetPassword,
  forgetPassword,
  updateUser,
  deleteUser,
  updateProfileImage,
  signOut
} from '../../controller/user/user.controller';

const userRoutes: Router = express.Router();

userRoutes.post('/login', login);
userRoutes.post('/signup', upload.single('profileImage'), handleProfileImageUpload, signup);
userRoutes.get('/user-profile', verifyUser, verifyToken, userProfile);
userRoutes.put('/update-user', verifyUser, verifyToken, updateUser);
userRoutes.delete('/del-user', verifyUser, verifyToken, deleteUser);
userRoutes.put('/reset-password', verifyUser, verifyToken, resetPassword);
userRoutes.post('/forget-password', verifyUser, verifyToken, forgetPassword);
userRoutes.put('/change-profile-image', upload.single('profileImage'), verifyUser, verifyToken, handleProfileImageUpload, updateProfileImage);
userRoutes.post('/signout', verifyToken, signOut);




export default userRoutes;
