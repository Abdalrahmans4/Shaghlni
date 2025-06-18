# 💻 Shaghelni Frontend (React)

This is the **frontend** for the Shaghelni web application, built using **React**. Freelancers can create and manage their profile cards, while customers can browse and view all freelancer cards in one page — no login or signup required.

---

## 🔥 Description

The app allows users to:

- ✍️ **Freelancers**:
  - Add a public profile card
  - Edit their profile information
  - Delete their profile if needed

- 👀 **Customers**:
  - Browse all freelancer cards
  - Click "View Profile" to view additional details

All data is stored in a PostgreSQL database and fetched through a connected Express.js backend.

---

## 👥 User Flow

There is only one public interface:

- Anyone can access the page
- Freelancers submit their info via a form
- Cards are shown immediately after submission
- Each card can be edited or deleted directly

No login is required.

---

## 🧰 Technologies Used

- ⚛️ React 19
- 🧩 React Hooks (useState, useEffect,useRef)
- 🌐 Fetch API for handling HTTP requests
- 🎨 ReactBootstrap and Tailwind for UI
- 🗃️ Connected to Express.js + PostgreSQL backend

---

## 🚀 Getting Started

```bash
cd shaghelni-frontend
npm install -D tailwindcss@3 postcss autoprefixer
npm start
