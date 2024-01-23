import express, { Router } from 'express';
import { verifyAdmin } from '../../helper/verifyAdmin';
import { getUser, getAllUser, signOut } from '../../controller/admin/user.controller';
import { verifyToken } from '../../helper/verifyToken';

const adminRoutes: Router = express.Router();

adminRoutes.get("/get-user/:id", verifyAdmin, verifyToken, getUser);
adminRoutes.get("/all-user", verifyAdmin, verifyToken, getAllUser);
adminRoutes.post('/signout', verifyToken, signOut);

export default adminRoutes;
