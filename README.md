# ⚡ Bhavna Sahu — Personal Developer Portfolio

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

A modern, high-performance, and fully responsive personal portfolio website crafted with semantic HTML5, modern CSS3 layouts, and vanilla JavaScript. Designed for engineering students and developers to showcase IoT projects, frontend applications, and competitive programming streaks with accessible, aesthetic interactions.

---

## 🌟 Key Features

- 🌓 **Dark & Light Mode Theming**: Seamless theme toggling with `localStorage` memory and OS system preference sync (`prefers-color-scheme`).
- 📜 **Scroll-Driven Reading Progress Bar**: Real-time reading progress indicator powered natively by CSS `@supports (animation-timeline: scroll())` with an ultra-lightweight JavaScript fallback.
- ⌨️ **Dynamic Typewriter Effect**: Engaging animated headline rotating across engineering passions and development roles.
- 🔢 **Animated Stat Counters & Skills**: Smooth, performant numerical counting and progress fills powered by `IntersectionObserver`.
- 🗂️ **Interactive Project Filtering**: Instant categorization to filter between IoT & Embedded hardware, Web Development, and DSA / Algorithms.
- 📋 **Copy Email with Toast Notification**: One-click email copying to clipboard with smooth animated toast feedback.
- ♿ **Accessible Form Validation**: Implements `:user-invalid` / `:user-valid` pseudo-classes to avoid premature validation errors on page load, synced with `aria-invalid` and `role="status"` live feedback regions.
- 📱 **Mobile-First & Responsive**: Fluid typography, responsive grids, collapsible mobile drawer with Escape-key and outside-click dismiss.
- 🏃 **Reduced Motion Friendly**: Full support for `@media (prefers-reduced-motion: reduce)` respecting user accessibility preferences.

---

## 📂 Project Structure

```text
Portfolio/
├── index.html        # Semantic HTML5 document with Open Graph metadata and ARIA labels
├── style.css         # Modern modular CSS with CSS variables, animations, and theming
├── script.js         # Interactive JavaScript (theme, scrollspy, filters, counters, form)
└── README.md         # Comprehensive project documentation and deployment guide
```

---

## 🚀 Quick Start (Running Locally)

You do not need any build tools, bundlers, or package installations. 

### Option 1: Double-click to open
Simply open `index.html` directly in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).

### Option 2: Live Server (VS Code)
1. Open the `Portfolio` folder in **Visual Studio Code**.
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click on `index.html` and select **"Open with Live Server"**.

### Option 3: Python Local Server
Run in your terminal from the `Portfolio` folder:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🛠️ How to Customize

### 1. Update Personal Information
In `index.html`:
- Update the `<title>` and `<meta name="description">` tags in the `<head>`.
- Replace the name, bio text, college, and degree details in the **Home** and **About** sections.
- Change the email address in the hero social links and contact card:
  ```html
  <p id="email-text">your-email@example.com</p>
  <a href="mailto:your-email@example.com">...</a>
  ```

### 2. Add or Edit Projects
Each project card in the `#projects` section is configured with a `data-category` attribute used by the filter buttons:
```html
<div class="project-card" data-category="iot web">
    <div class="project-header">
        <div class="project-icon-box">
            <i class="fa-solid fa-seedling"></i>
        </div>
        <span class="project-category">IoT & Web</span>
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-desc">Your project description...</p>
        <div class="project-tech">
            <span>Tech 1</span>
            <span>Tech 2</span>
        </div>
        <div class="project-links">
            <a href="https://github.com/..." target="_blank" class="p-link">GitHub Repo</a>
        </div>
    </div>
</div>
```

### 3. Connect Real Form Submissions
To connect the contact form to receive emails directly in your inbox:
- Use [Formspree](https://formspree.io/):
  Replace the form declaration in `index.html`:
  ```html
  <form action="https://formspree.io/f/{your_form_id}" method="POST" class="contact-form">
  ```
- Or use [Web3Forms](https://web3forms.com/) or [EmailJS](https://www.emailjs.com/) for serverless form submissions without backend code.

---

## 🌐 Free Deployment Guide

### Deploying to GitHub Pages (Recommended)
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio"
   ```
2. Create a new repository on [GitHub](https://github.com/) named `portfolio` or `<your-username>.github.io`.
3. Link your remote and push:
   ```bash
   git remote add origin https://github.com/<your-username>/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to **Settings** > **Pages**.
5. Under **Branch**, select `main` and root `/`, then click **Save**.
6. Your portfolio will be live at: `https://<your-username>.github.io/portfolio/`

### Deploying to Vercel or Netlify
- Drag and drop the `Portfolio` folder into [Netlify Drop](https://app.netlify.com/drop), or import your repository directly into [Vercel](https://vercel.com/) for instant global CDN deployment with SSL.

---

## 🎨 Tech Stack & Standards

- **Markup**: Semantic HTML5 with ARIA landmark roles and accessible skip navigation.
- **Styling**: Vanilla CSS3, Custom Properties (CSS variables), CSS Grid & Flexbox, Backdrop Filter glassmorphism.
- **Icons**: Font Awesome 6.5.1 CDN.
- **Fonts**: Google Fonts (`Poppins` & `Fira Code`).
- **Script**: Vanilla ES6+ JavaScript, `IntersectionObserver`, `navigator.clipboard`, modern DOM event delegation.
- **Standards**: WCAG 2.1 AA compliance, `:user-invalid` input validation, and `@media (prefers-reduced-motion)`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use it as inspiration or a template for your own developer portfolio!

---

*Crafted by [Bhavna Sahu](https://github.com/sahubhavna012-code)*