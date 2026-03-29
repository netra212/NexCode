# 🧠 NexCode — LeetCode-like Coding Platform (MERN Stack)

NexCode is a full-stack coding platform inspired by LeetCode, built using the MERN stack. It allows users to solve coding problems, submit solutions, and track their progress, while providing admin capabilities for managing problem sets.

---

## 🚀 Features

### 👤 User Features

- 🔐 User Authentication (Signup/Login)
- 🧩 Browse and view coding problems
- 📤 Submit solutions
- ✅ Track solved problems
- 📊 Personal progress tracking

### 🛠️ Admin Features

- ➕ Create new coding problems
- ✏️ Update existing problems
- ❌ Delete problems
- 📚 Manage problem database

---

## 🏗️ Tech Stack

**Frontend:**

- React.js (if implemented / planned)

**Backend:**

- Node.js
- Express.js

**Database:**

- MongoDB (Mongoose)

**Other Tools:**

- Redis (for caching)
- JWT (Authentication)
- REST APIs

---

📁 Project Structure

```
NEXCODE/
│
├── node_modules/
├── src/
│ ├── config/
│ │ ├── db.js # MongoDB connection
│ │ └── redis.js # Redis setup
│ │
│ ├── Controllers/
│ │ ├── submitCode.js # Handles code submissions
│ │ ├── userAuthenticate.js
│ │ └── userProblem.js # Problem-related logic
│ │
│ ├── middleware/
│ │ ├── adminMiddleware.js
│ │ └── userMiddleware.js
│ │
│ ├── models/
│ │ ├── problem.js
│ │ ├── submission.js
│ │ └── user.js
│ │
│ ├── routes/
│ │ ├── problemCreator.js # Admin routes
│ │ ├── submit.js
│ │ └── userAuth.js
│ │
│ ├── utils/
│ │ ├── ProblemUtility.js
│ │ ├── validate.js
│ │ └── index.js
│ │
│ ├── Testing/
│ │ └── testing.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── Note.txt
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```

git clone https://github.com/your-username/nexcode.git
cd nexcode

```

2. Install dependencies

```

npm install

```

3. Setup environment variables

Create a `.env` file in the root directory:

```

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
REDIS_URL=your_redis_url

```

4. Run the server

```

npm start

```

```

```
