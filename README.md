# 📒 Address Book Application

A full-stack contact management app with a modern glassmorphism UI built with React + Tailwind CSS and a Node.js/Express + MongoDB backend.

---

## 📁 Project Structure

```
sql/
├── client/          ← React frontend (Vite)
│   └── src/
│       ├── components/   (Navbar, ContactCard, ConfirmModal, Loader, EmptyState)
│       └── pages/        (ContactList, ContactForm, ContactDetail)
└── server/          ← Express backend
    ├── models/           (Contact.js)
    ├── controllers/      (contactController.js)
    ├── routes/           (contactRoutes.js)
    ├── seed.js
    └── server.js
```

---

## ⚡ Prerequisites

- **Node.js** v18+
- **MongoDB** running locally on `mongodb://127.0.0.1:27017`

---

## 🚀 Getting Started

### 1. Start MongoDB

Make sure MongoDB is running locally (default port `27017`).

### 2. Backend

```bash
cd server
npm install
npm run seed      # seed the database with sample contacts
npm run dev       # starts on http://localhost:5000
```

### 3. Frontend

```bash
cd client
npm install
npm run dev       # starts on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 🔌 API Endpoints

| Method | Endpoint             | Description       |
|--------|----------------------|-------------------|
| GET    | `/api/contacts`      | List all contacts |
| GET    | `/api/contacts/:id`  | Get single contact|
| POST   | `/api/contacts`      | Create contact    |
| PUT    | `/api/contacts/:id`  | Update contact    |
| DELETE | `/api/contacts/:id`  | Delete contact    |

---

## 🎨 Features

- ✅ Create, Read, Update, Delete contacts
- ✅ Live search filtering
- ✅ Form validation
- ✅ Toast notifications
- ✅ Confirmation modal for deletions
- ✅ Responsive design (mobile + desktop)
- ✅ Glassmorphism UI with smooth animations
- ✅ Loading and empty states
