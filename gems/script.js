// Global variables
let isLoading = true; // From script.js, might not be used everywhere but kept for consistency
let scrollProgress = 0; // From script.js
let currentCategoryGems = 'all'; // Renamed from currentCategory in gemini-gems.js to avoid conflict
let searchQueryGems = ''; // Renamed from searchQuery in gemini-gems.js
let displayedGemsItems = 12; // Renamed from displayedGems in gemini-gems.js
const gemsPerLoad = 8; // From gemini-gems.js

let currentFilter = 'all'; // From script.js for the main page
let newsIndex = 0; // From script.js
let newsInterval; // From script.js

// Carousel variables (from script.js)
let currentSlide = 0;
let carouselCards = [];
let cardsPerView = 3;
let totalSlides = 0;

// Sample GEMS data (from gemini-gems.js)
const geminiGems = [
  {
    id: 1,
    name: "Academic Essay Writer",
    description: "Assists students and researchers in structuring, drafting, and refining academic essays and papers with proper citations.",
    category: "education",
    rating: 4.8,
    users: "15K+",
    icon: "📝",
    features: ["Citation Management", "Academic Style", "Research Integration"],
    featured: false
  },
  {
    id: 2,
    name: "Market Trend Analyzer",
    description: "Leverage this GEM to analyze market data, identify trends, and provide actionable insights for your investments.",
    category: "business",
    rating: 4.7,
    users: "8K+",
    icon: "📈",
    features: ["Data Analysis", "Trend Prediction", "Investment Insights"],
    featured: false
  },
  {
    id: 3,
    name: "Creative Storyteller",
    description: "Unleash your imagination! This GEM helps you develop plotlines, characters, and dialogues for captivating stories.",
    category: "creative",
    rating: 4.9,
    users: "25K+",
    icon: "✍️",
    features: ["Plot Development", "Character Creation", "Dialogue Writing"],
    featured: false
  },
  {
    id: 4,
    name: "AI Image Prompt Creator",
    description: "Craft perfect prompts for DALL-E, Midjourney, and Stable Diffusion to get the images you envision.",
    category: "creative",
    rating: 4.6,
    users: "30K+",
    icon: "🤖",
    features: ["Prompt Engineering", "Style Guidance", "Multi-Platform"],
    featured: false
  },
  {
    id: 5,
    name: "Customer Service Bot",
    description: "Simulates customer interactions to help train and test your support team on common queries.",
    category: "business",
    rating: 4.5,
    users: "12K+",
    icon: "💬",
    features: ["Query Simulation", "Training Scenarios", "Response Analysis"],
    featured: false
  },
  {
    id: 6,
    name: "Language Learning Tutor",
    description: "Personalized language learning assistant that adapts to your pace and learning style.",
    category: "education",
    rating: 4.8,
    users: "40K+",
    icon: "🌍",
    features: ["Adaptive Learning", "Pronunciation Help", "Cultural Context"],
    featured: false
  },
  {
    id: 7,
    name: "Code Review Assistant",
    description: "Analyzes your code for best practices, security issues, and performance optimizations.",
    category: "development",
    rating: 4.7,
    users: "18K+",
    icon: "🔍",
    features: ["Security Analysis", "Performance Tips", "Best Practices"],
    featured: false
  },
  {
    id: 8,
    name: "Research Paper Summarizer",
    description: "Quickly extracts key insights and findings from academic papers and research documents.",
    category: "research",
    rating: 4.6,
    users: "22K+",
    icon: "📊",
    features: ["Key Insights", "Citation Extraction", "Methodology Analysis"],
    featured: false
  },
  {
    id: 9,
    name: "Social Media Manager",
    description: "Creates engaging social media content and schedules posts across multiple platforms.",
    category: "content",
    rating: 4.5,
    users: "35K+",
    icon: "📱",
    features: ["Content Creation", "Scheduling", "Engagement Analytics"],
    featured: false
  },
  {
    id: 10,
    name: "Financial Advisor",
    description: "Provides personalized financial advice and investment strategies based on your goals.",
    category: "business",
    rating: 4.8,
    users: "10K+",
    icon: "💰",
    features: ["Investment Strategy", "Risk Assessment", "Goal Planning"],
    featured: false
  },
  {
    id: 11,
    name: "UI/UX Design Critic",
    description: "Analyzes your designs and provides feedback on usability, accessibility, and aesthetics.",
    category: "creative",
    rating: 4.7,
    users: "14K+",
    icon: "🎨",
    features: ["Usability Analysis", "Accessibility Check", "Design Feedback"],
    featured: false
  },
  {
    id: 12,
    name: "Math Problem Solver",
    description: "Solves complex mathematical problems with step-by-step explanations.",
    category: "education",
    rating: 4.9,
    users: "50K+",
    icon: "🧮",
    features: ["Step-by-step Solutions", "Multiple Methods", "Concept Explanation"],
    featured: false
  },
  {
    id: 13,
    name: "API Documentation Writer",
    description: "Generates comprehensive API documentation from your code and specifications.",
    category: "development",
    rating: 4.6,
    users: "8K+",
    icon: "📚",
    features: ["Auto Documentation", "Code Examples", "Interactive Docs"],
    featured: false
  },
  {
    id: 14,
    name: "Email Marketing Optimizer",
    description: "Optimizes email campaigns for better open rates, click-through rates, and conversions.",
    category: "business",
    rating: 4.5,
    users: "16K+",
    icon: "📧",
    features: ["A/B Testing", "Subject Line Optimization", "Content Analysis"],
    featured: false
  },
  {
    id: 15,
    name: "Scientific Paper Reviewer",
    description: "Reviews scientific papers for methodology, statistical analysis, and peer review standards.",
    category: "research",
    rating: 4.8,
    users: "6K+",
    icon: "🔬",
    features: ["Methodology Review", "Statistical Analysis", "Peer Review"],
    featured: false
  },
  {
    id: 16,
    name: "Podcast Script Writer",
    description: "Creates engaging podcast scripts with natural conversation flow and compelling narratives.",
    category: "content",
    rating: 4.7,
    users: "12K+",
    icon: "🎙️",
    features: ["Script Structure", "Conversation Flow", "Narrative Design"],
    featured: false
  },
  {
    id: 17,
    name: "Database Query Optimizer",
    description: "Analyzes and optimizes SQL queries for better performance and efficiency.",
    category: "development",
    rating: 4.6,
    users: "9K+",
    icon: "🗄️",
    features: ["Query Analysis", "Performance Optimization", "Index Suggestions"],
    featured: false
  },
  {
    id: 18,
    name: "Grant Proposal Writer",
    description: "Helps researchers and organizations write compelling grant proposals and funding applications.",
    category: "research",
    rating: 4.8,
    users: "4K+",
    icon: "💼",
    features: ["Proposal Structure", "Budget Planning", "Impact Assessment"],
    featured: false
  },
  {
    id: 19,
    name: "Video Script Creator",
    description: "Generates engaging video scripts for YouTube, TikTok, and other video platforms.",
    category: "content",
    rating: 4.6,
    users: "28K+",
    icon: "🎬",
    features: ["Platform Optimization", "Hook Creation", "Call-to-Action"],
    featured: false
  },
  {
    id: 20,
    name: "Legal Document Analyzer",
    description: "Analyzes legal documents and contracts to identify key terms, risks, and obligations.",
    category: "business",
    rating: 4.7,
    users: "7K+",
    icon: "⚖️",
    features: ["Risk Analysis", "Term Extraction", "Compliance Check"],
    featured: false
  }
];

// News data (from script.js)
const newsItems = [
  {
    id: "1",
    title: "Breaking: Tech Giants Report Q4 Earnings",
    summary: "Major technology companies exceed expectations with strong quarterly results",
    category: "Business",
    time: "2 min ago",
    icon: "fas fa-trending-up",
    color: "#10B981", // Emerald-500
    views: 1250,
    comments: 45
  },
  {
    id: "2",
    title: "Global Climate Summit Reaches Agreement",
    summary: "World leaders commit to ambitious new carbon reduction targets",
    category: "Environment",
    time: "15 min ago",
    icon: "fas fa-users",
    color: "#3B82F6", // Blue-500
    views: 890,
    comments: 23
  },
  {
    id: "3",
    title: "AI Breakthrough in Medical Research",
    summary: "New machine learning model shows promise in early disease detection",
    category: "Technology",
    time: "1 hour ago",
    icon: "fas fa-newspaper",
    color: "#8B5CF6", // Violet-500
    views: 2100,
    comments: 67
  },
  {
    id: "4",
    title: "Market Update: Stocks Rally",
    summary: "Major indices close higher as investors show renewed confidence",
    category: "Finance",
    time: "2 hours ago",
    icon: "fas fa-chart-line", // Changed from trending-up for variety
    color: "#F59E0B", // Amber-500
    views: 756,
    comments: 34
  },
  {
    id: "5",
    title: "Space Mission Launches Successfully",
    summary: "International space station receives new crew and supplies",
    category: "Science",
    time: "3 hours ago",
    icon: "fas fa-rocket", // Changed from users for variety
    color: "#EF4444", // Red-500
    views: 1450,
    comments: 89
  }
];

// GPT Cards data (from script.js)
const gpts = [
  {
    id: '001',
    iconClass: 'icon-atom',
    iconContent: '⚛️',
    title: 'Advanced Content Generator',
    category: 'Content Creation',
    description: 'This GPT specializes in generating high-quality, SEO-optimized articles and blog posts on various topics.',
    link: '#'
  },
  {
    id: '002',
    iconClass: 'icon-chart',
    iconContent: '📈',
    title: 'Market Trend Analyzer',
    category: 'Business & Finance',
    description: 'Leverage this GPT to analyze market data, identify trends, and provide actionable insights for your investments.',
    link: '#'
  },
  {
    id: '003',
    iconClass: 'icon-flow',
    iconContent: '📝',
    title: 'Academic Essay Writer',
    category: 'Education',
    description: 'Assists students and researchers in structuring, drafting, and refining academic essays and papers with proper citations.',
    link: '#'
  },
  {
    id: '004',
    iconClass: 'icon-code',
    iconContent: '💻',
    title: 'Python Code Debugger',
    category: 'Development',
    description: 'Upload your Python code, and this GPT will help you identify bugs, suggest fixes, and explain errors.',
    link: '#'
  },
  {
    id: '005',
    iconClass: 'icon-write',
    iconContent: '✍️',
    title: 'Creative Storyteller',
    category: 'Writing & Arts',
    description: 'Unleash your imagination! This GPT helps you develop plotlines, characters, and dialogues for captivating stories.',
    link: '#'
  },
  {
    id: '006',
    iconClass: 'icon-atom',
    iconContent: '🤖',
    title: 'AI Image Prompt Creator',
    category: 'Generative AI',
    description: 'Craft perfect prompts for DALL-E, Midjourney, and Stable Diffusion to get the images you envision.',
    link: '#'
  },
  {
    id: '007',
    iconClass: 'icon-chart',
    iconContent: '💬',
    title: 'Customer Service Bot',
    category: 'Support',
    description: 'Simulates customer interactions to help train and test your support team on common queries.',
    link: '#'
  }
];

// AI Tools Data (from script.js)
const aiToolsData = [
  {
    text: "ChatGPT is an advanced conversational AI for generating human-like text, answering questions, and assisting with a wide range of tasks.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    name: "ChatGPT",
    role: "Conversational AI"
  },
  {
    text: "Midjourney generates stunning, creative images and artwork from text prompts using advanced AI models.",
    image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    name: "Midjourney",
    role: "AI Art Generator"
  },
  {
    text: "GitHub Copilot helps you write code faster with AI-powered code suggestions and autocompletions inside your IDE.",
    image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    name: "GitHub Copilot",
    role: "Code Assistant"
  },
  {
    text: "Notion AI automates note-taking, summaries, and content generation within your Notion workspace.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    name: "Notion AI",
    role: "Productivity"
  },
  {
    text: "DALL·E 2 creates original images and artwork from natural language descriptions, powered by OpenAI.",
    image: "https://cdn.openai.com/dall-e-2/dall-e-2-logo.png",
    name: "DALL·E 2",
    role: "Image Generation"
  },
  {
    text: "Synthesia enables you to create professional AI-generated videos from text in minutes, with avatars and voiceovers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    name: "Synthesia",
    role: "Video Generation"
  },
  {
    text: "Jasper is an AI writing assistant for marketing, blogs, and content creation, helping you write better and faster.",
    image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    name: "Jasper",
    role: "AI Writing"
  },
  {
    text: "Runway ML offers creative AI tools for video, image, and audio editing, including generative and enhancement features.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    name: "Runway ML",
    role: "Creative Suite"
  },
  {
    text: "Perplexity AI is an advanced AI-powered search and research assistant that provides accurate, cited answers.",
    image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    name: "Perplexity AI",
    role: "AI Search"
  }
];


// --- COMMON INITIALIZATION (from both files) ---
document.addEventListener('DOMContentLoaded', function () {
  initializeModeToggle();
  initializeMobileMenu(); // Common to both pages
  initializeScrollEffects(); // Common to both pages
  initializeAnimations(); // Common to both pages
  handleNavigation(); // Common to handle general navigation between pages
  enhanceAccessibility(); // Common for all pages

  // Page-specific initializations
  if (document.querySelector('.gems-page')) {
    initializeGemsPage();
    console.log('💎 Gemini GEMS page initialized');
  } else if (document.querySelector('.main-content')) {
    initializeStartingAnimation(); // Only for the main landing page
    initializeHeroGradientAnimation(); // Only for the main landing page
    console.log('✨ AI Portal initialized with starting animation and carousel');
  } else if (document.querySelector('.tools-page')) {
    initializeToolsPage();
    console.log('🛠️ AI Tools page initialized');
  }
});

// --- Mode Toggle Functionality (merged and common) ---
function initializeModeToggle() {
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  const icon = modeToggle?.querySelector('i'); // Use optional chaining in case element doesn't exist

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
    // Update hero background if it's the main page and hero gradient is active
    if (document.querySelector('.hero')) {
      updateHeroBackground();
    }
  }

  setMode(getPreferredMode()); // Set initial mode

  modeToggle?.addEventListener('click', function() {
    const isDark = body.classList.contains('dark');
    setMode(isDark ? 'light' : 'dark');
  });
}

// --- Mobile Menu Functionality (merged and common) ---
function initializeMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    mobileNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }
}

// --- Scroll Effects (merged and common) ---
function initializeScrollEffects() {
  const header = document.getElementById('header');
  const scrollProgressBar = document.getElementById('scroll-progress');

  let ticking = false;

  function updateScrollEffects() {
    if (!header || !scrollProgressBar) {
      ticking = false;
      return;
    }

    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = (scrollTop / docHeight) * 100;

    scrollProgressBar.style.width = scrollProgress + '%';

    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  });
}

// --- General Animations (merged and common) ---
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Unobserve after animating to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should animate on all pages
  document.querySelectorAll('.gem-card, .category-card, .feature-highlight, .featured-tool-card, .tool-card, .stat-item').forEach(el => {
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Button click animations (ripple effect)
  document.querySelectorAll('button, .button').forEach(button => {
    button.addEventListener('click', function (e) {
      if (this.disabled || this.classList.contains('disabled')) {
        return;
      }

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.transform = `translate(-50%, -50%) scale(0)`;

      requestAnimationFrame(() => {
        ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        ripple.style.transform = `translate(-50%, -50%) scale(1)`;
        ripple.style.opacity = '0';
      });

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// --- Navigation Handling (common for all pages) ---
function handleNavigation() {
  // Use event delegation for nav links if possible, or direct listeners
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Prevent default only for internal navigation that changes page, not hash links
      if (href && !href.startsWith('#') && href !== window.location.pathname) {
        e.preventDefault(); // Stop default link behavior
        window.location.href = href; // Programmatic navigation
      }
    });
  });

  // Specific buttons for other pages
  const gemsButtons = document.querySelectorAll('[data-scroll-to="gems"]');
  gemsButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = 'gemini-gems.html';
    });
  });

  const toolsButtons = document.querySelectorAll('[data-scroll-to="tools"]');
  toolsButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = 'ai-tools.html';
    });
  });

  const homeButtons = document.querySelectorAll('[data-scroll-to="home"]'); // Assuming you add this to main index buttons
  homeButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  });
}

// --- Accessibility Enhancements (common for all pages) ---
function enhanceAccessibility() {
  document.body.classList.add('keyboard-navigation');

  // Focus management for carousel (if present)
  const carouselCards = document.querySelectorAll('.gpt-card');
  carouselCards.forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `GPT card ${index + 1}`);
  });
}

// --- Notification Function (common) ---
function showNotification(message) {
  const notification = document.getElementById('notification');
  const notificationText = notification?.querySelector('.notification-text');

  if (notification && notificationText) {
    notificationText.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
}

// --- Main Landing Page Specific Functions ---

// Starting Animation Handler
function initializeStartingAnimation() {
  const initialAnimationContainer = document.querySelector('.container');
  const mainContent = document.querySelector('.main-content');
  const animatedText = document.querySelector('.animated-text');

  if (animatedText) {
    animatedText.style.opacity = '0';
    animatedText.style.transform = 'translateY(20px)';
    setTimeout(() => {
      animatedText.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      animatedText.style.opacity = '1';
      animatedText.style.transform = 'translateY(0)';
    }, 100);
  }

  const totalStartingAnimationDuration = 2500 + 500 + 1000 + 100;

  setTimeout(() => {
    if (initialAnimationContainer) {
      initialAnimationContainer.style.transition = 'opacity 1s ease-out';
      initialAnimationContainer.style.opacity = '0';

      setTimeout(() => {
        if (initialAnimationContainer) {
          initialAnimationContainer.style.display = 'none';
        }
        if (mainContent) {
          mainContent.style.display = 'block';
          setTimeout(() => {
            mainContent.classList.add('show');
            initializeMainWebsiteFeatures(); // Initialize main website specific functionalities
          }, 100);
        }
      }, 1000);
    }
  }, 2500 + 500);
}

// Initialize main website features after starting animation
function initializeMainWebsiteFeatures() {
  initializeInteractions(); // Specific to main page GPT cards
  initializeCounters(); // Specific to main page hero stats
  initializeFilters(); // Specific to main page tool filters
  initializeNewsSection(); // Specific to main page news
  initializeCarousel(); // Specific to main page GPT carousel
  setupAIToolsVerticalCarousel(); // Specific to main page AI Tools section
}


// --- HERO SECTION ANIMATED GRADIENT (from script.js) ---
let heroGradientAnimationId = null;

function initializeHeroGradientAnimation() {
  const hero = document.querySelector('.hero');
  const primaryButton = document.querySelector('.primary-button');
  if (!hero || !primaryButton) return;

  const isDark = document.body.classList.contains('dark');
  const COLORS = isDark
    ? ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]
    : ["#10b981", "#2563eb", "#9333ea", "#dc2626"]; // Light mode palette

  let currentColorIndex = 0;
  let currentColor = hexToRgb(COLORS[0]);
  let targetColor = hexToRgb(COLORS[1]);

  function hexToRgb(hex) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }

  function rgbToHex({ r, g, b }) {
    return "#" + [r, g, b].map(x =>
      x.toString(16).padStart(2, '0')).join('');
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animateGradient() {
    currentColor.r = lerp(currentColor.r, targetColor.r, 0.03);
    currentColor.g = lerp(currentColor.g, targetColor.g, 0.03);
    currentColor.b = lerp(currentColor.b, targetColor.b, 0.03);

    const newHex = rgbToHex({
      r: Math.round(currentColor.r),
      g: Math.round(currentColor.g),
      b: Math.round(currentColor.b),
    });

    if (document.body.classList.contains('dark')) {
      hero.style.background = `radial-gradient(125% 125% at 50% 0%, #020617 50%, ${newHex})`;
      primaryButton.style.border = `1px solid ${newHex}`;
      primaryButton.style.boxShadow = `0px 4px 24px ${newHex}`;
    } else {
      hero.style.background = `radial-gradient(125% 125% at 50% 0%, #f5f7fa 50%, ${newHex})`;
      primaryButton.style.border = `1px solid ${newHex}`;
      primaryButton.style.boxShadow = `0px 4px 24px ${newHex}`;
    }

    const delta = Math.abs(currentColor.r - targetColor.r) +
      Math.abs(currentColor.g - targetColor.g) +
      Math.abs(currentColor.b - targetColor.b);

    if (delta < 5) {
      currentColorIndex = (currentColorIndex + 1) % COLORS.length;
      targetColor = hexToRgb(COLORS[currentColorIndex]);
    }

    heroGradientAnimationId = requestAnimationFrame(animateGradient);
  }

  // Cancel any previous animation to prevent multiple animations running
  if (heroGradientAnimationId) {
    cancelAnimationFrame(heroGradientAnimationId);
    heroGradientAnimationId = null;
  }
  animateGradient();
}

function updateHeroBackground() {
  initializeHeroGradientAnimation();
}


// --- Carousel Functions (from script.js) ---
function initializeCarousel() {
  const carouselTrack = document.getElementById('carousel-track');
  const carouselPrev = document.getElementById('carousel-prev');
  const carouselNext = document.getElementById('carousel-next');
  const carouselIndicators = document.getElementById('carousel-indicators');

  if (!carouselTrack) return;

  function calculateCardsPerView() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      return 1;
    } else if (screenWidth < 768) {
      return 2;
    } else {
      return 3;
    }
  }

  function createGptCard(gpt) {
    const card = document.createElement('div');
    card.classList.add('gpt-card');

    card.innerHTML = `
      <div class="gpt-card-header">
        <div class="gpt-icon ${gpt.iconClass}">${gpt.iconContent}</div>
        <span class="gpt-id">#${gpt.id}</span>
      </div>
      <h3 class="gpt-title">${gpt.title}</h3>
      <span class="gpt-category-tag">${gpt.category}</span>
      <p class="gpt-description">${gpt.description}</p>
      <a href="${gpt.link}" class="gpt-link" target="_blank" rel="noopener noreferrer">Access GPT &rarr;</a>
    `;
    return card;
  }

  function setupCarousel() {
    cardsPerView = calculateCardsPerView();
    totalSlides = Math.max(0, gpts.length - cardsPerView);

    carouselTrack.innerHTML = '';
    carouselCards = [];

    gpts.forEach(gpt => {
      const card = createGptCard(gpt);
      carouselTrack.appendChild(card);
      carouselCards.push(card);
    });

    createIndicators();
    updateCarousel();
    updateNavigationButtons();
  }

  function createIndicators() {
    if (!carouselIndicators) return;
    carouselIndicators.innerHTML = '';
    for (let i = 0; i <= totalSlides; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('carousel-indicator');
      if (i === currentSlide) {
        indicator.classList.add('active');
      }
      indicator.addEventListener('click', () => {
        currentSlide = i;
        updateCarousel();
        updateNavigationButtons();
        updateIndicators();
      });
      carouselIndicators.appendChild(indicator);
    }
  }

  function updateCarousel() {
    const cardWidth = carouselCards[0]?.offsetWidth || 320;
    const gap = 20;
    const translateX = -(currentSlide * (cardWidth + gap));
    carouselTrack.style.transform = `translateX(${translateX}px)`;
  }

  function updateNavigationButtons() {
    if (carouselPrev) {
      carouselPrev.disabled = currentSlide === 0;
    }
    if (carouselNext) {
      carouselNext.disabled = currentSlide >= totalSlides;
    }
  }

  function updateIndicators() {
    if (!carouselIndicators) return;
    const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }

  if (carouselPrev) {
    carouselPrev.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
        updateNavigationButtons();
        updateIndicators();
      }
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener('click', () => {
      if (currentSlide < totalSlides) {
        currentSlide++;
        updateCarousel();
        updateNavigationButtons();
        updateIndicators();
      }
    });
  }

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  carouselTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carouselTrack.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });

  carouselTrack.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;

    const diffX = startX - currentX;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentSlide < totalSlides) {
        currentSlide++;
      } else if (diffX < 0 && currentSlide > 0) {
        currentSlide--;
      }
      updateCarousel();
      updateNavigationButtons();
      updateIndicators();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentSlide > 0) {
      currentSlide--;
      updateCarousel();
      updateNavigationButtons();
      updateIndicators();
    } else if (e.key === 'ArrowRight' && currentSlide < totalSlides) {
      currentSlide++;
      updateCarousel();
      updateNavigationButtons();
      updateIndicators();
    }
  });

  let autoPlayInterval;

  function startAutoPlay() {
    stopAutoPlay(); // Clear any existing interval
    autoPlayInterval = setInterval(() => {
      if (currentSlide < totalSlides) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updateCarousel();
      updateNavigationButtons();
      updateIndicators();
    }, 2500);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }

  carouselTrack.addEventListener('mouseenter', stopAutoPlay);
  carouselTrack.addEventListener('mouseleave', startAutoPlay);

  window.addEventListener('resize', () => {
    const newCardsPerView = calculateCardsPerView();
    if (newCardsPerView !== cardsPerView) {
      currentSlide = 0;
      setupCarousel();
    } else {
      updateCarousel();
    }
  });

  setupCarousel();
  startAutoPlay();
}

// --- Interactive Elements (from script.js, mainly for main page) ---
function initializeInteractions() {
  document.querySelectorAll('.gem-demo-btn').forEach(button => {
    button.addEventListener('click', function () {
      const gemName = this.closest('.gem-card')?.querySelector('.gem-title')?.textContent;
      if (gemName) showNotification(`Starting ${gemName} demo...`);
    });
  });

  document.querySelectorAll('.gem-prompt-btn').forEach(button => {
    button.addEventListener('click', function () {
      const gemName = this.closest('.gem-card')?.querySelector('.gem-title')?.textContent;
      if (gemName) showNotification(`Downloading ${gemName} prompt...`);
    });
  });

  document.querySelectorAll('[data-scroll-to]').forEach(button => {
    button.addEventListener('click', function () {
      const targetId = this.getAttribute('data-scroll-to');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// --- Counter Animations (from script.js, mainly for main page) ---
function initializeCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const frames = Math.floor(duration / 16);
        let current = 0;
        const increment = target / frames;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current);
        }, 16);

        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// --- Filter System (from script.js, mainly for main page, but adapted for tools page) ---
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      currentFilter = filter;
      showNotification(`Filtered tools: ${filter === 'all' ? 'All' : filter}`);

      // This would trigger a re-render or filtering of tools on the tools page
      if (document.querySelector('.tools-page')) {
          loadTools();
      }
    });
  });
}

// --- News Section (from script.js, mainly for main page) ---
function initializeNewsSection() {
  const newsContainer = document.getElementById('animated-news-list');
  if (!newsContainer) return;

  const maxCardsToShow = 3;
  let currentCardsInView = [];
  let newsCycleIndex = 0;
  let animationPhase = 'filling';

  newsContainer.innerHTML = '';

  startNewsAnimationCycle();

  function startNewsAnimationCycle() {
    animationPhase = 'filling';
    newsContainer.innerHTML = '';
    currentCardsInView = [];
    addNextNewsCard();
  }

  function addNextNewsCard() {
    if (animationPhase !== 'filling') return;

    if (currentCardsInView.length < maxCardsToShow) {
      const currentNews = newsItems[newsCycleIndex % newsItems.length];
      const newsCardElement = createNewsCard(currentNews);

      newsContainer.insertBefore(newsCardElement, newsContainer.firstChild);

      setTimeout(() => {
        newsCardElement.style.opacity = '1';
        newsCardElement.style.transform = 'translateY(0)';
      }, 50);

      currentCardsInView.unshift(newsCardElement);
      newsCycleIndex++;

      if (currentCardsInView.length < maxCardsToShow) {
        setTimeout(addNextNewsCard, 1000);
      } else {
        setTimeout(triggerFlipAnimation, 1000);
      }
    }
  }

  function triggerFlipAnimation() {
    animationPhase = 'flipping';
    flipOutNewsCards();
  }

  function flipOutNewsCards() {
    const cardsToFlip = Array.from(newsContainer.children);

    let completedAnimations = 0;
    const totalAnimations = cardsToFlip.length;

    if (totalAnimations === 0) {
      startNewsAnimationCycle();
      return;
    }

    cardsToFlip.forEach((card) => {
      card.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      card.style.transform = 'perspective(600px) rotateX(90deg) scale(0.5)';
      card.style.opacity = '0';

      setTimeout(() => {
        if (card.parentNode) {
          card.remove();
        }
        completedAnimations++;

        if (completedAnimations === totalAnimations) {
          setTimeout(startNewsAnimationCycle, 300);
        }
      }, 500);
    });
  }

  function createNewsCard(newsItem) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';

    card.innerHTML = `
      <div class="news-card-header">
        <div class="news-icon" style="background-color: ${newsItem.color};">
          <i class="${newsItem.icon}"></i>
        </div>
        <div class="news-content">
          <div class="news-meta">
            <span class="news-category">${newsItem.category}</span>
            <span class="news-time">
              <i class="fas fa-clock"></i>
              ${newsItem.time}
            </span>
          </div>
          <h4 class="news-title">${newsItem.title}</h4>
          <p class="news-summary">${newsItem.summary}</p>
        </div>
      </div>
      <div class="news-footer">
        <div class="news-stats">
          <div class="news-stat">
            <i class="fas fa-eye"></i>
            <span>${newsItem.views}</span>
          </div>
          <div class="news-stat">
            <i class="fas fa-comment"></i>
            <span>${newsItem.comments}</span>
          </div>
        </div>
        <button class="read-more-btn">Read More</button>
      </div>
    `;
    return card;
  }
}

// --- AI Tools (Testimonials) Section Functions (from script.js, mainly for main page) ---
function createAIToolCard(tool) {
  const card = document.createElement('div');
  card.className = 'testimonial-card';

  const text = document.createElement('div');
  text.textContent = tool.text;
  card.appendChild(text);

  const author = document.createElement('div');
  author.className = 'testimonial-author';

  const img = document.createElement('img');
  img.width = 40;
  img.height = 40;
  img.src = tool.image;
  img.alt = tool.name;
  author.appendChild(img);

  const details = document.createElement('div');
  details.className = 'author-details';

  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = tool.name;
  details.appendChild(name);

  const role = document.createElement('div');
  role.className = 'role';
  role.textContent = tool.role;
  details.appendChild(role);

  author.appendChild(details);
  card.appendChild(author);

  return card;
}

function setupVerticalCarousel(rowId, tools, speed) {
  const row = document.getElementById(rowId);
  if (!row) return;
  row.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.flexDirection = 'column';
  wrapper.style.gap = getComputedStyle(row).gap || '32px';
  wrapper.style.willChange = 'transform';
  tools.forEach(tool => {
    wrapper.appendChild(createAIToolCard(tool));
  });
  row.appendChild(wrapper);
  let translateY = 0;
  let lastTimestamp = 0;
  let started = false;
  function getFirstCardHeight() {
    if (wrapper.children.length === 0) return 0;
    const card = wrapper.children[0];
    // Use clientHeight for visible height + margin-bottom if gap is not used
    return card.offsetHeight + parseInt(getComputedStyle(row).gap || 32);
  }
  function startAnimation() {
    translateY = -getFirstCardHeight();
    started = true;
    requestAnimationFrame(animate);
  }
  function animate(ts) {
    if (!started) { // Prevent animation if not explicitly started
      lastTimestamp = ts;
      requestAnimationFrame(animate);
      return;
    }
    if (!lastTimestamp) lastTimestamp = ts;
    const dt = (ts - lastTimestamp) / 1000;
    lastTimestamp = ts;
    translateY += speed * dt;
    const firstCardHeight = getFirstCardHeight();
    if (translateY >= 0) {
      wrapper.appendChild(wrapper.children[0]);
      translateY -= firstCardHeight;
    }
    wrapper.style.transform = `translateY(${translateY}px)`;
    requestAnimationFrame(animate);
  }
  setTimeout(startAnimation, 100);
}

function setupAIToolsVerticalCarousel() {
  const col1 = aiToolsData.filter((_, i) => i % 3 === 0);
  const col2 = aiToolsData.filter((_, i) => i % 3 === 1);
  const col3 = aiToolsData.filter((_, i) => i % 3 === 2);
  setupVerticalCarousel('ai-tools-row-1', col1, 40); // px/sec
  setupVerticalCarousel('ai-tools-row-2', col2, 25);
  setupVerticalCarousel('ai-tools-row-3', col3, 60);
}

// --- AI Tools Page Specific Functions ---
function initializeToolsPage() {
    initializeSearchTools();
    initializeFilterTools();
    loadTools(); // Initial load of tools
    initializeLoadMoreTools();
    initializeNewsletterSection(); // Newsletter section is also on tools page
    initializeCounters(); // Assuming the tools page also has stats with counters
}

let currentCategoryTools = 'all'; // For tools page category filter
let searchQueryTools = ''; // For tools page search

// Load and display Tools (similar to GEMS, but for tools data)
function loadTools() {
  const toolsGrid = document.getElementById('tools-grid');
  const loadMoreBtn = document.getElementById('load-more-tools'); // Ensure this ID exists
  
  if (!toolsGrid) return;
  
  let filteredTools = aiToolsData.filter(tool => { // Assuming aiToolsData is the source for tools
    const matchesCategory = currentCategoryTools === 'all' || tool.category === currentCategoryTools; // Need to align categories or handle
    const matchesSearch = tool.name.toLowerCase().includes(searchQueryTools) || 
                         tool.description.toLowerCase().includes(searchQueryTools);
    return matchesCategory && matchesSearch;
  });

  toolsGrid.innerHTML = ''; // Clear existing tools

  const toolsToShow = filteredTools.slice(0, displayedGemsItems); // Reusing displayedGemsItems for simplicity

  toolsToShow.forEach((tool, index) => {
    const toolCard = createToolCard(tool, index); // Assuming a createToolCard function exists
    toolsGrid.appendChild(toolCard);
  });

  if (loadMoreBtn) {
    if (filteredTools.length > displayedGemsItems) {
      loadMoreBtn.style.display = 'flex';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  setTimeout(() => {
    document.querySelectorAll('.tool-card:not(.animate-in)').forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 100);
    });
  }, 100);
}

// Function to create a tool card (simplified, needs to match your HTML structure)
function createToolCard(tool, index) {
  const card = document.createElement('div');
  card.className = 'tool-card';
  card.style.animationDelay = `${index * 0.1}s`;

  card.innerHTML = `
    <div class="tool-card-header">
      <div class="tool-icon" style="background-color: ${getToolIconColor(tool.category)};">${tool.iconContent || '✨'}</div>
      <div class="tool-rating">
        <i class="fas fa-star"></i>
        <span>${tool.rating || 'N/A'}</span>
      </div>
    </div>
    <h3 class="tool-name">${tool.name}</h3>
    <p class="tool-description">${tool.description}</p>
    <div class="tool-card-footer">
      <div class="tool-users">
        <i class="fas fa-users"></i>
        <span>${tool.users || 'N/A'}</span>
      </div>
      <div class="tool-actions">
        <button class="tool-btn primary">Try Now</button>
        <button class="tool-btn secondary">
          <i class="fas fa-bookmark"></i>
        </button>
      </div>
    </div>
  `;
  return card;
}

// Helper for tool card icon color (example, adjust as needed)
function getToolIconColor(category) {
  switch(category) {
    case 'Content Creation': return '#6f42c1';
    case 'Business & Finance': return '#28a745';
    case 'Education': return '#007bff';
    case 'Development': return '#f06529';
    case 'Writing & Arts': return '#8E44AD';
    case 'Generative AI': return '#dc3545';
    case 'Support': return '#ffc107';
    case 'Productivity': return '#17a2b8';
    case 'AI Search': return '#6c757d';
    case 'Video Generation': return '#fd7e14';
    case 'Image Generation': return '#20c997';
    case 'AI Writing': return '#6610f2';
    case 'Creative Suite': return '#e83e8c';
    default: return '#6c757d';
  }
}

function initializeSearchTools() {
  const searchInput = document.getElementById('tools-search');
  
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      searchQueryTools = e.target.value.toLowerCase();
      displayedGemsItems = 12; // Reset displayed items on search
      loadTools();
    });
  }
}

function initializeFilterTools() {
  const categoryFilter = document.getElementById('category-filter-tools'); // New ID for tools page dropdown
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function(e) {
      currentCategoryTools = e.target.value;
      displayedGemsItems = 12; // Reset displayed items on filter change
      loadTools();
    });
  }
}

function initializeLoadMoreTools() {
  const loadMoreBtn = document.getElementById('load-more-tools');
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      displayedGemsItems += gemsPerLoad;
      loadTools();
      
      this.classList.add('loading');
      setTimeout(() => {
        this.classList.remove('loading');
      }, 1000);
    });
  }
}

function initializeNewsletterSection() {
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterInput = document.getElementById('newsletter-email');
  const newsletterBtn = document.getElementById('newsletter-submit');

  if (newsletterForm && newsletterInput && newsletterBtn) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = newsletterInput.value;
      if (email && email.includes('@')) {
        showNotification(`Subscribing ${email}...`);
        newsletterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        newsletterBtn.disabled = true;

        setTimeout(() => {
          newsletterInput.value = '';
          showNotification('Successfully subscribed!');
          newsletterBtn.innerHTML = 'Subscribe <i class="fas fa-arrow-right"></i>';
          newsletterBtn.disabled = false;
        }, 2000);
      } else {
        showNotification('Please enter a valid email address.');
        newsletterInput.classList.add('error');
        setTimeout(() => newsletterInput.classList.remove('error'), 1000);
      }
    });
  }
}


// --- GEMS Page Specific Functions ---
function initializeGemsPage() {
  initializeSearchGems();
  initializeCategoryFilterGems();
  initializeCategoryCards();
  initializeGemsParticles();
  loadGems(); // Initial load of gems
  initializeLoadMoreGems();
  initializeCreateGem(); // Button at the bottom of GEMS page
  initializeCategoryHoverEffects();
}


// Search functionality for GEMS page
function initializeSearchGems() {
  const searchInput = document.getElementById('gems-search');
  
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      searchQueryGems = e.target.value.toLowerCase();
      displayedGemsItems = 12; // Reset displayed items on search
      loadGems();
    });
  }
}

// Category filter functionality for GEMS page
function initializeCategoryFilterGems() {
  const categoryFilter = document.getElementById('category-filter');
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function(e) {
      currentCategoryGems = e.target.value;
      displayedGemsItems = 12; // Reset displayed items on filter change
      loadGems();
    });
  }
}

// Category cards functionality for GEMS page
function initializeCategoryCards() {
  const categoryCards = document.querySelectorAll('.category-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.dataset.category;
      currentCategoryGems = category;
      displayedGemsItems = 12;
      
      const categoryFilter = document.getElementById('category-filter');
      if (categoryFilter) {
        categoryFilter.value = category;
      }
      
      const gemsGrid = document.getElementById('gems-grid');
      if (gemsGrid) {
        gemsGrid.scrollIntoView({ behavior: 'smooth' });
      }
      loadGems();
    });
  });
}

// Load and display GEMS for GEMS page
function loadGems() {
  const gemsGrid = document.getElementById('gems-grid');
  const loadMoreBtn = document.getElementById('load-more-gems');
  
  if (!gemsGrid) return;
  
  let filteredGems = geminiGems.filter(gem => {
    const matchesCategory = currentCategoryGems === 'all' || gem.category === currentCategoryGems;
    const matchesSearch = gem.name.toLowerCase().includes(searchQueryGems) || 
                         gem.description.toLowerCase().includes(searchQueryGems) ||
                         gem.features.some(feature => feature.toLowerCase().includes(searchQueryGems));
    return matchesCategory && matchesSearch;
  });

  gemsGrid.innerHTML = ''; // Clear existing GEMS

  const gemsToShow = filteredGems.slice(0, displayedGemsItems);
  
  gemsToShow.forEach((gem, index) => {
    const gemCard = createGemCard(gem, index);
    gemsGrid.appendChild(gemCard);
  });

  if (loadMoreBtn) {
    if (filteredGems.length > displayedGemsItems) {
      loadMoreBtn.style.display = 'flex';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  setTimeout(() => {
    document.querySelectorAll('.gem-card:not(.animate-in)').forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 100);
    });
  }, 100);
}

// Create gem card element (for GEMS page)
function createGemCard(gem, index) {
  const card = document.createElement('div');
  card.className = 'gem-card';
  card.style.animationDelay = `${index * 0.1}s`;

  card.innerHTML = `
    <div class="gem-header">
      <div class="gem-icon">${gem.icon}</div>
      <div class="gem-rating">
        <i class="fas fa-star"></i>
        <span>${gem.rating}</span>
      </div>
    </div>
    <div class="gem-content">
      <h3 class="gem-title">${gem.name}</h3>
      <p class="gem-category">${getCategoryDisplayName(gem.category)}</p>
      <p class="gem-description">${gem.description}</p>
      <div class="gem-features">
        ${gem.features.map(feature => `
          <div class="feature">
            <i class="fas fa-check"></i>
            <span>${feature}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="gem-footer">
      <div class="gem-users">
        <i class="fas fa-users"></i>
        <span>${gem.users}</span>
      </div>
      <div class="gem-actions">
        <button class="gem-btn primary">Try Now</button>
        <button class="gem-btn secondary">
          <i class="fas fa-bookmark"></i>
        </button>
      </div>
    </div>
  `;
  return card;
}

// Get category display name (for GEMS page)
function getCategoryDisplayName(category) {
  const categoryNames = {
    'content': 'Content Creation',
    'business': 'Business & Finance',
    'education': 'Education',
    'development': 'Development',
    'creative': 'Creative Arts',
    'research': 'Research'
  };
  return categoryNames[category] || category;
}

// Load more functionality for GEMS page
function initializeLoadMoreGems() {
  const loadMoreBtn = document.getElementById('load-more-gems');
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      displayedGemsItems += gemsPerLoad;
      loadGems();
      
      this.classList.add('loading');
      setTimeout(() => {
        this.classList.remove('loading');
      }, 1000);
    });
  }
}

// Initialize particle animation for GEMS page
function initializeGemsParticles() {
  const particles = document.querySelectorAll('.gem-particles .particle');
  
  particles.forEach((particle) => {
    const randomDelay = Math.random() * 3;
    const randomDuration = 4 + Math.random() * 3;
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    
    particle.style.left = `${randomX}%`;
    particle.style.top = `${randomY}%`;
    particle.style.animationDelay = `${randomDelay}s`;
    particle.style.animationDuration = `${randomDuration}s`;
  });
}

// Create GEM button functionality for GEMS page
function initializeCreateGem() {
  const createGemBtn = document.querySelector('.create-gem-btn');
  
  if (createGemBtn) {
    createGemBtn.addEventListener('click', function() {
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
      
      setTimeout(() => {
        this.innerHTML = '<span>Start Creating</span><i class="fas fa-arrow-right"></i>';
        alert('GEM creation feature coming soon!');
      }, 2000);
    });
  }
}

// Add hover effects for category cards on GEMS page
function initializeCategoryHoverEffects() {
  const categoryCards = document.querySelectorAll('.category-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Cleanup function for news interval (common for main page)
window.addEventListener('beforeunload', () => {
  if (newsInterval) {
    clearInterval(newsInterval);
  }
});