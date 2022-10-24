import express, { Router } from 'express';
/** Import the controllers to add funtionality to the routers **/
import { register, authentication, confirm, forgotPassword, verifyToken, newPassword, profile } from '../controllers/userController.js';
/** Check if the user is authorized to see or use something **/
import checkAuth from '../middleware/checkAuth.js';

const userRouter = express.Router();

/** using '/' means this will be used for any route we pass to the function in the
 * ROUTING section on index.js. In this case /api/users  **/

/** Endpoints, Authentication, Register and User Confirmation **/
userRouter.post('/', register); //Create new user
userRouter.post('/login', authentication);
userRouter.get('/confirm/:token', confirm);
userRouter.post('/forgot-password', forgotPassword);
userRouter.route('/forgot-password/:token').get(verifyToken).post(newPassword);

userRouter.get('/profile', checkAuth, profile);

export default userRouter;