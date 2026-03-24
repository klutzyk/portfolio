const portfolio = {
  name: "Kulunu Abeysinghe",
  role: "Data Scientist and AI Engineer",
  heroRole: "Data Scientist | AI Engineer | Building Applied AI Systems",
  location: "Melbourne, Australia",
  phone: "+61 0466458606",
  about:
    "I like building AI and data products that are genuinely fun to use, especially projects with interactive flows, game-like thinking, and clear real-world outcomes.",
  aboutExtra:
    "I care about shipping things people actually enjoy, not just notebooks and demos. My focus is practical machine learning, clean APIs, and data systems that hold up in production.",
  contactIntro:
    "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you.",
  githubUsername: "klutzyk",
  linkedinUrl: "https://www.linkedin.com/in/kulunuabeysinghe/",
  email: "kulunuavinash@gmail.com",
  status: "Open to graduate and entry-level DS/AI roles",
  aboutStats: [
    { value: "3+", label: "Years Building AI and Data Projects" },
    { value: "10+", label: "Projects and Experiments" },
    { value: "Always", label: "Curiosity for Learning" }
  ],
  skillGroups: [
    {
      category: "Data Science",
      items: ["Python", "R", "Pandas", "Scikit-learn", "Statistical Modeling", "Data Visualization"]
    },
    {
      category: "AI and LLM",
      items: ["NLP", "Machine Learning", "Deep Learning", "LLM Evaluation", "PyTorch", "TensorFlow"]
    },
    {
      category: "Cloud and MLOps",
      items: ["AWS", "Azure", "Docker", "Git", "CI/CD", "FastAPI"]
    },
    {
      category: "Database Systems",
      items: ["PostgreSQL", "SQL Server", "Oracle", "AWS RDS", "MongoDB", "Vector Databases"]
    },
    {
      category: "Full Stack Development",
      items: ["TypeScript", "Node.js", "React", "Vue.js", "Django APIs", "Data Migrations"]
    }
  ],
  featuredRepos: [
    {
      name: "Gamblr",
      description:
        "End-to-end NBA player prop analysis and prediction platform. Ingests NBA stats, schedules, lineups, and odds via daily cached/rate-limited pipelines, engineers advanced features, trains and retrains XGBoost models, and serves confidence-scored predictions through APIs. Supports NBA for now.",
      notice:
        "Live at gamblr.pro as an MVP. Currently on free-tier hosting, so response times can be slower.",
      url: "https://github.com/klutzyk/Gamblr",
      liveUrl: "https://gamblr.pro",
      topics: [
        "Python",
        "FastAPI",
        "React",
        "TypeScript",
        "PostgreSQL",
        "SQLAlchemy",
        "Pandas",
        "NumPy",
        "XGBoost",
        "Alembic",
        "NBA API",
        "The Odds API",
        "ML Retraining",
        "Time-Series Validation"
      ],
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=80"
    },
    {
      name: "AusRentals (WiP)",
      description:
        "Mobile iOS app for renting or lending vehicles, focused on the Australian market. Built with React Native and currently tested using Expo Go.",
      url: "https://github.com/klutzyk/AusRentals",
      liveUrl: "https://github.com/klutzyk/AusRentals",
      topics: ["React Native", "Expo Go", "iOS", "Mobile App", "Marketplace", "Australia"],
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80"
    },
    {
      name: "Data Insights Agent (WiP)",
      description:
        "A local, cost-free AI agent that analyzes a public dataset, answers natural-language questions, generates charts, and exports a report. Orchestrated with LangChain, with a CLI or lightweight Streamlit UI.",
      url: "https://github.com/klutzyk/data-insights-agent",
      liveUrl: "https://github.com/klutzyk/data-insights-agent",
      topics: ["NLP", "Agents", "LLM", "Data Analysis"],
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80"
    },
    {
      name: "RipOffRoo.live",
      description:
        "Final year platform helping seniors avoid online scams. Included open-data pipelines in R/Python, ML served via Django API, AWS RDS PostgreSQL security and migrations, Node.js/TypeScript MVC APIs, and Vue.js frontend with analytics dashboards.",
      url: "https://github.com/hassan-akbar/FIT5120/",
      liveUrl: "https://github.com/hassan-akbar/FIT5120/",
      topics: ["Python", "R", "Tableau", "AWS RDS", "Node.js", "Vue.js"],
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80"
    }
  ]
};

const projectImagePool = [
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80"
];

const repoOverrides = {
  portfolio: {
    summary: "Personal portfolio website showcasing AI and data science projects with a polished frontend.",
    tags: ["HTML", "CSS", "JavaScript"]
  }
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
  if (element) element.textContent = value;
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

function toTitleCase(text) {
  return text
    .replaceAll(/[-_]+/g, " ")
    .replaceAll(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function summarizeRepo(repo) {
  const override = repoOverrides[(repo.name || "").toLowerCase()];
  if (override?.summary) return override.summary;

  if (repo.description) {
    const description = repo.description.trim();
    return description.endsWith(".") ? description : `${description}.`;
  }

  const projectLabel = toTitleCase(repo.name || "Project");
  const language = repo.language || "software";
  return `${projectLabel} is a ${language} project focused on practical implementation and clean engineering.`;
}

function deriveRepoTags(repo) {
  const override = repoOverrides[(repo.name || "").toLowerCase()];
  if (override?.tags?.length) return override.tags.slice(0, 8);

  const tags = [];
  if (repo.language) tags.push(repo.language);
  if (Array.isArray(repo.topics)) {
    repo.topics.slice(0, 8).forEach((topic) => {
      if (topic && !tags.includes(topic)) tags.push(topic);
    });
  }

  if (tags.length === 0) tags.push("GitHub");
  return tags.slice(0, 8);
}

function renderAboutStats() {
  const wrap = document.getElementById("aboutStats");
  if (!wrap) return;

  wrap.innerHTML = portfolio.aboutStats
    .map(
      (item) => `
      <article class="stat-item">
        <strong>${escapeHTML(item.value)}</strong>
        <span>${escapeHTML(item.label)}</span>
      </article>
    `
    )
    .join("");
}

function renderSkillGroups() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  grid.innerHTML = portfolio.skillGroups
    .map(
      (group, index) => `
      <article class="skill-card reveal-item" style="--delay:${index * 90}ms">
        <h3>${escapeHTML(group.category)}</h3>
        <ul>
          ${group.items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
        </ul>
      </article>
    `
    )
    .join("");
}

function repoCardMarkup(repo, index) {
  const tags = deriveRepoTags(repo);
  const title = escapeHTML(repo.name || "Repository");
  const description = escapeHTML(summarizeRepo(repo));
  const notice = repo.notice ? escapeHTML(repo.notice) : "";
  const url = escapeHTML(repo.url || "#");
  const liveUrl = escapeHTML(repo.liveUrl || "");
  const hasLiveDemo = Boolean(repo.liveUrl && repo.liveUrl !== repo.url);
  const image = escapeHTML(repo.image || projectImagePool[index % projectImagePool.length]);

  return `
    <article class="repo-card reveal-item" style="--delay:${index * 90}ms">
      <img class="repo-banner" src="${image}" alt="${title} preview" loading="lazy" />
      <div class="repo-content">
        <h3><a href="${url}" target="_blank" rel="noreferrer">${title}</a></h3>
        <p>${description}</p>
        ${notice ? `<p class="repo-notice">${notice}</p>` : ""}
        <div class="repo-topics">
          ${tags.map((tag) => `<span>${escapeHTML(toTitleCase(tag))}</span>`).join("")}
        </div>
        <div class="repo-actions">
          <a class="repo-btn" href="${url}" target="_blank" rel="noreferrer">Code</a>
          ${
            hasLiveDemo
              ? `<a class="repo-btn primary" href="${liveUrl}" target="_blank" rel="noreferrer">Live Site</a>`
              : `<a class="repo-btn primary is-disabled" href="#" aria-disabled="true" tabindex="-1">Live Demo (Soon)</a>`
          }
        </div>
      </div>
    </article>
  `;
}

function renderRepos(repos) {
  const repoGrid = document.getElementById("repoGrid");
  if (!repoGrid) return;
  repoGrid.innerHTML = repos.map((repo, index) => repoCardMarkup(repo, index)).join("");
}

function mapFeaturedRepos() {
  return (portfolio.featuredRepos || [])
    .filter((repo) => repo && repo.name && repo.url)
    .map((repo) => ({
      name: repo.name,
      description: repo.description || "",
      url: repo.url,
      liveUrl: repo.liveUrl || repo.url,
      notice: repo.notice || "",
      language: repo.language || "",
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      image: repo.image || ""
    }));
}

function profileFallbackRepos(username) {
  return [
    {
      name: "GitHub Projects",
      description: "Browse all current projects directly on GitHub.",
      url: `https://github.com/${username}?tab=repositories`,
      liveUrl: `https://github.com/${username}?tab=repositories`,
      language: "GitHub",
      topics: ["profile"],
      image: projectImagePool[0]
    }
  ];
}

function loadSelectedRepos() {
  const featured = mapFeaturedRepos();
  if (featured.length > 0) {
    renderRepos(featured);
    // setRepoStatus("Selected featured projects.");
    return;
  }

  const username = portfolio.githubUsername?.trim();
  renderRepos(profileFallbackRepos(username || "klutzyk"));
  setRepoStatus("Featured list is empty. Showing GitHub profile instead.", "error");
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("contactName")?.value?.trim() || "";
    const email = document.getElementById("contactEmail")?.value?.trim() || "";
    const message = document.getElementById("contactMessage")?.value?.trim() || "";

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
  });
}

function initScrollAnimations() {
  const sections = document.querySelectorAll(".section-reveal");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function boot() {
  setText("heroName", portfolio.name);
  setText("heroRole", portfolio.heroRole || portfolio.role);
  setText("heroTagline", `${portfolio.role} who enjoys games, playful products, and practical AI that solves real problems.`);
  setText("aboutText", portfolio.about);
  setText("aboutExtra", portfolio.aboutExtra);
  setText("contactIntro", portfolio.contactIntro);
  setText("contactLocation", portfolio.location);
  setText("footerName", portfolio.name);

  const username = portfolio.githubUsername?.trim();
  setLink("repoProfileLink", username ? `https://github.com/${username}?tab=repositories` : "#");
  setLink("resumeButton", "#contact");
  setLink("linkedinLink", portfolio.linkedinUrl);
  setLink("linkedinIconLink", portfolio.linkedinUrl);
  setLink("githubIconLink", username ? `https://github.com/${username}` : "#");
  setLink("githubContactLink", username ? `https://github.com/${username}` : "#");

  const emailHref = `mailto:${portfolio.email}`;
  setLink("emailLink", emailHref);
  setLink("emailIconLink", emailHref);
  setText("emailLink", portfolio.email);
  setLink("phoneLink", `tel:${portfolio.phone.replace(/\s+/g, "")}`);
  setText("phoneLink", portfolio.phone);

  renderAboutStats();
  renderSkillGroups();
  loadSelectedRepos();
  setupContactForm();
  initScrollAnimations();

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

boot();
