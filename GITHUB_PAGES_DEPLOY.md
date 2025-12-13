# Deploying Your Portfolio to GitHub Pages

1. **Create a GitHub Repository**
   - Go to https://github.com and create a new public repository (e.g., `portfolio`).

2. **Initialize Git Locally (if not already)**
   - Open a terminal in your project folder and run:
     ```sh
     git init
     git remote add origin https://github.com/your-username/portfolio.git
     ```

3. **Add and Commit Your Files**
   - Run:
     ```sh
     git add .
     git commit -m "Initial commit"
     git push -u origin master
     ```

4. **Enable GitHub Pages**
   - On GitHub, go to your repository settings.
   - Scroll to the "Pages" section.
   - Set the source branch to `master` (or `main`) and the folder to `/root`.
   - Save. Your site will be published at `https://your-username.github.io/portfolio/`.

5. **Access Your Website**
   - Visit the published URL to see your portfolio live.

---

## Tips
- Make sure your main HTML file is named `index.html` for automatic loading. You can rename `portfolio-prototype.html` to `index.html` if you want it to be the landing page.
- For updates, just commit and push changes to GitHub.
