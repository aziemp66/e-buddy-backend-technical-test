import { db, auth } from '../config/firebaseConfig';
import { User } from '../entities/user';

const USERS_COLLECTION = 'users';

// Fetch a user by ID
export const fetchUserData = async (id: string): Promise<User | null> => {
	const doc = await db.collection(USERS_COLLECTION).doc(id).get();
	return doc.exists ? ({ id: doc.id, ...doc.data() } as User) : null;
};

// Update a user's data by ID
export const updateUserData = async (id: string, data: Partial<User>): Promise<void> => {
	await db.collection(USERS_COLLECTION).doc(id).update(data);
};

export const createUserProfile = async (id: string, data: { name: string; email: string, createdAt: Date }) => {
	await db.collection(USERS_COLLECTION).doc(id).set(data);
};

// Update User Password
export const updateUserPassword = async (uid: string, newPassword: string) => {
	return await auth.updateUser(uid, { password: newPassword });
};