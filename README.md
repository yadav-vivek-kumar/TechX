# ⚡ TechX — E-Commerce Platform, Live Telemetry & Advanced Data Analytics

An end-to-end, full-stack e-commerce hardware ecosystem featuring real-time client-side telemetry, automated Google Sheets data collection, comprehensive R statistical modeling, and an interactive Streamlit analytics dashboard.

---

## 🌟 Architecture Overview

```
TechX Website (index.html, app.js, style.css)
        │
        ├──► Real-Time Telemetry Engine (15 UI Metrics + Google HEART Framework)
        │       │
        │       └──► Google Apps Script (Code.gs Webhook) ──► Google Spreadsheet
        │                                                     ├── 1. "User Telemetry" (26 Cols)
        │                                                     └── 2. "HEART Analysis" (24 Cols)
        │
        └──► Analytics & Intelligence Pipelines:
                ├── 1. Streamlit Interactive Dashboard (streamlit_app.py)
                └── 2. R Statistical Pipeline & Models (techx_data_analysis.R)
```

---

## 📁 Repository Structure & File Guide

| File Name | Description |
| :--- | :--- |
| **`index.html`** | 🌐 TechX e-commerce website storefront (products, categories, deals, cart, checkout) |
| **`style.css`** | 🎨 Cyberpunk dark theme stylesheets and responsive animations |
| **`app.js`** | ⚡ Frontend logic + automated telemetry tracking engine (HEART + 15 UI metrics) |
| **`Code.gs`** | 📑 Google Apps Script backend that auto-logs sessions to dual Google Sheets |
| **`streamlit_app.py`** | 📊 Streamlit analytics dashboard (8 tabs, KPI cards, Plotly charts, multi-filters) |
| **`requirements.txt`** | 📦 Python dependencies for Streamlit Cloud (`streamlit`, `pandas`, `openpyxl`, `plotly`, `numpy`) |
| **`TechX User Analysis 5000 Users.xlsx`** | 📈 Complete 5,000 synthetic user sessions dataset (User Telemetry & HEART sheets) |
| **`techx_data_analysis.R`** | 📉 Master R data cleaning, 11 visualization plots, and 4 statistical models |
| **`TechX_Data_Analysis_Report.Rmd`** | 📄 R Markdown notebook for interactive analysis |
| **`TechX_Data_Analysis_Report.html`** | 📑 Standalone interactive HTML statistical report |
| **`run_dashboard.bat`** | ⚡ 1-click Windows launcher for local Streamlit dashboard |
| **`.gitignore`** | ⚙️ Git configuration |

---

## 🚀 Live Streamlit Dashboard Deployment (Free)

1. Upload this repository to **GitHub**.
2. Go to **[share.streamlit.io](https://share.streamlit.io)** and log in with GitHub.
3. Click **"New App"** $\to$ Select this repository $\to$ Set Main file path to **`streamlit_app.py`**.
4. Click **"Deploy!"** — Your dashboard is instantly live on the internet.

### Running the Dashboard Locally
```bash
pip install -r requirements.txt
streamlit run streamlit_app.py
```
Or double-click `run_dashboard.bat` on Windows. Open `http://localhost:8501`.

---

## 📊 Key Analytical Insights (from 5,000 User Sessions)

- **Total Volume**: 5,000 Unique Users & 5,000 Sessions
- **Bounce Rate**: 19.98% (999 single-page bounces from Home Page)
- **Conversion Rate**: 16.00% (800 confirmed buyers, ₹3.47 Cr total revenue, AOV ₹43,403)
- **Most Visited Page**: Home Page (5,000 visits, 100%), followed by Shop Page (2,168)
- **Top Exit Pages**: Home Page (999 bounces), Checkout Page (890 abandoned checkouts)
- **Top Clicked Button**: `Category Filter: Audio` (715 clicks), followed by `Track Order` (527 clicks)
- **Top Search Queries**: Cinema Camera (145), ANC Earbuds (143), Smart Lamp (136), GaN Charger (133)
- **Highest Engagement Cohort**: `New User Registered` (Avg 92.3 / 100 Engagement Score)
- **Best Performing Browser**: `Brave` (18.23% conversion rate, 292s avg duration), followed by `Firefox` (17.48%) and `Chrome` (15.91%, 2,917 sessions)
- **Most Common Journey**: `Home Page → Shop Page → New Arrivals Page` (287 sessions)
- **Geographic Metros**: Mumbai (545), Bengaluru (348), New Delhi (296), Pune (196), Hyderabad (193), Ahmedabad (103), Chennai (91), Kolkata (82)

---

## ⚙️ Google Apps Script Integration (`Code.gs`)

1. Open your Google Spreadsheet.
2. Go to **Extensions** $\to$ **Apps Script**.
3. Paste the contents of `Code.gs` and update `SPREADSHEET_ID`.
4. Deploy as **Web App** (Access: *Anyone*).
5. Copy the Web App URL and set `ANALYTICS_URL` in `app.js`.
