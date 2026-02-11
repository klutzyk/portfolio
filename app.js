const portfolio = {
  name: "Kulunu Abeysinghe",
  role: "Data Scientist and AI Engineer",
  location: "Melbourne, Australia",
  about:
    "I build production-minded data and AI solutions that connect rigorous experimentation with real-world deployment, focusing on measurable outcomes, reproducible workflows, and clean engineering practices.",
  githubUsername: "klutzyk",
  linkedinUrl: "https://www.linkedin.com/in/kulunuabeysinghe/",
  email: "kabe0009@student.monash.edu",
  resumeUrl: "",
  specialties: "Machine Learning, NLP, Analytics, MLOps",
  status: "Open to graduate and entry-level DS/AI roles",
  skills: [
    "Python",
    "SQL",
    "R",
    "NumPy",
    "Pandas",
    "Polars",
    "Scikit-learn",
    "PyTorch",
    "TensorFlow",
    "LangChain",
    "OpenAI APIs",
    "Docker",
    "FastAPI",
    "Power BI",
    "Tableau",
    "MLOps",
    "Data Visualization",
    "Prompt Engineering and Evaluation",
    "Git and GitHub"
  ],
  experience: [
    {
      role: "AI and ML Project Builder",
      period: "2024 - Present",
      details:
        "Designing and shipping end-to-end projects that move from exploratory analysis to model serving, with emphasis on reproducibility, evaluation quality, and maintainable code."
    },
    {
      role: "Data Science and AI Practitioner",
      period: "2023 - Present",
      details:
        "Building a strong applied foundation across statistics, machine learning, NLP, and LLM workflows while turning learning into public GitHub deliverables."
    },
    {
      role: "Collaborative Problem Solver",
      period: "Ongoing",
      details:
        "Experienced with version-controlled teamwork, structured experimentation, and communicating technical findings clearly for both technical and non-technical audiences."
    }
  ],
  fallbackProjects: [
    {
      name: "Customer-Churn-Classifier",
      description:
        "End-to-end churn prediction workflow with feature engineering, model comparison, and explainability.",
      url: "https://github.com/klutzyk/customer-churn-classifier",
      language: "Python",
      stars: 0,
      topics: ["classification", "xgboost", "mlops"]
    },
    {
      name: "NLP-Sentiment-Pipeline",
      description:
        "Sentiment analysis project for social media text with data cleaning, embeddings, and performance monitoring.",
      url: "https://github.com/klutzyk/nlp-sentiment-pipeline",
      language: "Python",
      stars: 0,
      topics: ["nlp", "transformers", "analytics"]
    },
    {
      name: "Data-Science-Portfolio",
      description:
        "Collection of case studies and notebooks covering EDA, modeling, and deployment-ready experiments.",
      url: "https://github.com/klutzyk/data-science-portfolio",
      language: "Jupyter Notebook",
      stars: 0,
      topics: ["eda", "ml", "visualization"]
    }
  ]
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

  if (href) {
    element.href = href;
    element.classList.remove("is-disabled");
    element.removeAttribute("aria-disabled");
    return;
  }

  element.href = fallback;
  element.classList.add("is-disabled");
  element.setAttribute("aria-disabled", "true");
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
        <span>* ${repo.stars ?? 0}</span>
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
        topics: repo.topics || []
      }));

    renderRepos(repos.length ? repos : portfolio.fallbackProjects);
  } catch (_error) {
    renderRepos(portfolio.fallbackProjects);
  }
}

function boot() {
  const headline = `${portfolio.role} focused on building practical, high-impact machine learning systems.`;

  setText("brandName", portfolio.name);
  setText("heroName", portfolio.name);
  setText("heroTagline", headline);
  setText("aboutText", portfolio.about);
  setText("locationText", portfolio.location);
  setText("specialtiesText", portfolio.specialties);
  setText("statusText", portfolio.status);
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
  setLink("resumeButton", portfolio.resumeUrl, "#work");

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
