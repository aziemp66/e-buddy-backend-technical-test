import express from 'express';
import { createUser, fetchUser, updateUser, updatePassword } from '../controller/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('', authMiddleware, createUser);
router.get('/:id', fetchUser);
router.put('/:id', authMiddleware, updateUser);
router.put('/password', authMiddleware, updatePassword);

export default router;
