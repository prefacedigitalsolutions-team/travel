# 🌿 Verdant Trails — Luxury Travel & Private Aviation Desk

> A high-end bespoke travel enquiry and concierge management system built for luxury expeditions, private charter requests, and VIP client dossiers.

---

## 🚀 Overview
**Verdant Trails** is a full-stack web application designed for elite travel management. It features an immersive, motion-driven public-facing frontend for clients to request bespoke journeys, backed by a real-time, secure **Admin Command Desk** for travel architects to manage, track, and process leads seamlessly.

---

## 🛠️ Tech Stack & Architecture

### **Frontend:**
* **Framework:** Next.js (App Router, Server & Client Components)
* **Styling & UI:** Modern CSS, Responsive Layouts, Custom Design System
* **Animations:** GSAP (GreenSock Animation Platform) & ScrollTrigger for high-end cinematic interactions
* **State & Real-time:** React Hooks (`useState`, `useEffect`, `useCallback`), Auto-polling sync mechanism

### **Backend & API:**
* **Framework:** Next.js API Routes (Serverless endpoints)
* **Database ODM:** Mongoose (Schema validation, custom ID tracking)

### **Database & Security:**
* **Database:** MongoDB Atlas (`riyazuddin` database, `enquiries` collection)
* **Authentication:** Secure Session Storage Authentication Guard (`sessionStorage` verification for admin routes)

---

## ✨ Key Features

1. **Bespoke Client Portal:**
   * Interactive enquiry form with automated ID generation (`LEAD-XXXX`) and precise date-time stamps.
   * Dynamic service and destination selectors (Himalayan Sanctuaries, Overwater Villas, Private Charters).

2. **Concierge Command Desk (Admin Dashboard):**
   * **Real-time Synchronization:** Auto-polling background sync keeps dashboard data updated with MongoDB without manual page reloads.
   * **Advanced Filtering & Search:** Filter by status (*Pending Review*, *Proposal Sent*, *Confirmed*) or search instantly by client name, destination, or Dossier ID.
   * **Performance Pagination:** Server/Client-side chunking (50 dossiers per page) to ensure high performance even with large datasets.
   * **Direct Client Actions:** Status toggling, permanent database archiving/deletion, and direct WhatsApp client outreach.
   * **Professional PDF Export:** Built-in A4 landscape print styles to export clean, formal reports directly from the dashboard.

3. **Robust Database CRUD Operations:**
   * Full Create, Read, Update, and Delete lifecycle mapped safely to custom string IDs rather than raw database object IDs.

---

## 📁 Project Structure

```text
travel/
├── app/
│   ├── admin/
│   │   ├── dashboard/       # Admin Command Desk & Table components
│   │   └── login/           # Admin Security Gate
│   ├── api/
│   │   └── enquiries/       # REST API endpoints (GET, POST, PUT, DELETE)
│   ├── layout.js            # Global Layout
│   └── page.js              # Public Luxury Landing Page
├── models/
│   └── Enquiry.js           # Mongoose Schema definition
├── lib/
│   └── mongodb.js           # MongoDB Atlas connection utility
└── README.md                # Project Documentation