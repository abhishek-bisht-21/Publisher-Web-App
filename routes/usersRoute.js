import express from 'express';
import { loginUserCtrl, registerUserCtrl, getUserProfileCtrl, updateShippingAddresctrl } from '../controllers/userCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const userRoutes = express.Router();


userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get('/profile', isLoggedIn, getUserProfileCtrl);
userRoutes.post("/update/shipping", isLoggedIn, updateShippingAddresctrl);

export default userRoutes;