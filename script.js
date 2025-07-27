// AI Portal - Light Mode JavaScript with Starting Animation and Carousel
// Global variables
let isLoading = true;
let scrollProgress = 0;
let currentFilter = 'all';
let newsIndex = 0;
let newsInterval;

// Carousel variables
let currentSlide = 0;
let carouselCards = [];
let cardsPerView = 3;
let totalSlides = 0;

// News data (converted from React)
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

// GPT Cards data
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initializeModeToggle(); // Add this before other inits
  initializeStartingAnimation();
  initializeHeroGradientAnimation(); // Add this for hero animation
  console.log('✨ AI Portal initialized with starting animation and carousel');
});

// Dark/Light Mode Toggle
function initializeModeToggle() {
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  const icon = modeToggle.querySelector('i');

  // Helper to set icon
  function updateIcon(isDark) {
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

  // Detect saved or system preference
  function getPreferredMode() {
    const saved = localStorage.getItem('theme-mode');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Set mode
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

  // Initial mode
  setMode(getPreferredMode());

  // Toggle on click
  modeToggle.addEventListener('click', function () {
    const isDark = body.classList.contains('dark');
    setMode(isDark ? 'light' : 'dark');
  });
}

// Starting Animation Handler
function initializeStartingAnimation() {
  const initialAnimationContainer = document.querySelector('.container'); // Renamed from initial-animation-container for consistency with HTML
  const mainContent = document.querySelector('.main-content');
  const animatedText = document.querySelector('.animated-text');
  // const underlinePath = document.getElementById('underline-path'); // Not directly manipulated here

  // Ensure initial text is ready for animation
  if (animatedText) {
    animatedText.style.opacity = '0';
    animatedText.style.transform = 'translateY(20px)';
    // Trigger animation for text to fade in
    setTimeout(() => {
      animatedText.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      animatedText.style.opacity = '1';
      animatedText.style.transform = 'translateY(0)';
    }, 100); // Small delay for CSS to apply
  }

  // Set the duration for the entire starting animation sequence
  // This includes drawLine (2.5s) + a small buffer (0.5s) + fade out (1s) + small buffer (0.1s)
  const totalStartingAnimationDuration = 2500 + 500 + 1000 + 100; // 4100ms or 4.1 seconds

  setTimeout(() => {
    // Fade out the starting animation container
    if (initialAnimationContainer) {
      initialAnimationContainer.style.transition = 'opacity 1s ease-out';
      initialAnimationContainer.style.opacity = '0';

      // After fade out, hide it completely and show main content
      setTimeout(() => {
        if (initialAnimationContainer) {
          initialAnimationContainer.style.display = 'none';
        }
        if (mainContent) {
          mainContent.style.display = 'block'; // Or 'flex', 'grid' as appropriate
          // Fade in main content
          setTimeout(() => {
            mainContent.classList.add('show'); // 'show' class has opacity: 1 and a transition
            initializeMainWebsite(); // Initialize main website functionalities
          }, 100); // Small delay to allow display property to settle
        }
      }, 1000); // Duration of the fade-out transition
    }
  }, 2500 + 500); // Start fade-out after underline draw animation (2.5s) + buffer (0.5s)
}

// Initialize main website functionality
function initializeMainWebsite() {
  initializeScrollEffects();
  initializeAnimations();
  initializeInteractions();
  initializeCounters();
  initializeFilters();
  initializeMobileMenu();
  initializeNewsSection();
  initializeCarousel(); // Initialize carousel
  enhanceAccessibility(); // Call accessibility enhancements here
  console.log('🚀 Main website initialized');
}

// Carousel Functions
function initializeCarousel() {
  const carouselTrack = document.getElementById('carousel-track');
  const carouselPrev = document.getElementById('carousel-prev');
  const carouselNext = document.getElementById('carousel-next');
  const carouselIndicators = document.getElementById('carousel-indicators');

  if (!carouselTrack) return;

  // Calculate cards per view based on screen size
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

  // Create GPT cards
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

  // Initialize carousel
  function setupCarousel() {
    cardsPerView = calculateCardsPerView();
    totalSlides = Math.max(0, gpts.length - cardsPerView);
    
    // Clear existing cards
    carouselTrack.innerHTML = '';
    carouselCards = [];

    // Create and append cards
    gpts.forEach(gpt => {
      const card = createGptCard(gpt);
      carouselTrack.appendChild(card);
      carouselCards.push(card);
    });

    // Create indicators
    createIndicators();
    
    // Update carousel position
    updateCarousel();
    
    // Update navigation buttons
    updateNavigationButtons();
  }

  // Create indicator dots
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

  // Update carousel position
  function updateCarousel() {
    const cardWidth = carouselCards[0]?.offsetWidth || 320;
    const gap = 20; // CSS gap value
    const translateX = -(currentSlide * (cardWidth + gap));
    
    carouselTrack.style.transform = `translateX(${translateX}px)`;
  }

  // Update navigation buttons
  function updateNavigationButtons() {
    if (carouselPrev) {
      carouselPrev.disabled = currentSlide === 0;
    }
    if (carouselNext) {
      carouselNext.disabled = currentSlide >= totalSlides;
    }
  }

  // Update indicators
  function updateIndicators() {
    if (!carouselIndicators) return;
    
    const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }

  // Navigation event listeners
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

  // Touch/swipe support
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
        // Swipe left - next slide
        currentSlide++;
      } else if (diffX < 0 && currentSlide > 0) {
        // Swipe right - previous slide
        currentSlide--;
      }
      
      updateCarousel();
      updateNavigationButtons();
      updateIndicators();
    }
  });

  // Keyboard navigation
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

  // Auto-play (optional)
  let autoPlayInterval;
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (currentSlide < totalSlides) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updateCarousel();
      updateNavigationButtons();
      updateIndicators();
    }, 2500); // Change slide every 5 seconds
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }

  // Pause auto-play on hover
  carouselTrack.addEventListener('mouseenter', stopAutoPlay);
  carouselTrack.addEventListener('mouseleave', startAutoPlay);

  // Handle window resize
  window.addEventListener('resize', () => {
    const newCardsPerView = calculateCardsPerView();
    if (newCardsPerView !== cardsPerView) {
      currentSlide = 0; // Reset to first slide
      setupCarousel();
    } else {
      updateCarousel();
    }
  });

  // Initialize carousel
  setupCarousel();
  
  // Start auto-play
  startAutoPlay();
}

// Scroll Effects
function initializeScrollEffects() {
  const header = document.getElementById('header');
  const scrollProgressBar = document.getElementById('scroll-progress');

  let ticking = false;

  function updateScrollEffects() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = (scrollTop / docHeight) * 100;

    // Update scroll progress bar
    scrollProgressBar.style.width = scrollProgress + '%';

    // Header scroll effect
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

// General Animations
function initializeAnimations() {
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
  document.querySelectorAll('button, .button').forEach(button => { // Added .button for anchor-based buttons
    button.addEventListener('click', function (e) {
      // Prevent ripple on disabled or already "disabled" looking buttons
      if (this.disabled || this.classList.contains('disabled')) {
        return;
      }

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple); // Append to the button itself

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2; // Make ripple larger
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.transform = `translate(-50%, -50%) scale(0)`; // Initial scale for animation

      // Trigger animation
      requestAnimationFrame(() => {
        ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        ripple.style.transform = `translate(-50%, -50%) scale(1)`;
        ripple.style.opacity = '0'; // Starts fading out immediately
      });

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Interactive Elements
function initializeInteractions() {
  // GEM interactions
  document.querySelectorAll('.gem-demo-btn').forEach(button => {
    button.addEventListener('click', function () {
      const gemName = this.closest('.gem-card').querySelector('.gem-title').textContent;
      showNotification(`Starting ${gemName} demo...`);
    });
  });

  document.querySelectorAll('.gem-prompt-btn').forEach(button => {
    button.addEventListener('click', function () {
      const gemName = this.closest('.gem-card').querySelector('.gem-title').textContent;
      showNotification(`Downloading ${gemName} prompt...`);
    });
  });

  // CTA button interactions
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

// Counter Animations
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
        const duration = 2000; // 2 seconds
        const frames = Math.floor(duration / 16); // ~60 frames per second
        let current = 0;
        const increment = target / frames;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current);
        }, 16); // Roughly 60fps

        observer.unobserve(counter); // Stop observing once counted
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Filter System (commented out as no HTML grid to filter)
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      currentFilter = filter;
      showNotification(`Filtered tools: ${filter === 'all' ? 'All' : filter}`);

      // Here you would typically re-render or show/hide tool cards based on `filter`
    });
  });
}

// Mobile Menu
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobile-menu');
  const nav = document.querySelector('.nav');

  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      nav.classList.toggle('active');

      // Animate menu icon
      const spans = this.querySelectorAll('span');
      if (this.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
      }
    });
  }
}

// News Section (converted from React AnimatedList)
function initializeNewsSection() {
  const newsContainer = document.getElementById('animated-news-list');
  if (!newsContainer) return;

  // Configuration for the new animation
  const maxCardsToShow = 3; // Number of cards to show before flipping
  let currentCardsInView = []; // Track cards currently displayed
  let newsCycleIndex = 0; // Tracks overall position in newsItems array across cycles
  let animationPhase = 'filling'; // 'filling', 'flipping', 'resetting'

  // Clear existing content (important for re-initialization if ever needed)
  newsContainer.innerHTML = ''; // Ensure it starts truly empty

  // Start the animated news feed
  startNewsAnimationCycle();

  function startNewsAnimationCycle() {
    animationPhase = 'filling';
    newsContainer.innerHTML = ''; // Clear container for new cycle
    currentCardsInView = []; // Reset cards in view
    addNextNewsCard(); // Start adding the first card of the new cycle
  }

  function addNextNewsCard() {
    if (animationPhase !== 'filling') return; // Only add if in filling phase

    if (currentCardsInView.length < maxCardsToShow) {
      const currentNews = newsItems[newsCycleIndex % newsItems.length];
      const newsCardElement = createNewsCard(currentNews);

      // Add to top of container (stacking effect)
      newsContainer.insertBefore(newsCardElement, newsContainer.firstChild);

      // Animate in
      setTimeout(() => {
        newsCardElement.style.opacity = '1';
        newsCardElement.style.transform = 'translateY(0)';
      }, 50); // Small delay to ensure initial styles are applied before transition

      currentCardsInView.unshift(newsCardElement); // Add to the beginning of the tracking array
      newsCycleIndex++; // Advance global news index

      // Schedule next card addition or transition to flip phase
      if (currentCardsInView.length < maxCardsToShow) {
        setTimeout(addNextNewsCard, 1000); // Reduced delay between adding each card
      } else {
        // Container is full, hold for a moment then flip
        setTimeout(triggerFlipAnimation, 1000); // Reduced hold time before flip
      }
    }
  }

  function triggerFlipAnimation() {
    animationPhase = 'flipping';
    flipOutNewsCards(); // Start flip out animation for all cards
  }

  function flipOutNewsCards() {
    // Collect all current news cards
    const cardsToFlip = Array.from(newsContainer.children); // Get live elements

    let completedAnimations = 0;
    const totalAnimations = cardsToFlip.length;

    if (totalAnimations === 0) {
      // If no cards for some reason, just reset
      startNewsAnimationCycle();
      return;
    }

    cardsToFlip.forEach((card, index) => {
      // Apply flip/fade out styles
      card.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      card.style.transform = 'perspective(600px) rotateX(90deg) scale(0.5)'; // Flip and shrink
      card.style.opacity = '0';

      // Remove after animation completes
      setTimeout(() => {
        if (card.parentNode) { // Check if still in DOM
          card.remove();
        }
        completedAnimations++;

        // When all cards have finished their flip-out animation
        if (completedAnimations === totalAnimations) {
          // All cards are gone, start a new cycle after a small pause
          setTimeout(startNewsAnimationCycle, 300); // Reduced pause before new cycle starts
        }
      }, 500); // Match card transition duration
    });
  }

  // Helper function to create news card element
  function createNewsCard(newsItem) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.style.opacity = '0'; // Initial state for animation
    card.style.transform = 'translateY(30px)'; // Initial state for animation

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

// --- HERO SECTION ANIMATED GRADIENT ---
function initializeHeroGradientAnimation() {
  const hero = document.querySelector('.hero');
  const primaryButton = document.querySelector('.primary-button');
  if (!hero || !primaryButton) return;

  const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
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

    // Use a dark base for both modes, but you can tweak for light mode if needed
    hero.style.background = `radial-gradient(125% 125% at 50% 0%, #020617 50%, ${newHex})`;
    primaryButton.style.border = `1px solid ${newHex}`;
    primaryButton.style.boxShadow = `0px 4px 24px ${newHex}`;

    const delta = Math.abs(currentColor.r - targetColor.r) +
      Math.abs(currentColor.g - targetColor.g) +
      Math.abs(currentColor.b - targetColor.b);

    if (delta < 5) {
      currentColorIndex = (currentColorIndex + 1) % COLORS.length;
      targetColor = hexToRgb(COLORS[currentColorIndex]);
    }

    requestAnimationFrame(animateGradient);
  }

  animateGradient();
}

// --- AI TOOLS (TESTIMONIALS) SECTION JS ---
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
    // Create a wrapper for seamless looping
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
        return card.offsetHeight + parseInt(getComputedStyle(row).gap || 32);
    }
    function startAnimation() {
        // Start with the wrapper shifted up by the height of the first card
        translateY = -getFirstCardHeight();
        started = true;
        requestAnimationFrame(animate);
    }
    function animate(ts) {
        if (!lastTimestamp) lastTimestamp = ts;
        const dt = (ts - lastTimestamp) / 1000;
        lastTimestamp = ts;
        translateY += speed * dt;
        const firstCardHeight = getFirstCardHeight();
        if (translateY >= 0) {
            // Move first card to end and adjust translateY
            wrapper.appendChild(wrapper.children[0]);
            translateY -= firstCardHeight;
        }
        wrapper.style.transform = `translateY(${translateY}px)`;
        requestAnimationFrame(animate);
    }
    // Wait for layout, then start
    setTimeout(startAnimation, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    // Distribute tools among 3 columns as evenly as possible
    const col1 = aiToolsData.filter((_, i) => i % 3 === 0);
    const col2 = aiToolsData.filter((_, i) => i % 3 === 1);
    const col3 = aiToolsData.filter((_, i) => i % 3 === 2);
    setupVerticalCarousel('ai-tools-row-1', col1, 40); // px/sec
    setupVerticalCarousel('ai-tools-row-2', col2, 25);
    setupVerticalCarousel('ai-tools-row-3', col3, 60);
});

function redirectToAllTools() {
    window.location.href = 'your-ai-tools-page.html';
}

// Notification function
function showNotification(message) {
  const notification = document.getElementById('notification');
  const notificationText = notification.querySelector('.notification-text');
  
  if (notification && notificationText) {
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
}

// Accessibility enhancements
function enhanceAccessibility() {
  // Add keyboard navigation support
  document.body.classList.add('keyboard-navigation');
  
  // Focus management for carousel
  const carouselCards = document.querySelectorAll('.gpt-card');
  carouselCards.forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `GPT card ${index + 1}`);
  });
}

// Cleanup function for news interval
window.addEventListener('beforeunload', () => {
  if (newsInterval) {
    clearInterval(newsInterval);
  }
});

console.log('🎨 AI Portal loaded with light mode, starting animation, and carousel');

