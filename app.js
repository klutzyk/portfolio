const portfolio = {
  name: "Kulunu Abeysinghe",
  role: "Budding Data Scientist & AI Engineer",
  location: "United States",
  about:
    "I focus on practical data science and AI systems that turn messy data into reliable decisions, from experimentation to deployment.",
  githubUsername: "kalz9",
  linkedinUrl: "",
  email: "kabe0009@student.monash.edu",
  resumeUrl: "",
  skills: [
    "Python",
    "SQL",
    "Pandas",
    "Scikit-learn",
    "PyTorch",
    "TensorFlow",
    "MLOps",
    "Data Visualization",
    "Prompt Engineering",
    "Git & GitHub",
  ],
  experience: [
    {
      role: "AI/ML Project Builder",
      period: "2024 - Present",
      details:
        "Building personal and collaborative machine learning projects, with focus on model quality, reproducibility, and practical impact.",
    },
    {
      role: "Data Science Learner",
      period: "2023 - Present",
      details:
        "Studying core statistics, model evaluation, and engineering fundamentals while shipping portfolio-ready case studies.",
    },
  ],
  fallbackProjects: [
    {
      name: "Customer-Churn-Classifier",
      description:
        "End-to-end churn prediction workflow with feature engineering, model comparison, and explainability.",
      url: "https://github.com/your-github-username/customer-churn-classifier",
      language: "Python",
      stars: 0,
      topics: ["classification", "xgboost", "mlops"],
    },
    {
      name: "NLP-Sentiment-Pipeline",
      description:
        "Sentiment analysis project for social media text with data cleaning, embeddings, and performance monitoring.",
      url: "https://github.com/your-github-username/nlp-sentiment-pipeline",
      language: "Python",
      stars: 0,
      topics: ["nlp", "transformers", "analytics"],
    },
    {
      name: "Data-Science-Portfolio",
      description:
        "Collection of case studies and notebooks covering EDA, modeling, and deployment-ready experiments.",
      url: "https://github.com/your-github-username/data-science-portfolio",
      language: "Jupyter Notebook",
      stars: 0,
      topics: ["eda", "ml", "visualization"],
    },
  ],
};

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setLink(id, href, fallback = "#") {
  const element = document.getElementById(id);
  if (!element) return;
  element.href = href || fallback;
  if (!href) {
    element.setAttribute("aria-disabled", "true");
  }
}

function renderSkills() {
  const list = document.getElementById("skillsList");
  if (!list) return;

  list.innerHTML = "";
  portfolio.skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill;
    list.appendChild(item);
  });
}

function renderExperience() {
  const wrap = document.getElementById("experienceList");
  if (!wrap) return;
  wrap.innerHTML = "";

  portfolio.experience.forEach((entry) => {
    const article = document.createElement("article");
    article.className = "experience-item";
    article.innerHTML = `
      <p class="experience-title">${entry.role}</p>
      <span class="experience-period">${entry.period}</span>
      <p>${entry.details}</p>
    `;
    wrap.appendChild(article);
  });
}

function repoCardMarkup(repo) {
  const topics = (repo.topics || []).slice(0, 3);
  return `
    <article class="repo-card">
      <h3><a href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a></h3>
      <p>${repo.description || "No description available yet."}</p>
      <div class="repo-meta">
        <span>${repo.language || "Code"}</span>
        <span>★ ${repo.stars ?? 0}</span>
      </div>
      <div class="repo-topics">
        ${topics.map((topic) => `<span>${topic}</span>`).join("")}
      </div>
    </article>
  `;
}

function renderRepos(repos) {
  const repoGrid = document.getElementById("repoGrid");
  if (!repoGrid) return;
  repoGrid.innerHTML = repos.map(repoCardMarkup).join("");
}

function sanitizeGitHubUsername(username) {
  return username && username !== "your-github-username" ? username.trim() : "";
}

async function loadGitHubRepos() {
  const username = sanitizeGitHubUsername(portfolio.githubUsername);
  if (!username) {
    renderRepos(portfolio.fallbackProjects);
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!response.ok) throw new Error("Could not fetch repositories");
    const data = await response.json();

    const repos = data
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        topics: repo.topics || [],
      }));

    renderRepos(repos.length ? repos : portfolio.fallbackProjects);
  } catch (_error) {
    renderRepos(portfolio.fallbackProjects);
  }
}

function boot() {
  const headline = `${portfolio.role} building practical, high-impact ML solutions.`;

  setText("brandName", portfolio.name);
  setText("heroName", portfolio.name);
  setText("heroTagline", headline);
  setText("aboutText", portfolio.about);
  setText("locationText", portfolio.location);
  setText("footerName", portfolio.name);

  setLink(
    "githubButton",
    `https://github.com/${sanitizeGitHubUsername(portfolio.githubUsername)}`
  );
  setLink(
    "repoProfileLink",
    `https://github.com/${sanitizeGitHubUsername(portfolio.githubUsername)}?tab=repositories`
  );
  setLink("linkedinLink", portfolio.linkedinUrl);
  setLink("resumeButton", portfolio.resumeUrl);

  const emailLink = document.getElementById("emailLink");
  if (emailLink) {
    emailLink.href = `mailto:${portfolio.email}`;
  }

  renderSkills();
  renderExperience();
  loadGitHubRepos();

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

boot();
