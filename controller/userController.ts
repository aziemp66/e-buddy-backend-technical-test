import { Request, Response } from 'express';
import { createUserProfile, fetchUserData, updateUserData, updateUserPassword } from '../repository/userCollection';

// Create User Profile
export const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { name, email } = req.body;
		if (!email) {
			res.status(400).json({ error: 'Missing required fields' });
			return
		}

		await createUserProfile(req.body.userId, { name, email, createdAt: new Date() });
		res.status(201).json({ message: 'User profile created successfully' });
	} catch (error) {
		console.error('Error creating user profile:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

// Fetch User Data
export const fetchUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const id = req.body.userId
		const data = await fetchUserData(id);
		if (!data) {
			res.status(404).json({ error: 'User not found' });
			return
		}
		res.json(data);
	} catch (error) {
		console.error('Error fetching user data:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

// Update User Data
export const updateUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const id = req.body.userId;
		const { name } = req.body
		await updateUserData(id, { name });
		const user = await fetchUserData(id)
		res.json({ user });
	} catch (error) {
		console.error('Error updating user data:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

// Update Password
export const updatePassword = async (req: Request, res: Response): Promise<void> => {
	const userId = req.body.userId
	try {
		const { newPassword } = req.body;
		if (!newPassword) {
			res.status(400).json({ error: 'Missing required fields' });
			return
		}

		await updateUserPassword(userId, newPassword);
		res.status(200).json({ message: 'Password updated successfully' });
	} catch (error) {
		console.error('Error updating password:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};
