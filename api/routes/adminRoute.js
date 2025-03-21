import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';
import { getUsers, adminUpdateUser, adminDeleteUser, adminCreateUser } from '../controllers/adminController.js';

const router = express.Router();
 
 router.use(verifyToken);
 router.use(verifyAdmin);
 
 router.get('/users',getUsers)
 router.put('/user/update/:id',adminUpdateUser)
 router.delete('/user/delete/:id', adminDeleteUser)
 router.post('/user/create', adminCreateUser)

 
 export default router;