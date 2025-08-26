# 🚀 React-vite Portfolio Template

A **modern, fully responsive and animated personal portfolio template** built with **React + Vite**, **TailwindCSS v4**, and **Framer Motion**.  
Perfect for developers, researchers, and professionals who want to showcase their **education, work experience, projects, skills, awards, and contact information** in a stylish way.  
 

---

## 📂 Project Structure

```
src/
 ├── assets/           # Images, CV (or putt in public folder)
 ├── components/       # All React components (Hero, Navbar, AboutMe, etc.)
 ├── App.jsx           # Main entry with all sections
 ├── index.css         # TailwindCSS base styles
 ├── main.jsx          # React entry point
 └── ...
```

---

## 🛠️ Tech Stack

- ⚡ **React + Vite** → fast development
- 🎨 **TailwindCSS v4** (with `@tailwindcss/vite`)
- ✨ **Framer Motion** → animations
- 🔥 **React Icons** → icons for skills & contact
- 📱 Fully Responsive → works on Mobile, Tablet, and Desktop
- 🌐 Deployment → Netlify

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Asif-Ullah-dev/vite-react-portfolio.git
cd portfolio
```

### 2️⃣ Install Dependencies
Make sure you have **Node.js (>=18)** installed.  
Then run:
```bash
npm install
```

### 3️⃣ Run the Development Server
```bash
npm run dev
```
Now open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 Setup from Scratch (What I did)

If you want to rebuild this project from zero, here are the exact steps followed:

### Step 1 — Create React + Vite app
```bash
npm create vite@latest my-portfolio 
cd my-portfolio
npm install
```

### Step 2 — Install TailwindCSS v4 (with Vite plugin)
```bash
npm install tailwindcss @tailwindcss/vite
```

### Step 3 — Configure `vite.config.js`
Replace content with:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Step 4 — Add Tailwind to `src/index.css`
```css
@import "tailwindcss";
```

(❌ No need for `tailwind.config.js` or `postcss.config.js` in v4 + vite setup)

---

### Step 5 — Install Animations & Icons
```bash
npm install framer-motion react-icons react-type-animation
```

---

### Step 6 — Project Setup
- Added `Navbar`, `Hero`, `AboutMe`, `Education`, `Experience`, `Skills`, `Honours`, `Presentations`, `Contact`
- Used **Framer Motion** for hover, slide, fade, typing effects
- Added **responsive design** (`flex-col`, `md:flex-row`, `px-4 sm:px-6 md:px-12`)

---

### Step 7 — Contact Form Setup (Netlify)
In `Contact.jsx`, I added:

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  ...
</form>
```

Netlify will handle submissions and send them to your email.

---

### Step 8 — Deployment
- Push project to GitHub.
- Go to [Netlify](https://www.netlify.com/) → New Site → Import from GitHub.
- Netlify will auto-detect **Vite** and deploy your portfolio.

---

## 📸 Features

- ✅ Hero Section with Typing Animation
- ✅ Responsive Navbar with Sidebar (Mobile)
- ✅ About Me, Education, Experience
- ✅ Skills (Bars, Rings, Icons)
- ✅ Honours & Awards with badges
- ✅ Contact form + Social icons (WhatsApp, Email, LinkedIn, etc.)
- ✅ Animated transitions on hover & scroll

---

## 📄 How to Collaborate

1. Fork this repo.  
2. Create a new branch:  
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Added new section"
   ```
4. Push to your branch:  
   ```bash
   git push origin feature-branch
   ```
5. Open a Pull Request.

---

## 👨‍💻 Made by
**Asif Ullah**  
---
