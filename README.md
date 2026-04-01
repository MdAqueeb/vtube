# 🎬 Vtube – Social Media Video Platform

Vtube is a small, scalable full-stack application that demonstrates a clean and maintainable architecture for a video-sharing platform.

The system is designed with a strong focus on:
- Simplicity
- Clear structure
- Maintainability
- Scalability

---

## 🚀 Tech Stack

### Frontend
- React (Functional Components)
- Tailwind CSS
- Axios
- React Router DOM
- Context API (State Management)
- React Toastify
- Lucide React (Icons)

### Backend
- Python (Flask)
- REST API Architecture

### Database
- Relational Database MySQL

---

## 🏗️ Architecture Overview

The system follows a **client-server architecture**:

Frontend (React) → API Layer (Axios) → Backend (Flask) → Database

- Frontend handles UI and state
- Backend manages business logic and validation
- Database stores persistent data

---


### 🔹 Design Decisions
- Modular structure for scalability
- Separation of UI, logic, and API
- Reusable components to avoid duplication

---

## 🔐 Authentication & Authorization

### Roles
- **Admin** → Full access (video CRUD)
- **User** → View and watch videos

### Implementation
- `ProtectedRoute` → restricts unauthenticated users
- `AdminRoute` → restricts non-admin users

Unauthorized users are safely redirected.

---

## 🌐 API Layer

- Centralized Axios instance
- JWT token attached via interceptors
- Global error handling

### API Modules
- `authApi.js`
- `videoApi.js`

---

## 🔄 State Management

- Implemented using **React Context API**
- Stores:
  - User
  - Token
  - Role
  - Auth functions (login/logout)

### Why Context API?
- Avoids prop drilling
- Keeps global state centralized
- Simpler than Redux for this scale

---

## 📄 Pages Implemented

1. Login
2. Signup
3. Forgot Password (UI only)
4. Home (Video listing)
5. Video Detail
6. Profile
7. Admin Dashboard (CRUD UI)

---

## 🧩 Key Components

### Navbar
- Logo
- Search bar (UI only)
- Profile dropdown

### VideoCard
- Thumbnail
- Title
- Navigation to video

### Common Components
- Button
- Input (with validation)

---

## 👤 Avatar System

- No external images used
- Avatar generated using:
  - First letter of username
  - Colored circular background
- Implemented in `utils/avatar.js`

---

## 🎨 UI Approach

- Clean and minimal design
- Tailwind CSS for consistency
- Responsive layout (basic)

---

## 🔒 Validation & Error Handling

- Form validation for login/signup
- Toast notifications for feedback
- Graceful API error handling

---

## ⚠️ Risks

- Role validation depends on backend enforcement
- Performance may degrade with large datasets
- Token handling is basic (no refresh token)

---

## ❗ Limitations

- Search is UI-only
- No pagination or lazy loading
- Authentication is simplified
- Limited automated testing

---

## 🚀 Future Improvements

- Pagination & filtering
- Backend-powered search
- JWT refresh token system
- Comments, likes, sharing features
- Performance optimizations (lazy loading)

---

## 🤖 AI Usage

AI tools (e.g., ChatGPT) were used to:
- Assist in structuring the project
- Generate boilerplate code
- Suggest best practices

### Verification
- All generated code was manually reviewed
- Logic was tested and validated
- Code was simplified where necessary

---

## 🧠 Key Design Principles

- Simplicity over complexity
- Clear separation of concerns
- Modular and reusable components
- Scalable architecture
- Maintainable codebase

---

## ▶️ Setup Instructions

### Backend
cd Vtube \
pip install -r requirements.txt \
python app.py 


### Frontend
cd vtube_frontend \
npm install \
npm run dev 

---

## 📹 Walkthrough

https://drive.google.com/file/d/1XMnHSQvB8Cn5B971SD6dvbZC2akpdc18/view?usp=sharing

---

## 👨‍💻 Author

Aqueeb Ahmed
