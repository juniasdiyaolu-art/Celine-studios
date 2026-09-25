# Deploying Celine Studio to GitHub & Live Hosting

This guide walks you through publishing your codebase to **GitHub** and deploying it for free via **GitHub Pages** (or full-stack on **Vercel/Render**).

---

## Method 1: Deploy with GitHub Pages (Recommended, Free & Automated)

A ready-to-use GitHub Actions workflow has already been configured at `.github/workflows/deploy.yml`. When you push to GitHub, it will automatically build and publish your site!

### Step 1: Create a New Repository on GitHub
1. Log in to [GitHub](https://github.com).
2. Click the **+** (plus icon) in the top-right corner and select **New repository**.
3. Repository name: e.g. `celine-studio` (or whatever you prefer).
4. Choose **Public** (required for free GitHub Pages).
5. **Do not** check "Initialize with a README" or add `.gitignore` (these already exist in your project).
6. Click **Create repository**.
7. Copy the repository URL (e.g. `https://github.com/YOUR-USERNAME/celine-studio.git`).

---

### Step 2: Initialize Git and Push Your Code

Open your terminal or command prompt in your project root directory and run:

```bash
# 1. Initialize a new local Git repository
git init

# 2. Stage all project files
git add .

# 3. Commit your files
git commit -m "Initial commit: Celine Studio luxury fashion platform"

# 4. Set the default branch to main
git branch -M main

# 5. Link your local project to your GitHub repository
# (Replace with your actual GitHub repository URL)
git remote add origin https://github.com/YOUR-USERNAME/celine-studio.git

# 6. Push your code to GitHub
git push -u origin main
```

> **Tip:** If prompted for GitHub authentication, use your GitHub username and a [Personal Access Token](https://github.com/settings/tokens) (or SSH key).

---

### Step 3: Enable GitHub Pages in Repository Settings
1. Go to your repository on GitHub.
2. Click the **Settings** tab (gear icon at the top).
3. In the left navigation menu, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** > **Source**, click the dropdown and select:
   👉 **GitHub Actions**
5. That's it! GitHub will automatically trigger the included workflow (`.github/workflows/deploy.yml`).
6. Click the **Actions** tab on your GitHub repository to watch the progress (takes ~1 minute).
7. Once finished, your live website link will be displayed in the Actions run and in **Settings > Pages**:
   `https://YOUR-USERNAME.github.io/celine-studio/`

---

## Method 2: Deploying Full-Stack (with Live Node Server & Gemini AI)

If you want the Node.js Express server (`server.ts`) and Gemini API AI concierge backend to run on a live server:

### Deploying to Vercel (Free & Instant)
1. Go to [Vercel](https://vercel.com) and sign in with GitHub.
2. Click **Add New Project** and import your `celine-studio` repository.
3. Framework Preset: **Vite**.
4. (Optional) Add your `GEMINI_API_KEY` under **Environment Variables**.
5. Click **Deploy**.

### Deploying to Render (Free Node.js Hosting)
1. Go to [Render](https://render.com) and sign in with GitHub.
2. Click **New +** > **Web Service**.
3. Select your `celine-studio` GitHub repository.
4. Set:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
5. (Optional) Add `GEMINI_API_KEY` under Environment Variables.
6. Click **Deploy Web Service**.

---

## Verification & Build Commands

To test your build locally before pushing:

```bash
# Test static client build (used by GitHub Pages)
npm run build:client

# Preview local static production build
npm run preview

# Test full-stack client + server build
npm run build
```
