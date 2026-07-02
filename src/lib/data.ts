import type { Project, ExperienceItem } from "@/types/project";

export const PROJECTS: Project[] = [
  {
    key: "smartclinical",
    title: "Smart Clinical",
    award: "🥈 2nd Place · UC Berkeley Datathon for Social Good",
    stack: ["Python", "Streamlit", "JavaScript", "HTML", "Tableau", "Random Forest", "Decision Trees", "API Integration"],
    github: "https://github.com/anikabhutani/datathon2025",
    overview:
      "Hospitals facing critical shortages of oxygen, nurses, and monitors must decide who receives care first — a decision with life-or-death consequences and serious equity risks. SmartClinical is a fairness-aware clinical decision-support tool that predicts patient risk level (Normal/Low/Medium/High) from vitals using a Random Forest classifier, then automatically allocates limited resources via five configurable optimization policies to reduce mortality equitably.",
    details: [
      "Trained a Random Forest classifier on patient vital signs (respiratory rate, oxygen saturation, systolic BP, heart rate, temperature, consciousness, O2 scale) achieving 95% accuracy on held-out validation data with an 80/20 stratified split.",
      "Used One-Hot Encoding for categorical features and engineered a composite 'Oxygen Need' feature based on respiratory rate and oxygen saturation thresholds to improve model performance.",
      "Built five resource allocation policies — First-Come-First-Serve, High-Risk, Oxygen-First, High-Risk & Oxygen combined, and a Fairness-based clustering approach — so hospitals can choose the tradeoff between clinical urgency and equitable distribution.",
      "FastAPI backend exposes /predict and /allocate endpoints; Streamlit frontend supports CSV batch upload or manual entry, with live allocation results rendered in a dashboard showing per-patient risk scores, oxygen/staff assignments, and resource utilization summaries.",
      "Placed 2nd out of all competing teams; judges highlighted the fairness-aware design and the multi-policy simulation framework as standout contributions for real-world clinical applicability.",
    ],
    image: "/assets/smart_clinical_img.png",
    imageAlt: "Smart Clinical app screenshot",
    snippet: `clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)
print(f"Val accuracy: {clf.score(X_val, y_val):.3f}")
# → Val accuracy: 0.950`,
  },
  {
    key: "acoustic",
    title: "Kinkade Theater Acoustic Model",
    award: null,
    stack: ["Python", "SciPy", "FDTD", "Differential Evolution", "Physics Simulation"],
    github: "https://github.com/anikabhutani/acousticdiffusionmodeling",
    overview:
      "TODO: Describe the motivation — why model theater acoustics computationally? What was the Kinkade, and what acoustic problem needed solving?",
    details: [
      "TODO: e.g. \"Discretized a 3D theater geometry into a uniform grid; applied FDTD update equations at each time step\"",
      "TODO: e.g. \"Optimized 20 diffuser positions using SciPy's differential evolution; objective = minimizing sound pressure variance across audience seats\"",
      "TODO: e.g. \"Reduced simulated pressure variance by X% compared to the baseline (no diffusers) configuration\"",
    ],
    image: null,
    imageAlt: "Theater acoustic simulation visualization",
    snippet: null,
  },
  {
    key: "energy",
    title: "Energy Equity Model",
    award: null,
    stack: ["Python", "Pandas", "Scikit-Learn", "Decision Trees", "Regression", "Web Scraping"],
    github: "https://github.com/anikabhutani/energyequity",
    overview:
      "TODO: Describe the equity angle — which communities were underserved, and what datasets did you combine to quantify solar potential?",
    details: [
      "TODO: e.g. \"Scraped Census demographic data, EIA irradiance datasets, and county-level economic indicators; merged on FIPS codes\"",
      "TODO: e.g. \"Engineered 15+ features including poverty rate, rooftop area proxy, and seasonal irradiance variability\"",
      "TODO: e.g. \"Regression model achieved R² = 0.92 on held-out counties; flagged 40+ high-potential / low-adoption regions\"",
    ],
    image: null,
    imageAlt: "Energy equity model map",
    snippet: null,
  },
  {
    key: "justice",
    title: "Justice Junction",
    award: "🥈 2nd/600 · Western Digital Hackathon",
    stack: ["Java", "CSS", "Full-Stack", "Real-Time Data"],
    github: null,
    overview:
      "TODO: Describe the social issue this addressed and what the app actually showed users.",
    details: [
      "TODO: e.g. \"Built a Java servlet back-end that polls three public APIs; front-end renders live feeds without page reload\"",
      "TODO: e.g. \"Designed a card-based UI in vanilla CSS that adapts to mobile; keyboard-accessible throughout\"",
      "TODO: e.g. \"Placed 2nd out of 600 teams; judges highlighted the data freshness and actionability of the UI\"",
    ],
    image: null,
    imageAlt: "Justice Junction screenshot",
    snippet: null,
  },
  {
    key: "pneumonia",
    title: "Pneumonia Detection",
    award: null,
    stack: ["Python", "Scikit-Learn", "TensorFlow / Keras", "CNN", "KNN", "Image Processing"],
    github: null,
    overview:
      "TODO: Describe the dataset (Kaggle chest X-ray?), your motivation, and the two-model comparison approach you took.",
    details: [
      "TODO: e.g. \"Preprocessed 5,863 chest X-rays: resized to 128×128, normalized pixel values, horizontal flip augmentation\"",
      "TODO: e.g. \"KNN baseline achieved 74% accuracy; custom 4-layer CNN with batch norm reached 86% on the held-out test set\"",
      "TODO: e.g. \"Applied Grad-CAM to visualize regions the CNN attended to — confirmed alignment with radiologist annotations\"",
    ],
    image: null,
    imageAlt: "Pneumonia detection model results",
    snippet: null,
  },
  {
    key: "teentask",
    title: "TeenTaskForce",
    award: "🥉 3rd/100 · BYU PitchFest ($1,000)",
    stack: ["Figma", "UI/UX", "Business Strategy", "Pitch"],
    github: null,
    overview:
      "TODO: Describe the marketplace concept and what gap in the market you identified.",
    details: [
      "TODO: e.g. \"Designed 30+ Figma screens covering onboarding, task posting, matching, and payment flows; prototype was fully interactive\"",
      "TODO: e.g. \"Built a tiered subscription revenue model and validated willingness-to-pay through 20+ parent interviews\"",
      "TODO: e.g. \"Placed 3rd/100 at BYU PitchFest ($1K) and 1st/8 at Coder Central Incubator ($500)\"",
    ],
    image: null,
    imageAlt: "TeenTaskForce Figma prototype",
    snippet: null,
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    date: "Feb 2026 – Present",
    badge: "CONTRACT",
    role: "Software Engineer",
    company: "Luel AI · Berkeley, CA",
    description:
      "Built an end-to-end PDF signing flow covering upload, preview, signature embedding via pdf-lib, and download, with robust validation and error handling. Proposed an AI-based duplicate and invalid submission detection system for the training data pipeline and delivered an SWE consulting plan for data screening.",
    achievements: [
      "Shipped the full upload → preview → sign → download flow end to end",
      "Proposed an AI duplicate/invalid-submission detector for the training pipeline",
      "Delivered a data-screening consulting plan alongside the engineering work",
    ],
    tech: ["React", "Next.js", "pdf-lib"],
  },
  {
    date: "Jan 2026 – Present",
    badge: "INTERNSHIP",
    role: "AI/ML Engineer Intern",
    company: "Outsampler · Remote",
    description:
      "Implemented reinforcement learning for the Qwen2.5-Coder-3B model using Group Relative Policy Optimization (GRPO) on the BIRD-SQL dataset. Used custom reward functions and policy updates to optimize SQL generation accuracy and enforce strict format compliance.",
    achievements: [
      "Raised BIRD-SQL accuracy from 47% to 81% via GRPO fine-tuning",
      "Designed custom reward functions enforcing strict SQL format compliance",
      "Ran training on a GCP/CUDA pipeline with iterative policy updates",
    ],
    tech: ["Python", "PyTorch", "GCP", "CUDA", "RL / GRPO"],
  },
  {
    date: "Jun – Aug 2025",
    badge: "INTERNSHIP",
    role: "Data Science Intern (Consulting)",
    company: "PharmaACE · Remote",
    description:
      "Developed a cancer risk prediction model using Random Forests, achieving 95% accuracy. Engineered a physician referral network from patient-level data using graph-based relationship modeling to analyze connectivity patterns.",
    achievements: [
      "Built a Random Forest cancer-risk model at 95% accuracy",
      "Engineered a physician referral graph from patient-level data",
      "Analyzed network connectivity patterns to surface referral insights",
    ],
    tech: ["Python", "Scikit-Learn", "Pandas", "Random Forest", "Graph Modeling"],
  },
  {
    date: "May – Oct 2024",
    badge: "RESEARCH",
    role: "Data Science Research Intern",
    company: "Stanford University · Palo Alto, CA",
    description:
      "Led a spatial transcriptomics pilot and built end-to-end analysis pipelines in Python and R to analyze high-dimensional gene expression data. Automated fully manual microscopic image analysis by developing custom Java macros, reducing per-image processing time by ~83%.",
    achievements: [
      "Led a spatial transcriptomics pilot end to end",
      "Built Python/R pipelines for high-dimensional gene expression analysis",
      "Cut per-image processing time ~83% with custom Java macros",
    ],
    tech: ["Python", "R", "SQL", "Java", "Spatial Transcriptomics"],
  },
];

export const SKILL_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["Python", "Java", "SQL", "JavaScript", "HTML / CSS", "Scheme"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React", "Next.js", "Pandas", "Scikit-Learn", "PyTorch", "Streamlit"],
  },
  {
    title: "Tools & Platforms",
    items: ["Git / GitHub", "GCP", "CUDA", "Jupyter Notebook", "Tableau", "Figma"],
  },
  {
    title: "Concepts",
    items: ["Random Forest", "RL / GRPO", "CNN", "Full-Stack", "Decision Trees", "Web Scraping"],
  },
];

// Fallback reading list, used when Supabase is unreachable or empty.
export const FALLBACK_READING = [
  {
    id: "fallback-1",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    cover_url: null,
    progress_pct: 40,
    takeaway: "Replication and partitioning trade-offs are the same trade-off wearing different clothes.",
  },
];
