# ⚡ TechX — Next-Gen Hardware & Modern Tech Showcase

<div align="center">

![TechX Banner](https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80)

**A high-performance, aesthetically stunning e-commerce storefront for precision-engineered hardware.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-emerald.svg)]()
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-black?logo=github)]()

[Live Demo](#-launching-on-github-pages) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start)

</div>

---

## ✨ Features

- 🌌 **Cyber-Chic Dark & Light Mode:** Tailored HSL color palettes with obsidian dark glassmorphism, fluid gradients, and vibrant accent glows (`#ff5e1f`, `#00e5ff`).
- ⚡ **Interactive 3D Glass Hero & Bento Grid:** Modern Apple/Vercel-inspired UI with floating interactive cards and category bento layouts.
- 🔍 **Instant Search & Command Palette (`Ctrl+K`):** Blazing-fast client-side product filtering across 24+ curated hardware models (Audio, AR/VR, Wearables, Gaming, Smart Home, Computing).
- 📱 **Quick-View Hardware Modal:** Deep-dive into technical spec sheets, verified customer reviews, high-res galleries, and color finish selectors.
- 🛒 **Slide-Out Cart Drawer:** Interactive bag drawer with a Free Shipping progress tracker and instant quantity adjustments.
- 🎟️ **Promo Code Engine:** Built-in discount coupons (e.g., `TECHX20` for 20% off, `LAUNCH10` for 10% off).
- 💳 **3-Step Checkout Wizard:** Streamlined checkout simulation with UPI, Card, and COD payment mockups + instant order receipt generation.
- 📍 **Simulated Order GPS Tracker:** Real-time multi-stage shipment timeline with live flight & courier updates.
- 📞 **Specialist Contact Hub:** Dedicated Contact page with direct WhatsApp chat, click-to-call (`+91 93727 85040`), and email (`vivekwilsoncollege@gmail.com`).
- ♥ **Persistent Wishlist & Account Hub:** Full state persistence in `localStorage`.
- 📊 **Google Spreadsheet Sync:** Integrated telemetry and order capture webhook.
- 🌐 **100% Static & GitHub Pages Ready:** Zero build dependencies, pure HTML5, CSS3 & ES6+ JavaScript.

---

## 🛠️ Tech Stack

- **Markup & Structure:** Semantic HTML5 with rich Open Graph & SEO meta tags.
- **Styling:** Pure Vanilla CSS3 with CSS Custom Properties, Glassmorphism, and responsive Grid/Flexbox.
- **Logic & State:** Vanilla ES6+ JavaScript (SPA Hash Routing, LocalStorage sync, dynamic DOM rendering).
- **Typography:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), and [DM Mono](https://fonts.google.com/specimen/DM+Mono).

---

## 🚀 Launching on GitHub Pages

Deploying **TechX** to GitHub Pages takes under 1 minute:

1. **Initialize Git & Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: Initial TechX release"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/techx-storefront.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages**.
   - Under **Source**, select **Deploy from a branch**.
   - Choose Branch: `main` and Folder: `/(root)`.
   - Click **Save**.

Your TechX store is now live at `https://<YOUR-USERNAME>.github.io/techx-storefront/`! 🎉

---

## 💻 Local Preview

Simply double-click `index.html` in your file explorer or serve using any static web server:

```bash
# Using Python
python -m http.server 3000

# Or using Node / npx
npx serve .
```

Visit `http://localhost:3000` in your browser.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
