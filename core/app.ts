import express from 'express';
import userRoutes from '../routes/userRoutes';
const { onRequest } = require('firebase-functions/v2/https');
import cors from "cors";

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware and Routes
app.use(express.json());
app.use(cors({ origin: true }));
app.use('/api/users', userRoutes);

exports.users = onRequest(app)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app