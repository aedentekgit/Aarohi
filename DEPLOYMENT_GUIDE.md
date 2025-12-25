# Deployment Guide: Aarohi Exports

This guide covers deploying the **Backend to Render** and the **Frontend to Hostinger**.

## Prerequisites
1.  **GitHub Account**: You must push your project code (the entire `Aarohi - Copy (3)` folder content) to a new GitHub repository.
2.  **Render Account**: Sign up at [render.com](https://render.com).
3.  **Hostinger Account**: Access to your hosting control panel (File Manager).

---

## Part 1: Backend Deployment (Render)

1.  **Push to GitHub**: Ensure your project is pushed to a GitHub repository.
2.  **Create New Web Service**:
    *   Log in to Render dashboard.
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub repository.
3.  **Configure Service**:
    *   **Name**: Choose a name (e.g., `aarohi-backend`).
    *   **Root Directory**: `backend` (Important! This tells Render to look inside the backend folder).
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
    *   **Instance Type**: Free (or whichever you prefer).
4.  **Environment Variables**:
    *   Scroll down to "Environment Variables".
    *   Add the variables from your local `backend/.env` file:
        *   `DB_HOST` (Your remote MySQL database host - e.g. from Hostinger/AWS/CleverCloud)
        *   `DB_USER`
        *   `DB_PASS`
        *   `DB_NAME`
        *   `JWT_SECRET`
        *   `PORT` (Optional, Render usually sets this automatically to 10000, code should use `process.env.PORT`)
5.  **Deploy**: Click **Create Web Service**. Wait for the build to finish.
6.  **Copy URL**: Once deployed, copy your backend URL (e.g., `https://aarohi-backend.onrender.com`).

---

## Part 2: Frontend Deployment (Hostinger)

1.  **Update Configuration**:
    *   Open `frontend/.env.production` in your local project.
    *   Update `VITE_API_BASE_URL` with your **Render Backend URL** copied in the previous step.
        *   Example: `VITE_API_BASE_URL=https://aarohi-backend.onrender.com`
2.  **Build the Project**:
    *   Open your terminal in the `frontend` folder.
    *   Run the build command:
        ```bash
        npm run build
        ```
    *   This will create a `dist` folder in `frontend/` containing your optimized website.
3.  **Upload to Hostinger**:
    *   Log in to your Hostinger Control Panel (hPanel).
    *   Go to **File Manager**.
    *   Navigate to `public_html`.
    *   Delete any default files if this is a fresh site.
    *   **Upload** all files/folders *inside* the local `frontend/dist/` folder to `public_html`.
        *   You should see `index.html`, `assets/`, etc., directly in `public_html`.
4.  **Verify .htaccess**:
    *   Ensure the `.htaccess` file (which we automatically added to `public` and was copied to `dist`) is present in `public_html`. This ensures page refreshing works correctly.

---

## Part 3: MySQL Database
*   Since Render Web Services don't include a database on the free tier (they check out after 90 days usually or are separate), you likely need an external database.
*   **Hostinger MySQL**: If you have Hostinger, create a MySQL database there.
    *   Go to **Databases** -> **MySQL Databases** in Hostinger.
    *   Create a new database and user.
    *   **Enable Remote Access**: Go to "Remote MySQL", add Render's IP address (or `%` to allow all IPs, though less secure).
    *   Use these credentials in your Render Environment Variables (`DB_HOST`, etc).

## Troubleshooting
*   **404 on Refresh**: Check if `.htaccess` is in `public_html`.
*   **API Errors**: Check the Console (F12) in browser. If you see CORS errors, ensure your Backend allows the Hostinger domain in its CORS configuration.
    *   Update `backend/src/server.js` or `app.js` CORS settings to allow your Hostinger domain.
