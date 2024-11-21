import express from 'express';
import { createUser, fetchUser, updateUser, updatePassword } from '../controller/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('', authMiddleware, createUser);
router.get('', authMiddleware, fetchUser);
router.put('', authMiddleware, updateUser);
router.put('/password', authMiddleware, updatePassword);

export default router;
