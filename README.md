# Data Science & AI Portfolio Website

Minimal, responsive portfolio website designed to showcase GitHub projects, skills, and experience for data science / AI roles.

## Files

- `index.html`: Page structure
- `styles.css`: Visual design and responsive layout
- `app.js`: Portfolio content + GitHub repo loading logic

## Customize (Required)

Open `app.js` and update the `portfolio` object:

- `name`
- `githubUsername`
- `linkedinUrl`
- `email`
- `resumeUrl`
- `about`, `skills`, and `experience`

If `githubUsername` is valid, the site auto-loads your top non-fork repos from GitHub.  
If not, it shows `fallbackProjects` from `app.js`.

## Run locally

This is a static site. Open `index.html` directly, or run a local server:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Create and push to GitHub

```powershell
git init
git add .
git commit -m "Initial portfolio website"
gh repo create <repo-name> --public --source=. --remote=origin --push
```

Alternative without GitHub CLI:

1. Create an empty repo on GitHub.
2. Copy the remote URL.
3. Run:

```powershell
git remote add origin <repo-url>
git branch -M main
git push -u origin main
```

## Deploy with GitHub Pages

1. Push the repo to GitHub.
2. In GitHub repo settings, open **Pages**.
3. Set source to **Deploy from a branch**.
4. Select `main` branch and `/ (root)`.
5. Save and wait for the deployment URL.
