import { Router } from 'express'
import { login, logout, signup,getData } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { upload } from '../middleware/multer.js';
import User from '../models/user.model.js';


const authRouter = Router();


authRouter.post('/signup',upload.single("profileImg"),signup)
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.get('/getdata',verifyToken,getData)


export default authRouter;