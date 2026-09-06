# Patient Management SPA 🏥

![.NET 10](https://img.shields.io/badge/.NET-10.0-512BD4?style=for-the-badge&logo=dotnet)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS v4](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A production-ready Single Page Application (SPA) for managing patients and their clinical appointments. Built with a modern, type-safe tech stack featuring an ASP.NET Core Minimal API backend and a React 19 frontend.

---

## ✨ Features

- **Authentication**: Mock JWT-based secure login portal.
- **Appointments Dashboard**: View, filter ("Today" vs "Tomorrow"), and search appointments.
- **Patient Directory & Demographics**: 
  - Comprehensive create & edit functionality.
  - **Unsaved Changes Guard**: Prevents accidental data loss when navigating away from dirty forms.
- **Responsive Design**: 
  - Desktop: Persistent collapsible sidebar.
  - Mobile/Tablet: Slide-over drawer navigation and responsive data grids.
- **State Management**: 
  - *Server State*: Cached and managed by **TanStack Query** (React Query).
  - *Client State*: Managed by **Zustand** + **Immer**.
- **Clean Architecture**: Domain models, DTOs (C# 14 records), and decoupled React components.

---

## 🛠 Tech Stack

### Backend (`/PatientManagement.API`)
- **Framework**: .NET 10.0 Minimal APIs
- **Language**: C# 14
- **Database**: Entity Framework Core (In-Memory for demo purposes)
- **Validation**: Native RFC 7807 ProblemDetails

### Frontend (`/PatientManagement.UI`)
- **Core**: React 19, TypeScript, Vite
- **Routing**: React Router v7 (using Data Router for `useBlocker` support)
- **Styling**: Tailwind CSS v4, Lucide React icons
- **UI Primitives**: Radix UI (accessible headless components)
- **Forms & Validation**: React Hook Form + Zod
- **Network Layer**: Axios with centralized Request/Response interceptors

---

## 🚀 Getting Started

### Prerequisites

- [.NET 10.0 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) or later.
- [Node.js](https://nodejs.org/) (v18+ recommended) and npm.

### 1. Running the Backend (API)

The backend uses an In-Memory database, meaning it starts fresh every time but is automatically seeded with 20 mock patients and 25 appointments.

```bash
cd PatientManagement.API
dotnet run
```
*The API will start on `http://localhost:5000` (or `http://localhost:5001` for HTTPS).*

### 2. Running the Frontend (React UI)

Open a **new** terminal window and run:

```bash
cd PatientManagement.UI
npm install
npm run dev
```
*The Vite dev server will start at `http://localhost:5173`.*

---

## 💻 Usage & Testing

1. **Login**: Use **any non-empty email and password** to log in. The application uses a mock JWT authentication system for demonstration purposes.
2. **Dashboard**: Once logged in, you will see the appointments dashboard. You can toggle between "Today" and "Tomorrow" appointments and search for patients by name or ID.
3. **Add/Edit Patient**: Click "+ Add Patient" or click on an existing appointment to view the patient demographic form. 
4. **Test the Guard**: Try modifying a patient's details and clicking the "Back" button or a sidebar link without saving. A Radix UI modal will warn you about unsaved changes!

---

## 📂 Project Architecture

```text
.
├── PatientManagement.API/           # ASP.NET Core 10 Backend
│   ├── Data/                        # EF Core DbContext & Seeding
│   ├── DTOs/                        # C# 14 Records for Request/Response
│   ├── Models/                      # Domain Entities
│   └── Program.cs                   # Minimal API endpoints & config
│
└── PatientManagement.UI/            # React 19 Frontend
    ├── src/
    │   ├── components/
    │   │   ├── layout/              # AppShell, Navbar, Sidebar
    │   │   └── ui/                  # Reusable primitives (Button, Input, etc.)
    │   ├── lib/                     # Utilities & Axios instance setup
    │   ├── pages/                   # Route components (Login, Appointments, PatientForm)
    │   ├── store/                   # Zustand stores (authStore, layoutStore)
    │   ├── App.tsx                  # Data Router & Query Provider setup
    │   └── main.tsx                 # React entry point
    ├── vite.config.ts               # Vite configuration (Tailwind plugin)
    └── package.json
```
