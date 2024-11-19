import { Request, Response } from 'express';
import { createUserProfile, fetchUserData, updateUserData, updateUserPassword } from '../repository/userCollection';

// Create User Profile
export const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id, name, email } = req.body;
		if (!id || !email) {
			res.status(400).json({ error: 'Missing required fields' });
			return
		}

		await createUserProfile(id, { name, email, createdAt: new Date() });
		res.status(201).json({ message: 'User profile created successfully' });
	} catch (error) {
		console.error('Error creating user profile:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

// Fetch User Data
export const fetchUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
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
		const { id } = req.params;
		const updated = await updateUserData(id, req.body);
		res.json({ success: updated });
	} catch (error) {
		console.error('Error updating user data:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

// Update Password
export const updatePassword = async (req: Request, res: Response): Promise<void> => {
	try {
		const { userId, newPassword } = req.body;
		if (!userId || !newPassword) {
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
