// Gemini GEMS Page JavaScript
// Sample GEMS data
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

// Global variables
let currentCategory = 'all';
let searchQuery = '';
let displayedGems = 12;
const gemsPerLoad = 8;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  initializeModeToggle();
  initializeSearch();
  initializeCategoryFilter();
  initializeCategoryCards();
  initializeMobileMenu();
  initializeScrollEffects();
  initializeAnimations();
  loadGems();
  initializeLoadMore();
  initializeParticles();
  
  console.log('💎 Gemini GEMS page initialized');
});

// Mode toggle functionality
function initializeModeToggle() {
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  const icon = modeToggle.querySelector('i');

  function updateIcon(isDark) {
    if (isDark) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
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
  }

  setMode(getPreferredMode());

  modeToggle.addEventListener('click', function() {
    const isDark = body.classList.contains('dark');
    setMode(isDark ? 'light' : 'dark');
  });
}

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById('gems-search');
  
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      searchQuery = e.target.value.toLowerCase();
      displayedGems = 12;
      loadGems();
    });
  }
}

// Category filter functionality
function initializeCategoryFilter() {
  const categoryFilter = document.getElementById('category-filter');
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function(e) {
      currentCategory = e.target.value;
      displayedGems = 12;
      loadGems();
    });
  }
}

// Category cards functionality
function initializeCategoryCards() {
  const categoryCards = document.querySelectorAll('.category-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.dataset.category;
      currentCategory = category;
      displayedGems = 12;
      
      // Update the select dropdown
      const categoryFilter = document.getElementById('category-filter');
      if (categoryFilter) {
        categoryFilter.value = category;
      }
      
      // Scroll to gems grid
      const gemsGrid = document.getElementById('gems-grid');
      if (gemsGrid) {
        gemsGrid.scrollIntoView({ behavior: 'smooth' });
      }
      
      loadGems();
    });
  });
}

// Mobile menu functionality
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

// Scroll effects
function initializeScrollEffects() {
  const header = document.getElementById('header');
  const scrollProgressBar = document.getElementById('scroll-progress');

  let ticking = false;

  function updateScrollEffects() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollTop / docHeight) * 100;

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

// Animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements that should animate
  document.querySelectorAll('.gem-card, .category-card, .feature-highlight').forEach(el => {
    observer.observe(el);
  });
}

// Load and display GEMS
function loadGems() {
  const gemsGrid = document.getElementById('gems-grid');
  const loadMoreBtn = document.getElementById('load-more-gems');
  
  if (!gemsGrid) return;
  
  // Filter GEMS based on current category and search query
  let filteredGems = geminiGems.filter(gem => {
    const matchesCategory = currentCategory === 'all' || gem.category === currentCategory;
    const matchesSearch = gem.name.toLowerCase().includes(searchQuery) || 
                         gem.description.toLowerCase().includes(searchQuery) ||
                         gem.features.some(feature => feature.toLowerCase().includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  // Clear existing GEMS
  gemsGrid.innerHTML = '';

  // Display GEMS up to the current limit
  const gemsToShow = filteredGems.slice(0, displayedGems);
  
  gemsToShow.forEach((gem, index) => {
    const gemCard = createGemCard(gem, index);
    gemsGrid.appendChild(gemCard);
  });

  // Show/hide load more button
  if (loadMoreBtn) {
    if (filteredGems.length > displayedGems) {
      loadMoreBtn.style.display = 'flex';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  // Trigger animations for new cards
  setTimeout(() => {
    document.querySelectorAll('.gem-card:not(.animate-in)').forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 100);
    });
  }, 100);
}

// Create gem card element
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

// Get category display name
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

// Load more functionality
function initializeLoadMore() {
  const loadMoreBtn = document.getElementById('load-more-gems');
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      displayedGems += gemsPerLoad;
      loadGems();
      
      // Add loading animation
      this.classList.add('loading');
      setTimeout(() => {
        this.classList.remove('loading');
      }, 1000);
    });
  }
}

// Initialize particle animation
function initializeParticles() {
  const particles = document.querySelectorAll('.gem-particles .particle');
  
  particles.forEach((particle, index) => {
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

// Create GEM button functionality
function initializeCreateGem() {
  const createGemBtn = document.querySelector('.create-gem-btn');
  
  if (createGemBtn) {
    createGemBtn.addEventListener('click', function() {
      // Simulate navigation to GEM creation page
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
      
      setTimeout(() => {
        this.innerHTML = '<span>Start Creating</span><i class="fas fa-arrow-right"></i>';
        // Here you would typically navigate to the creation page
        alert('GEM creation feature coming soon!');
      }, 2000);
    });
  }
}

// Initialize create GEM functionality when page loads
document.addEventListener('DOMContentLoaded', initializeCreateGem);

// Add hover effects for category cards
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

// Initialize category hover effects
document.addEventListener('DOMContentLoaded', initializeCategoryHoverEffects);

