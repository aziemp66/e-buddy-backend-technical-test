
# **Backend Repository**

This is the backend application for managing user data and authentication. It uses **Express.js** as the framework and integrates with **Firebase** for authentication and Firestore database operations. This application provides a secure API for user management and password updates.

---

## **Features**

### **Core Features**
1. **Create User Profile**
   - Endpoint: `POST /api/create-user-data`
   - Creates a user profile in the Firestore database.
   - Required fields:
     - `id`: User ID.
     - `name`: User's name.
     - `email`: User's email address.

2. **Fetch User Profile**
   - Endpoint: `GET /api/fetch-user-data/:id`
   - Retrieves user profile data by user ID.

3. **Update User Profile**
   - Endpoint: `POST /api/update-user-data/:id`
   - Updates specific fields of a user profile in Firestore.
   - Supports partial updates (merges with existing data).

4. **Update User Password** (Optional Feature)
   - Endpoint: `POST /api/update-password`
   - Updates the user's password securely via Firebase.
   - Requires:
     - `userId`: Firebase User ID.
     - `newPassword`: New password for the user.

---

## **How to Run**

### **1. Prerequisites**

Ensure the following are installed on your system:
- **Node.js** (v16 or later)
- **pnpm** (v8 or later)
- **Firebase CLI** (for local emulators, optional)

### **2. Clone the Repository**

```bash
git clone https://github.com/your-username/backend-repo.git
cd backend-repo
```

### **3. Install Dependencies**

```bash
pnpm install
```

### **4. Firebase Setup**

1. Log in to [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project.
3. Download the `serviceAccountKey.json` file from the Firebase Admin SDK setup page.
4. Put the filepaths of the `serviceAccountKey.json` to the environtment variable.

### **5. Set Up Environment Variables**

Create a `.env` file in the root directory with the following content:

```env
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
PORT=3000
```

### **6. Run the Application**

#### **Development Mode**
Run the app in development mode with hot-reloading:
```bash
pnpm run dev
```

#### **Production Mode**
Compile the app and run it:
```bash
pnpm run build
pnpm start
```

---

## **Endpoints**

### **1. Create User Profile**
- **Method**: `POST`
- **URL**: `/api/create-user-data`
- **Headers**:
  - `Authorization: Bearer <Firebase_ID_Token>`
- **Body**:
  ```json
  {
    "id": "user123",
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
  ```

---

### **2. Fetch User Profile**
- **Method**: `GET`
- **URL**: `/api/fetch-user-data/:id`
- **Headers**:
  - `Authorization: Bearer <Firebase_ID_Token>`

---

### **3. Update User Profile**
- **Method**: `POST`
- **URL**: `/api/update-user-data/:id`
- **Headers**:
  - `Authorization: Bearer <Firebase_ID_Token>`
- **Body**:
  ```json
  {
    "name": "Updated Name",
    "email": "updatedemail@example.com"
  }
  ```

---

### **4. Update User Password** (Optional Feature)
- **Method**: `POST`
- **URL**: `/api/update-password`
- **Headers**:
  - `Authorization: Bearer <Firebase_ID_Token>`
- **Body**:
  ```json
  {
    "userId": "user123",
    "newPassword": "securepassword123"
  }
  ```

---

## **Optional Features**

1. **Update User Password**:
   - This feature allows users to update their passwords securely.
   - Requires the Firebase Admin SDK for backend password management.
   - Users must provide a valid Firebase ID token for authentication.

---

## **How to Test**

1. Use **Postman** or **cURL** to test the endpoints.
2. Include a valid Firebase **ID Token** in the `Authorization` header for all secured routes.
3. Optionally, run Firebase emulators for local testing:
   ```bash
   firebase emulators:start
   ```

---

## **Contributing**

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

---

This README provides everything needed to run, test, and understand the features of your backend application. Optional features are highlighted to distinguish them from core functionalities.
