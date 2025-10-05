
# 🌐 CareerNest (v1)

CareerNest is a **Job Portal Application** built using the **MERN stack**.
It allows **Job Seekers** to register, search, and apply for jobs, while **Companies** can create accounts, post, and manage job listings.

---

## 🚀 Tech Stack

* **Frontend:** React.js (Vite), Axios, React Router
* **Backend:** Node.js, Express.js, MongoDB (Mongoose)
* **Security & Auth:** JWT, Bcrypt, Cookie Parser, CORS, Dotenv

---

## ✨ Features

* 🔐 JWT Authentication with cookies
* 👤 User roles: `Jobseeker` & `Company`
* 🏢 Companies → create and manage job postings
* 💼 Job Seekers → browse jobs and apply
* 📂 Models: `User`, `Company`, `Job`, `Application`

---

## 📂 Project Structure

```
CareerNest/
│── client/       # React frontend
│── server/       # Express backend
│   ├── models/   # User, Company, Job, Application
│   ├── routes/   # API routes
│   ├── utils/    # DB connection
│   └── server.js  # Entry point
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/JeetuPalhub/CareerNest.git
cd careerNest
```

### 2. Install Dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

### 3. Environment Variables

Create a `.env` file in `server/`:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run Project

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

* Backend → [http://localhost:8000](http://localhost:8000)
* Frontend → [http://localhost:5173](http://localhost:5173)

---

## 🔗 API Endpoints

### User (`/api/v1/user`)

* `POST /register` → Register
* `POST /login` → Login
* `GET /profile` → User profile

### Company (`/api/v1/company`)

* `POST /create` → Create company
* `GET /:id` → Company details

### Job (`/api/v1/job`)

* `POST /create` → Post new job
* `GET /` → List jobs
* `GET /:id` → Job details

### Application (`/api/v1/application`)

* `POST /apply/:jobId` → Apply for job
* `GET /user` → User’s applications
* `GET /company/:id` → Applications for company

---

## 🛠️ Future Improvements

* Resume upload & profile management
* Job filters (location, role, salary)
* Admin dashboard
* Email notifications
* Improved UI with TailwindCSS / Material UI

---

## 📌 Version

**CareerNest v1.0.0**

---

## 📜 License

Licensed under the **MIT License**.

---

