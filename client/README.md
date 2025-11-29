# AAA Service - React Client

This folder contains a minimal Vite + React client scaffold for the AAA_Service_APP.

Quick start (PowerShell):

```powershell
cd 'c:\Thesis\AAA_Service_APP\client'
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173) and navigate the app.

Notes:
- The React app imports the project's `style.css` to preserve existing styles.
- Orders placed on the Delivery page are stored in `localStorage` under the `orders` key and displayed on the Account page.
- This is a minimal migration scaffold (hash-based routing). If you want full React Router or server-side APIs, I can add them next.
