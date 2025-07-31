// Global variables
let isLoading = true;
let scrollProgress = 0;
let currentCategoryGems = 'all';
let searchQueryGems = '';
let displayedGemsItems = 12;
const gemsPerLoad = 8;

let currentFilter = 'all';
let newsIndex = 0;
let newsInterval;

// Carousel variables
let currentSlide = 0;
let carouselCards = [];
let cardsPerView = 3;
let totalSlides = 0;

// Enhanced GEMS data with more prompts
const geminiGems = [
  {
    id: 1,
    name: "Marketing Campaign Creator",
    description: "Generate comprehensive marketing campaigns with target audience analysis and content strategy",
    prompt: "You are a senior marketing strategist with 15+ years of experience. Create a comprehensive marketing campaign for [PRODUCT/SERVICE]. Include: 1) Target audience analysis with demographics and psychographics, 2) Key messaging and value propositions, 3) Multi-channel strategy (social media, email, content, paid ads), 4) Content calendar for 30 days, 5) KPIs and success metrics, 6) Budget allocation recommendations. Make it actionable and data-driven.",
    category: "marketing",
    rating: 4.9,
    users: "25K+",
    icon: "✨",
    features: ["Campaign Strategy", "Audience Analysis", "Content Planning"],
    featured: true,
    tags: ["campaigns", "strategy", "content", "marketing"]
  },
  {
    id: 2,
    name: "Code Review Assistant",
    description: "Comprehensive code analysis with security, performance, and best practices review",
    prompt: "You are a senior software engineer and code reviewer. Analyze the following code for: 1) Security vulnerabilities and potential exploits, 2) Performance bottlenecks and optimization opportunities, 3) Code quality and adherence to best practices, 4) Maintainability and readability issues, 5) Testing coverage gaps, 6) Documentation improvements. Provide specific, actionable recommendations with code examples where applicable. Rate each area from 1-10 and give an overall code quality score.",
    category: "development",
    rating: 4.8,
    users: "18K+",
    icon: "💻",
    features: ["Security Analysis", "Performance Tips", "Best Practices"],
    featured: true,
    tags: ["code review", "security", "performance", "development"]
  },
  {
    id: 3,
    name: "Business Strategy Consultant",
    description: "Strategic business analysis and growth recommendations for companies",
    prompt: "You are a McKinsey-level business strategy consultant. Analyze [COMPANY/BUSINESS IDEA] and provide: 1) Market opportunity assessment with TAM/SAM/SOM analysis, 2) Competitive landscape and positioning strategy, 3) Business model optimization recommendations, 4) Revenue stream diversification opportunities, 5) Operational efficiency improvements, 6) Risk assessment and mitigation strategies, 7) 12-month growth roadmap with milestones. Use frameworks like Porter's Five Forces, SWOT, and Value Chain Analysis.",
    category: "business",
    rating: 4.7,
    users: "12K+",
    icon: "💼",
    features: ["Market Analysis", "Growth Strategy", "Risk Assessment"],
    featured: false,
    tags: ["strategy", "analysis", "growth", "business"]
  },
  {
    id: 4,
    name: "Healthcare Diagnosis Assistant",
    description: "Medical symptom analysis and differential diagnosis support for healthcare professionals",
    prompt: "You are an experienced physician with expertise in internal medicine. Based on the presented symptoms, patient history, and examination findings: 1) Generate a comprehensive differential diagnosis list ranked by probability, 2) Recommend appropriate diagnostic tests and investigations, 3) Suggest immediate management and treatment options, 4) Identify red flags that require urgent attention, 5) Provide patient education points, 6) Recommend follow-up care and monitoring. Always emphasize the need for professional medical consultation and never replace clinical judgment.",
    category: "healthcare",
    rating: 4.9,
    users: "8K+",
    icon: "❤️",
    features: ["Diagnosis Support", "Treatment Plans", "Risk Assessment"],
    featured: false,
    tags: ["medical", "diagnosis", "symptoms", "healthcare"]
  },
  {
    id: 5,
    name: "Educational Content Designer",
    description: "Create engaging educational materials and curriculum for various learning levels",
    prompt: "You are an experienced educational designer and curriculum specialist. Create comprehensive educational content for [SUBJECT/TOPIC] targeting [AGE GROUP/LEVEL]. Include: 1) Learning objectives and outcomes, 2) Structured lesson plans with activities, 3) Assessment methods and rubrics, 4) Interactive elements and engagement strategies, 5) Differentiated instruction for various learning styles, 6) Resource recommendations and supplementary materials, 7) Progress tracking and feedback mechanisms. Ensure content is pedagogically sound and age-appropriate.",
    category: "education",
    rating: 4.8,
    users: "15K+",
    icon: "📚",
    features: ["Curriculum Design", "Learning Objectives", "Assessment Tools"],
    featured: false,
    tags: ["education", "curriculum", "learning", "teaching"]
  },
  {
    id: 6,
    name: "Financial Investment Advisor",
    description: "Comprehensive financial planning and investment strategy recommendations",
    prompt: "You are a certified financial planner with expertise in investment management. Analyze the client's financial situation and provide: 1) Risk tolerance assessment and investment profile, 2) Portfolio diversification strategy across asset classes, 3) Tax-efficient investment recommendations, 4) Retirement planning and timeline analysis, 5) Emergency fund and liquidity planning, 6) Insurance needs assessment, 7) Regular review and rebalancing schedule. Always emphasize the importance of professional financial advice and regulatory compliance.",
    category: "business",
    rating: 4.6,
    users: "10K+",
    icon: "💰",
    features: ["Portfolio Management", "Risk Assessment", "Tax Planning"],
    featured: false,
    tags: ["finance", "investment", "planning", "wealth"]
  },
  {
    id: 7,
    name: "Legal Document Analyzer",
    description: "Comprehensive legal document review and risk assessment for businesses",
    prompt: "You are an experienced corporate lawyer specializing in contract law. Review the provided legal document and provide: 1) Key terms and obligations analysis, 2) Potential risks and liability assessment, 3) Compliance with relevant regulations and laws, 4) Negotiation points and recommended changes, 5) Missing clauses or protections, 6) Industry-standard comparisons, 7) Implementation and monitoring recommendations. Always emphasize the need for qualified legal counsel and jurisdiction-specific advice.",
    category: "business",
    rating: 4.7,
    users: "7K+",
    icon: "⚖️",
    features: ["Contract Review", "Risk Analysis", "Compliance Check"],
    featured: false,
    tags: ["legal", "contracts", "compliance", "risk"]
  },
  {
    id: 8,
    name: "Creative Content Strategist",
    description: "Develop innovative creative campaigns and content strategies for brands",
    prompt: "You are a creative director with expertise in brand storytelling and content strategy. Develop a creative campaign for [BRAND/PRODUCT] that includes: 1) Brand narrative and storytelling framework, 2) Visual identity and design direction, 3) Multi-platform content strategy, 4) Audience engagement and interaction plans, 5) Creative execution across different media, 6) Measurement and optimization strategies, 7) Timeline and resource allocation. Focus on originality, brand alignment, and audience resonance.",
    category: "creative",
    rating: 4.8,
    users: "20K+",
    icon: "🎨",
    features: ["Brand Strategy", "Content Creation", "Visual Design"],
    featured: false,
    tags: ["creative", "branding", "content", "design"]
  },
  {
    id: 9,
    name: "Data Science Analyst",
    description: "Advanced data analysis, visualization, and machine learning insights",
    prompt: "You are a senior data scientist with expertise in statistical analysis and machine learning. Analyze the provided dataset and deliver: 1) Comprehensive exploratory data analysis with key insights, 2) Data quality assessment and cleaning recommendations, 3) Statistical significance testing and hypothesis validation, 4) Predictive modeling recommendations and feature engineering, 5) Data visualization strategy for stakeholder communication, 6) Business impact assessment and actionable recommendations, 7) Implementation roadmap for data-driven decision making. Use appropriate statistical methods and clearly explain your methodology.",
    category: "development",
    rating: 4.9,
    users: "14K+",
    icon: "📊",
    features: ["Data Analysis", "ML Models", "Visualization"],
    featured: false,
    tags: ["data science", "analytics", "machine learning", "statistics"]
  },
  {
    id: 10,
    name: "Social Media Manager",
    description: "Complete social media strategy and content creation for brand growth",
    prompt: "You are a social media expert with proven track record in brand growth. Create a comprehensive social media strategy for [BRAND/BUSINESS] including: 1) Platform-specific content strategy for Instagram, TikTok, LinkedIn, Twitter, 2) Content calendar with post types, timing, and frequency, 3) Hashtag research and community engagement tactics, 4) Influencer collaboration and partnership strategies, 5) Social media advertising recommendations and budget allocation, 6) Analytics tracking and performance optimization, 7) Crisis management and brand reputation protocols. Focus on authentic engagement and measurable growth.",
    category: "marketing",
    rating: 4.7,
    users: "30K+",
    icon: "📱",
    features: ["Content Strategy", "Community Management", "Analytics"],
    featured: false,
    tags: ["social media", "content", "engagement", "growth"]
  },
  {
    id: 11,
    name: "UX/UI Design Consultant",
    description: "User experience optimization and interface design recommendations",
    prompt: "You are a senior UX/UI designer with expertise in user-centered design. Evaluate and improve the user experience for [PRODUCT/WEBSITE/APP] by providing: 1) User journey mapping and pain point identification, 2) Information architecture and navigation optimization, 3) Interface design recommendations with accessibility considerations, 4) Usability testing methodology and success metrics, 5) Mobile responsiveness and cross-platform consistency, 6) Conversion optimization and user engagement strategies, 7) Design system recommendations and component library. Focus on user needs, business goals, and design best practices.",
    category: "creative",
    rating: 4.8,
    users: "16K+",
    icon: "🎯",
    features: ["User Research", "Interface Design", "Usability Testing"],
    featured: false,
    tags: ["ux design", "ui design", "usability", "user experience"]
  },
  {
    id: 12,
    name: "SEO Content Optimizer",
    description: "Search engine optimization and content strategy for better rankings",
    prompt: "You are an SEO specialist with expertise in content optimization and search rankings. Optimize content for [WEBSITE/TOPIC] with: 1) Comprehensive keyword research and competitive analysis, 2) On-page SEO optimization including meta tags, headers, and content structure, 3) Content gap analysis and topic cluster strategy, 4) Technical SEO audit and improvement recommendations, 5) Link building strategy and outreach planning, 6) Local SEO optimization for geographic targeting, 7) Performance tracking and ranking improvement roadmap. Focus on white-hat techniques and sustainable growth.",
    category: "marketing",
    rating: 4.6,
    users: "22K+",
    icon: "🔍",
    features: ["Keyword Research", "Content Optimization", "Technical SEO"],
    featured: false,
    tags: ["seo", "content marketing", "search rankings", "optimization"]
  },
  {
    id: 13,
    name: "Project Management Advisor",
    description: "Comprehensive project planning, execution, and team management guidance",
    prompt: "You are a certified project manager with expertise in agile and traditional methodologies. Plan and manage [PROJECT TYPE] by providing: 1) Project scope definition and stakeholder analysis, 2) Work breakdown structure and timeline development, 3) Resource allocation and team role assignments, 4) Risk assessment and mitigation strategies, 5) Communication plan and progress tracking systems, 6) Quality assurance and deliverable standards, 7) Change management and scope control procedures. Use appropriate project management frameworks and tools for optimal results.",
    category: "business",
    rating: 4.7,
    users: "18K+",
    icon: "📋",
    features: ["Project Planning", "Team Management", "Risk Assessment"],
    featured: false,
    tags: ["project management", "planning", "agile", "leadership"]
  },
  {
    id: 14,
    name: "Customer Service Trainer",
    description: "Customer service excellence training and support system optimization",
    prompt: "You are a customer service expert with experience in training and process optimization. Develop a customer service program for [BUSINESS TYPE] including: 1) Customer service standards and quality metrics, 2) Staff training curriculum and skill development programs, 3) Communication scripts and response templates for common scenarios, 4) Escalation procedures and conflict resolution strategies, 5) Customer feedback collection and analysis systems, 6) Technology integration and support tool recommendations, 7) Performance monitoring and continuous improvement processes. Focus on customer satisfaction and team empowerment.",
    category: "business",
    rating: 4.8,
    users: "12K+",
    icon: "🎧",
    features: ["Training Programs", "Quality Standards", "Process Optimization"],
    featured: false,
    tags: ["customer service", "training", "support", "quality"]
  },
  {
    id: 15,
    name: "Cybersecurity Consultant",
    description: "Comprehensive security assessment and protection strategy development",
    prompt: "You are a cybersecurity expert with expertise in threat assessment and protection strategies. Conduct a security evaluation for [ORGANIZATION/SYSTEM] and provide: 1) Comprehensive security audit and vulnerability assessment, 2) Threat modeling and risk analysis specific to the industry, 3) Security policy development and compliance requirements, 4) Employee training and security awareness programs, 5) Incident response planning and disaster recovery procedures, 6) Technology recommendations for security tools and monitoring, 7) Regular security maintenance and update protocols. Focus on proactive protection and regulatory compliance.",
    category: "development",
    rating: 4.9,
    users: "9K+",
    icon: "🔒",
    features: ["Security Audit", "Threat Analysis", "Compliance"],
    featured: false,
    tags: ["cybersecurity", "security audit", "risk management", "compliance"]
  },
  {
    id: 16,
    name: "E-commerce Optimizer",
    description: "Online store optimization for increased sales and customer experience",
    prompt: "You are an e-commerce specialist with expertise in online retail optimization. Improve [E-COMMERCE STORE] performance by providing: 1) Conversion rate optimization and checkout process improvement, 2) Product page optimization and merchandising strategies, 3) Customer acquisition and retention programs, 4) Inventory management and supply chain optimization, 5) Payment processing and security enhancements, 6) Mobile commerce optimization and app development recommendations, 7) Analytics setup and performance tracking systems. Focus on user experience and revenue growth.",
    category: "business",
    rating: 4.7,
    users: "15K+",
    icon: "🛒",
    features: ["Conversion Optimization", "User Experience", "Analytics"],
    featured: false,
    tags: ["ecommerce", "conversion", "online sales", "retail"]
  },
  {
    id: 17,
    name: "Content Writing Specialist",
    description: "Professional content creation for blogs, websites, and marketing materials",
    prompt: "You are a professional content writer with expertise in various industries and formats. Create compelling content for [TOPIC/INDUSTRY] that includes: 1) Audience research and persona development, 2) Content strategy and editorial calendar planning, 3) SEO-optimized blog posts and articles with engaging headlines, 4) Website copy that converts visitors to customers, 5) Email marketing campaigns and newsletter content, 6) Social media content and captions, 7) Brand voice development and style guide creation. Focus on clarity, engagement, and measurable results.",
    category: "creative",
    rating: 4.8,
    users: "28K+",
    icon: "✍️",
    features: ["Blog Writing", "SEO Content", "Brand Voice"],
    featured: false,
    tags: ["content writing", "copywriting", "blogging", "seo content"]
  },
  {
    id: 18,
    name: "HR Recruitment Specialist",
    description: "Talent acquisition and human resources management optimization",
    prompt: "You are an HR specialist with expertise in talent acquisition and employee management. Develop a recruitment strategy for [POSITION/DEPARTMENT] including: 1) Job description optimization and requirements analysis, 2) Candidate sourcing strategies across multiple platforms, 3) Interview process design and evaluation criteria, 4) Onboarding program development and integration planning, 5) Compensation benchmarking and benefits package design, 6) Employee retention strategies and career development paths, 7) Performance management and feedback systems. Focus on finding the right talent and building strong teams.",
    category: "business",
    rating: 4.6,
    users: "11K+",
    icon: "👥",
    features: ["Talent Acquisition", "Interview Process", "Employee Development"],
    featured: false,
    tags: ["hr", "recruitment", "talent acquisition", "employee management"]
  },
  {
    id: 19,
    name: "Video Production Planner",
    description: "Complete video content strategy and production workflow optimization",
    prompt: "You are a video production expert with experience in content creation and marketing. Plan video content for [BRAND/PURPOSE] including: 1) Video content strategy and audience targeting, 2) Pre-production planning including scripting and storyboarding, 3) Production workflow and equipment recommendations, 4) Post-production editing and optimization guidelines, 5) Distribution strategy across platforms (YouTube, social media, website), 6) Performance analytics and optimization techniques, 7) Budget planning and resource allocation. Focus on engaging content that drives results.",
    category: "creative",
    rating: 4.7,
    users: "13K+",
    icon: "🎬",
    features: ["Video Strategy", "Production Planning", "Content Distribution"],
    featured: false,
    tags: ["video production", "content creation", "video marketing", "storytelling"]
  },
  {
    id: 20,
    name: "Email Marketing Specialist",
    description: "Advanced email marketing campaigns and automation strategies",
    prompt: "You are an email marketing expert with proven success in campaign optimization. Create an email marketing strategy for [BUSINESS/PRODUCT] that includes: 1) Email list building and segmentation strategies, 2) Automated email sequences for different customer journeys, 3) Newsletter design and content planning, 4) A/B testing methodology for subject lines and content, 5) Deliverability optimization and spam prevention, 6) Integration with CRM and marketing automation tools, 7) Performance analytics and ROI measurement. Focus on engagement, conversion, and customer lifetime value.",
    category: "marketing",
    rating: 4.8,
    users: "19K+",
    icon: "📧",
    features: ["Email Automation", "List Segmentation", "A/B Testing"],
    featured: false,
    tags: ["email marketing", "automation", "newsletters", "customer retention"]
  }
];

// --- COMMON INITIALIZATION ---
document.addEventListener('DOMContentLoaded', function () {
  initializeModeToggle();
  initializeMobileMenu();
  initializeScrollEffects();
  initializeAnimations();
  handleNavigation();
  enhanceAccessibility();

  // Page-specific initializations
  if (document.querySelector('.gems-page')) {
    initializeGemsPage();
    console.log('💎 Gemini GEMS page initialized');
  } else if (document.querySelector('.main-content')) {
    initializeStartingAnimation();
    initializeHeroGradientAnimation();
    console.log('✨ AI Portal initialized with starting animation and carousel');
  } else if (document.querySelector('.tools-page')) {
    initializeToolsPage();
    console.log('🛠️ AI Tools page initialized');
  }
});

// --- GEMS PAGE FUNCTIONALITY ---
function initializeGemsPage() {
  renderGems(geminiGems);
  setupGemsEventListeners();
  initializeGemsSearch();
  initializeGemsFilters();
}

function renderGems(gems) {
  const container = document.getElementById('gems-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  const gemsToShow = gems.slice(0, displayedGemsItems);
  
  gemsToShow.forEach(gem => {
    const card = createGemCard(gem);
    container.appendChild(card);
  });
  
  updateLoadMoreButton(gems.length);
  updateResultsCount(gems.length);
}

function createGemCard(gem) {
  const card = document.createElement('div');
  card.className = 'gem-card group prompt-card cursor-pointer transition-all overflow-hidden border-2 border-transparent';
  card.dataset.category = gem.category;
  card.onclick = () => copyPromptToClipboard(gem.prompt, gem.name);
  
  // Get gradient class based on category
  const gradientClass = getGradientClass(gem.category);
  
  card.innerHTML = `
    <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity ${gradientClass}"></div>
    <div class="relative p-6">
      <div class="flex items-start justify-between mb-3">
        <div class="p-2 rounded-lg text-white ${gradientClass}">
          <div class="h-6 w-6 flex items-center justify-center">
            ${getIconSVG(gem.icon)}
          </div>
        </div>
        <div class="opacity-0 group-hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
          </svg>
        </div>
      </div>
      
      <h3 class="text-xl font-semibold mb-3 text-white">${gem.name}</h3>
      <p class="text-sm text-muted-foreground mb-4 line-clamp-2">${gem.description}</p>
      
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="badge badge-secondary">${getCategoryDisplayName(gem.category)}</span>
        ${gem.features && gem.features.length > 0 ? `<span class="badge badge-outline">${gem.features[0]}</span>` : ''}
      </div>
      
      <div class="flex flex-wrap gap-1 mb-4">
        ${gem.tags.map(tag => `<span class="text-xs text-muted-foreground">#${tag}</span>`).join(' ')}
      </div>
      
      <div class="flex items-center justify-between text-sm text-muted-foreground">
        <span>Click to copy prompt</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
        </svg>
      </div>
    </div>
  `;
  
  return card;
}

function copyPromptToClipboard(prompt, title) {
  navigator.clipboard.writeText(prompt).then(() => {
    showToast(`Copied "${title}" prompt to clipboard!`, 'Ready to paste in Gemini Gems');
  }).catch(err => {
    console.error('Failed to copy: ', err);
    showToast('Failed to copy prompt', 'Please try again');
  });
}

function showToast(message, description = '') {
  const container = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  
  toast.innerHTML = `
    <div style="font-weight: 500;">${message}</div>
    ${description ? `<div class="toast-description">${description}</div>` : ''}
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

function initializeGemsSearch() {
  const searchInput = document.getElementById('gems-search');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    searchQueryGems = e.target.value.toLowerCase();
    filterAndRenderGems();
  });
}

function initializeGemsFilters() {
  const categoryFilter = document.getElementById('category-filter');
  if (!categoryFilter) return;
  
  categoryFilter.addEventListener('change', (e) => {
    currentCategoryGems = e.target.value;
    filterAndRenderGems();
  });
}

function filterAndRenderGems() {
  let filteredGems = geminiGems;
  
  // Filter by category
  if (currentCategoryGems !== 'all') {
    filteredGems = filteredGems.filter(gem => gem.category === currentCategoryGems);
  }
  
  // Filter by search query
  if (searchQueryGems) {
    filteredGems = filteredGems.filter(gem => 
      gem.name.toLowerCase().includes(searchQueryGems) ||
      gem.description.toLowerCase().includes(searchQueryGems) ||
      gem.tags.some(tag => tag.toLowerCase().includes(searchQueryGems))
    );
  }
  
  displayedGemsItems = 12; // Reset displayed items
  renderGems(filteredGems);
}

function getCategoryDisplayName(category) {
  const categoryMap = {
    'marketing': 'Marketing',
    'development': 'Development',
    'business': 'Business',
    'healthcare': 'Healthcare',
    'education': 'Education',
    'creative': 'Creative',
    'research': 'Research'
  };
  return categoryMap[category] || category;
}

function updateLoadMoreButton(totalGems) {
  const loadMoreBtn = document.getElementById('load-more-gems');
  if (!loadMoreBtn) return;
  
  if (displayedGemsItems >= totalGems) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
    loadMoreBtn.onclick = () => {
      displayedGemsItems += gemsPerLoad;
      filterAndRenderGems();
    };
  }
}

function updateResultsCount(totalGems) {
  const resultsCount = document.getElementById('results-count');
  if (resultsCount) {
    resultsCount.textContent = `${totalGems} prompts`;
  }
}

function setupGemsEventListeners() {
  // Any additional event listeners can be added here
}

// --- MODE TOGGLE FUNCTIONALITY ---
function initializeModeToggle() {
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  const icon = modeToggle?.querySelector('i');

  function updateIcon(isDark) {
    if (icon) {
      if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        icon.setAttribute('title', 'Switch to light mode');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        icon.setAttribute('title', 'Switch to dark mode');
      }
    }
  }

  function getPreferredMode() {
    const saved = localStorage.getItem('theme-mode');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setMode(mode) {
    if (mode === 'dark') {
      body.classList.add('dark');
      updateIcon(true);
    } else {
      body.classList.remove('dark');
      updateIcon(false);
    }
    localStorage.setItem('theme-mode', mode);
    if (document.querySelector('.hero')) {
      updateHeroBackground();
    }
  }

  setMode(getPreferredMode());

  modeToggle?.addEventListener('click', function() {
    const isDark = body.classList.contains('dark');
    setMode(isDark ? 'light' : 'dark');
  });
}

// --- MOBILE MENU FUNCTIONALITY ---
function initializeMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (!mobileToggle || !mobileNav) return;
  
  mobileToggle.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileToggle.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('active');
      mobileToggle.classList.remove('active');
    }
  });
}

// --- SCROLL EFFECTS ---
function initializeScrollEffects() {
  window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
}

// --- ANIMATIONS ---
function initializeAnimations() {
  // Add any general animations here
}

// --- NAVIGATION ---
function handleNavigation() {
  // Add navigation handling if needed
}

// --- ACCESSIBILITY ---
function enhanceAccessibility() {
  // Add accessibility enhancements
}

// --- PLACEHOLDER FUNCTIONS FOR MAIN PAGE ---
function initializeStartingAnimation() {
  // Placeholder for main page animation
}

function initializeHeroGradientAnimation() {
  // Placeholder for hero gradient animation
}

function updateHeroBackground() {
  // Placeholder for hero background update
}

function initializeToolsPage() {
  // Placeholder for tools page initialization
}



// Helper function to get gradient class based on category
function getGradientClass(category) {
  const gradientMap = {
    'marketing': 'gradient-pink-rose',
    'development': 'gradient-blue-cyan',
    'business': 'gradient-emerald-teal',
    'healthcare': 'gradient-red-pink',
    'education': 'gradient-purple-indigo',
    'creative': 'gradient-orange-yellow'
  };
  return gradientMap[category] || 'gradient-pink-rose';
}

// Helper function to get icon SVG based on icon name
function getIconSVG(iconName) {
  const iconMap = {
    '✨': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>',
    '💻': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>',
    '💼': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>',
    '❤️': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/></svg>',
    '📚': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
    '💰': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    '⚖️': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16h6"/><path d="M8 16h6"/><path d="M12 2v14"/><path d="M8 2h8"/><circle cx="12" cy="6" r="2"/></svg>',
    '🎨': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    '📊': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    '📱': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>',
    '🎯': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    '🔍': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
    '📋': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>',
    '🎧': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>',
    '🔒': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    '🛒': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
    '✍️': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>',
    '👥': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    '🎬': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="14" x="3" y="3" rx="2"/><path d="M23 7l-7 5 7 5V7z"/></svg>',
    '📧': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
  };
  return iconMap[iconName] || iconMap['✨'];
}

