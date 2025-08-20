# 🚀 Personal Portfolio – [Live Demo](https://my-portfolio-nu-khaki-25.vercel.app/)

A modern, **full-stack personal portfolio website** built with **Next.js 14, TypeScript, TailwindCSS, Prisma, and MongoDB**.\
It includes a full **Admin Panel** to manage content dynamically — no need to edit code for updates!

---

## ✨ Features

### 🖥️ Frontend (Public Portfolio)

- **Dynamic Content** – All sections (About, Skills, Experience, Projects, Contact, Site Config) are managed from the backend.
- **Dark/Light Mode Toggle** – Integrated theme system with primary/secondary colors.
- **About Section** – Profile image, introduction, and bio (editable via API).
- **Skills Section** – Animated progress bars with shimmer effect (fetched dynamically).
- **Experience Timeline** – Scroll-based animated work experience.
- **Projects Showcase** – Cards with images, live demo links, GitHub repos, and tech stack badges.
- **Contact Form** – Secured with **Google reCAPTCHA v3** + email notifications via **Resend API**.
- **Responsive Design** – Optimized for all devices.
- **SEO Ready** – Metadata and optimized images with `next/image`.

### 🔑 Admin Panel

- **Authentication** – Secured with **NextAuth** (GitHub & Google login).
- **Dashboard** – Manage portfolio content dynamically.
- **CRUD Operations**:
  - ✍️ Add/Edit/Delete **Projects** (with image upload to Vercel Blob Storage).
  - ✍️ Add/Edit/Delete **Experience** entries.
  - ✍️ Update **About** details (profile picture, bio).
  - ✍️ Manage **Skills** (icon, name, proficiency level).
  - ✍️ Update **Site Config** (theme colors, social links, etc.).
- **Image Uploads** – Integrated with **Vercel Blob Storage** (automatic upload & deletion).
- **Form Validation** – Zod + React Hook Form.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, TailwindCSS, Framer Motion, ShadCN/UI
- **Backend:** Next.js API Routes, Prisma ORM, MongoDB Atlas
- **Auth:** NextAuth (GitHub + Google Providers)
- **File Storage:** Vercel Blob Storage
- **Email Service:** Resend API
- **Validation:** Zod + React Hook Form
- **UI/UX:** Responsive, Animated, Dark/Light Theme

---

## ⚡ Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Vaman971/my-portfolio.git

cd portfolio
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="your-mongodb-connection-string"
RESEND_API_KEY="your-resend-api-key"
RECAPTCHA_SECRET="your-recaptcha-secret"
CONTACT_EMAIL="your-email@example.com"
NEXT_PUBLIC_RECAPTCHA_SITEKEY="your-recaptcha-sitekey"
ADMIN_EMAIL="your-admin-email"
ADMIN_NAME="Your Name"
NEXTAUTH_SECRET="your-random-secret"

GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"
GOOGLE_ID="your-google-oauth-id"
GOOGLE_SECRET="your-google-oauth-secret"

BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

### 4️⃣ Run Prisma Migrations

```bash
npx prisma generate
npx prisma db push
```

### 5️⃣ Start Development Server

```bash
npm run dev
```

Visit 👉 [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment

Easily deploy on **Vercel**:

```bash
vercel
```

Make sure to add all environment variables in the Vercel dashboard.

---

## 🔒 Authentication

- Admin access is restricted to the email set in `ADMIN_EMAIL`.
- Need to manually change the role to admin in MongoDb database.
- Supports **GitHub** and **Google** login via NextAuth.

---

## 📬 Contact Form

- Secured with **Google reCAPTCHA v3**.
- Emails are sent using **Resend API**.
- Messages are delivered to the email specified in `CONTACT_EMAIL`.

---

## 📂 Project Structure

```
/ (root)
├── app/                # Next.js App Router
│   ├── api/            # API Routes
│   └── (portfolio)     # Portfolio Pages
├── components/         # UI Components
├── lib/                # Utility libraries (prisma, auth, etc.)
├── prisma/             # Prisma schema
└── public/             # Static assets
```

---

## 📄 License

This project is licensed under the **MIT License** – feel free to use and modify it.

```text
MIT License

Copyright (c) 2025 Aman Verma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

