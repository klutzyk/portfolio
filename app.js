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
  featuredRepos: []
};

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setRepoStatus(message, tone = "muted") {
  const element = document.getElementById("repoStatus");
  if (!element) return;
  element.textContent = message;
  element.dataset.tone = tone;
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
      <p class="experience-title">${escapeHTML(entry.role)}</p>
      <span class="experience-period">${escapeHTML(entry.period)}</span>
      <p>${escapeHTML(entry.details)}</p>
    `;
    wrap.appendChild(article);
  });
}

function repoCardMarkup(repo) {
  const topics = (repo.topics || []).slice(0, 3);
  const name = escapeHTML(repo.name || "Repository");
  const description = escapeHTML(repo.description || "No description available yet.");
  const url = escapeHTML(repo.url || "#");
  const language = escapeHTML(repo.language || "Code");
  const stars = typeof repo.stars === "number" ? `* ${repo.stars}` : "";

  return `
    <article class="repo-card">
      <h3><a href="${url}" target="_blank" rel="noreferrer">${name}</a></h3>
      <p>${description}</p>
      <div class="repo-meta">
        <span>${language}</span>
        <span>${stars}</span>
      </div>
      <div class="repo-topics">
        ${topics.length ? topics.map((topic) => `<span>${escapeHTML(topic)}</span>`).join("") : "<span>github</span>"}
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

function mapFeaturedRepos() {
  return (portfolio.featuredRepos || [])
    .filter((repo) => repo && repo.name && repo.url)
    .map((repo) => ({
      name: repo.name,
      description: repo.description || "Selected project.",
      url: repo.url,
      language: repo.language || "Project",
      stars: typeof repo.stars === "number" ? repo.stars : null,
      topics: Array.isArray(repo.topics) ? repo.topics : []
    }));
}

function profileFallbackRepos(username) {
  return [
    {
      name: "GitHub Repository Collection",
      description: "Browse all current projects directly on GitHub.",
      url: `https://github.com/${username}?tab=repositories`,
      language: "GitHub",
      stars: null,
      topics: ["live profile"]
    }
  ];
}

async function fetchRepoList(username) {
  const endpoint = `https://api.github.com/users/${username}/repos?type=all&sort=updated&per_page=100`;
  const response = await fetch(endpoint, { cache: "no-store" });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("GitHub API rate limit reached");
    }
    if (response.status === 404) {
      throw new Error("GitHub profile not found");
    }
    throw new Error(`GitHub API returned ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Unexpected GitHub API response");
  }

  return data;
}

async function loadGitHubRepos() {
  const username = sanitizeGitHubUsername(portfolio.githubUsername);
  const featured = mapFeaturedRepos();

  if (!username) {
    renderRepos(featured);
    setRepoStatus("Add your GitHub username in app.js to load repositories.", "error");
    return;
  }

  setRepoStatus("Loading latest repositories from GitHub...");

  try {
    const data = await fetchRepoList(username);
    const repos = data
      .filter((repo) => repo && repo.html_url)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        topics: repo.topics || []
      }));

    if (repos.length > 0) {
      renderRepos(repos);
      setRepoStatus(`Showing live repositories from @${username}.`);
      return;
    }

    const fallback = featured.length > 0 ? featured : profileFallbackRepos(username);
    renderRepos(fallback);
    setRepoStatus(
      `No public repositories found for @${username}. If your projects are private, they will not appear in this feed.`,
      "error"
    );
  } catch (error) {
    const fallback = featured.length > 0 ? featured : profileFallbackRepos(username);
    renderRepos(fallback);
    setRepoStatus(`Live repository feed unavailable (${error.message}). Showing GitHub profile link instead.`, "error");
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
