import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
		return
	}

	const token = authHeader.split(' ')[1];
	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		req.body.userId = decodedToken.uid; // Attach the user's UID to the request
		next(); // Allow the request to proceed
	} catch (error) {
		console.error('Error verifying ID token:', error);
		res.status(403).json({ error: 'Unauthorized: Invalid token' });
	}
};
