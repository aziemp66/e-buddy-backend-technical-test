
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs'

dotenv.config();

const serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH || `{}`, 'utf-8'))

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const db = admin.firestore();
export const auth = admin.auth();