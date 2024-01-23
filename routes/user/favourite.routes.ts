import express from 'express';

import { verifyToken } from '../../helper/verifyToken';
const favouriteRoutes=express.Router();
import {addInFavourite,deleteFromFavourite} from '../../controller/user/favourite.controller'
const { verifyUser } = require('../../helper/verifyUser');
favouriteRoutes.post('/add-favourite',verifyUser,verifyToken,addInFavourite);
favouriteRoutes.delete('/delete-favourite',verifyUser,verifyToken,deleteFromFavourite)

export default favouriteRoutes;