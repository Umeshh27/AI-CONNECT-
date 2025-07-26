// AI Portal - Light Mode JavaScript with Starting Animation
// Global variables
let isLoading = true;
let scrollProgress = 0;
let currentFilter = 'all';
let newsIndex = 0;
let newsInterval;

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


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initializeModeToggle(); // Add this before other inits
  initializeStartingAnimation();
  initializeHeroGradientAnimation(); // Add this for hero animation
  console.log('✨ AI Portal initialized with starting animation');
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
  initializeConnectSectionAnimations(); // NEW: Initialize connect section animations here
  enhanceAccessibility(); // Call accessibility enhancements here
  console.log('🚀 Main website initialized');
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
  // Sector card interactions (commented out as no HTML provided)
  /*
  document.querySelectorAll('.sector-card').forEach(card => {
    card.addEventListener('click', function () {
      const sector = this.getAttribute('data-sector');
      showNotification(`Exploring ${sector} sector...`);

      this.style.transform = 'translateY(-8px) scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'translateY(-8px) scale(1)';
      }, 150);
    });
  });
  */

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

  // Helper function to create news card element (remains mostly same, but internal styles moved)
  function createNewsCard(newsItem) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.style.opacity = '0'; // Initial state for animation
    card.style.transform = 'translateY(30px)'; // Initial state for animation

    // Set the icon class directly for Font Awesome
    const iconHtml = `<i class="${newsItem.icon}"></i>`;

    card.innerHTML = `
      <div class="news-card-header">
        <div class="news-icon" style="background-color: ${newsItem.color}">
          ${iconHtml}
        </div>
        <div class="news-content">
          <div class="news-meta">
            <span class="news-category">${newsItem.category}</span>
            <span>•</span>
            <div class="news-time">
              <i class="fas fa-clock"></i>
              <span>${newsItem.time}</span>
            </div>
          </div>
          <h3 class="news-title">${newsItem.title}</h3>
        </div>
      </div>

      <p class="news-summary">${newsItem.summary}</p>

      <div class="news-footer">
        <div class="news-stats">
          <div class="news-stat">
            <i class="fas fa-eye"></i>
            <span>${newsItem.views.toLocaleString()}</span>
          </div>
          <div class="news-stat">
            <i class="fas fa-comment"></i>
            <span>${newsItem.comments}</span>
          </div>
        </div>
        <button class="read-more-btn">
          Read more
        </button>
      </div>
    `;

    // Add click handler
    card.addEventListener('click', () => {
      showNotification(`Opening article: ${newsItem.title.substring(0, 30)}...`);
    });

    return card;
  }
}

// Notification System
function showNotification(message) {
  const notification = document.getElementById('notification');
  const notificationText = notification.querySelector('.notification-text');

  if (!notification || !notificationText) return; // Ensure elements exist

  notificationText.textContent = message;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Utility Functions (debounce and throttle remain)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Accessibility Enhancements (moved into initializeMainWebsite)
function enhanceAccessibility() {
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });

  // Focus management
  document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  ).forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid #6366f1';
      element.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', () => {
      element.style.outline = 'none';
    });
  });
}

// NEW: Function to initialize Connect Section specific animations
function initializeConnectSectionAnimations() {
  const pointer = document.getElementById('pointer');
  const javascriptLabel = document.getElementById('javascript');
  const reactJsLabel = document.getElementById('react-js');
  const typescriptLabel = document.getElementById('typescript');
  const nextJsLabel = document.getElementById('next-js');
  const particlesContainer = document.querySelector('.connect-section .particles-container');
  const contentWrapper = document.querySelector('.connect-section .content-wrapper');

  // Ensure all required elements exist before proceeding with animations
  if (!pointer || !javascriptLabel || !reactJsLabel || !typescriptLabel || !nextJsLabel || !particlesContainer || !contentWrapper) {
    console.warn("Connect section animation elements not found. Skipping initialization.");
    return;
  }

  const labels = [
    { element: javascriptLabel, targetLeft: 200, targetTop: 60, text: "Branding" }, // Initial position
    { element: reactJsLabel, targetLeft: 50, targetTop: 102, text: "Graphic Design" },
    { element: typescriptLabel, targetLeft: 224, targetTop: 170, text: "Web Application" },
    { element: nextJsLabel, targetLeft: 88, targetTop: 198, text: "UI-UX" }
  ];

  let animationIndex = 0;
  let sequenceTimeout; // To store timeout ID for control

  // Set initial opacity for all labels
  labels.forEach(label => {
    label.element.style.opacity = '0.5';
    label.element.style.transition = 'opacity 0.3s ease-in-out';
  });

  // Set initial pointer position and transition once
  pointer.style.left = `${labels[0].targetLeft}px`;
  pointer.style.top = `${labels[0].targetTop}px`;
  pointer.style.transition = 'left 0.5s ease-in-out, top 0.5s ease-in-out';
  pointer.querySelector('.pointer-text').textContent = labels[0].text;


  function animateConnectSequence() {
    // Clear previous timeout to prevent multiple loops
    if (sequenceTimeout) clearTimeout(sequenceTimeout);

    const currentLabelData = labels[animationIndex];
    const prevLabelData = labels[(animationIndex - 1 + labels.length) % labels.length];

    // Fade out previous label (if not the very first step)
    if (animationIndex > 0 || prevLabelData.element !== labels[0].element) { // Avoid fading out first label on initial run
      prevLabelData.element.style.opacity = '0.5';
    }


    // Highlight current label
    currentLabelData.element.style.opacity = '1';
    pointer.querySelector('.pointer-text').textContent = currentLabelData.text;


    // Animate pointer to current label's position
    pointer.style.left = `${currentLabelData.targetLeft}px`;
    pointer.style.top = `${currentLabelData.targetTop}px`;

    // Advance index for next iteration
    animationIndex = (animationIndex + 1) % labels.length;

    // Schedule next step
    const transitionDuration = 500; // Pointer move duration
    const highlightDuration = 1000; // How long label is highlighted
    const totalStepDuration = transitionDuration + highlightDuration;

    sequenceTimeout = setTimeout(animateConnectSequence, totalStepDuration);
  }

  // Start the animation loop
  animateConnectSequence();


  // --- Particle Effect ---
  const particleStyle = document.createElement("style");
  particleStyle.type = "text/css";
  particleStyle.innerText = `
        .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            border-radius: 50%;
            background-color: var(--particle-color, rgba(0,0,0,0.5));
            animation: particle-move var(--particle-duration) linear infinite var(--particle-delay);
        }
        @keyframes particle-move {
            from {
                transform: translateY(0) scale(1);
                opacity: var(--particle-opacity-start, 0.7); /* Default start opacity */
            }
            to {
                transform: translateY(-120vh) scale(0.5);
                opacity: var(--particle-opacity-end, 0); /* Default end opacity */
            }
        }
    `;
  document.head.appendChild(particleStyle);

  // Set initial particle color variable based on mode
  function setParticleColorByMode() {
    particlesContainer.style.setProperty('--particle-color', 'rgba(255,255,255,0.5)');
  }
  setParticleColorByMode();
  // Listen for mode changes
  const observer = new MutationObserver(setParticleColorByMode);
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  // Create particles
  const quantity = 150;
  for (let i = 0; i < quantity; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    // Randomize initial position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    // Randomize animation properties using CSS variables
    particle.style.setProperty('--particle-duration', `${Math.random() * 8 + 6}s`);
    particle.style.setProperty('--particle-delay', `${Math.random() * 6}s`);
    particle.style.setProperty('--particle-opacity-start', `${Math.random() * 0.7 + 0.3}`);
    particlesContainer.appendChild(particle);
  }

  // --- Yellow Hover Effect ---
  // Inject dynamic CSS for the hover effect once
  const hoverStyle = document.createElement("style");
  hoverStyle.type = "text/css";
  hoverStyle.innerText = `
        .content-wrapper::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 0, 0.2); /* Yellow with some transparency */
            opacity: 0;
            transition: opacity 0.2s ease-in-out, transform 0.2s ease-out;
            transform-origin: center center; /* Changed origin to center */
            pointer-events: none; /* Allow mouse events to pass through */
            border-radius: inherit; /* Inherit border-radius from parent */
            transform: translate(var(--highlight-x, 0), var(--highlight-y, 0)) scale(0); /* Initial scale 0 */
            width: 80px; /* Fixed size */
            height: 80px; /* Fixed size */
            border-radius: 50%; /* Circular highlight */
        }
        .content-wrapper.hovering::before {
            opacity: 1;
            transform: translate(var(--highlight-x), var(--highlight-y)) scale(1);
        }
    `;
  document.head.appendChild(hoverStyle);

  // Event listeners for mouse interaction
  contentWrapper.addEventListener('mousemove', (e) => {
    const rect = contentWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = 80; // Size of the yellow highlight
    const offsetX = size / 2;
    const offsetY = size / 2;

    // Set CSS variables for position, centered on the cursor
    contentWrapper.style.setProperty('--highlight-x', `${x - offsetX}px`);
    contentWrapper.style.setProperty('--highlight-y', `${y - offsetY}px`);

    // Add 'hovering' class if mouse is over contentWrapper
    if (!contentWrapper.classList.contains('hovering')) {
      contentWrapper.classList.add('hovering');
    }
  });

  contentWrapper.addEventListener('mouseleave', () => {
    contentWrapper.classList.remove('hovering');
  });
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

const firstColumnTools = aiToolsData.slice(0, 3);
const secondColumnTools = aiToolsData.slice(3, 6);
const thirdColumnTools = aiToolsData.slice(6, 9);

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

// Add common CSS for ripple effect and keyboard navigation (already in your file)
// Moved this block to the very end to ensure it runs after DOMContentLoaded
// and appends to head. Renamed 'style' to 'globalStyles' to avoid conflict.
const globalStyles = document.createElement('style');
globalStyles.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(99, 102, 241, 0.3);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
    transform: translate(-50%, -50%); /* Center ripple origin */
  }

  @keyframes ripple-animation {
    from {
      transform: scale(0);
      opacity: 0.6;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .keyboard-navigation *:focus {
    outline: 2px solid #6366f1 !important;
    outline-offset: 2px !important;
  }

  .news-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .news-time {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
document.head.appendChild(globalStyles);

// Cleanup function for news interval
window.addEventListener('beforeunload', () => {
  if (newsInterval) {
    clearInterval(newsInterval);
  }
  // Also clear connect section timeout if it exists
  const pointer = document.getElementById('pointer');
  if (pointer && pointer.sequenceTimeout) {
      clearTimeout(pointer.sequenceTimeout);
  }
});

console.log('🎨 AI Portal loaded with light mode and starting animation');


// --- Gemini GEMS Animated Showcase ---
const gemsData = [
  {
    image: "https://assets-global.website-files.com/621c8a6c3c8b6e4c1e6b2b3a/63e3b7e7e7e7e7e7e7e7e7e7_chatgpt-icon.png",
    title: "Namer UI",
    subtitle: "Next.js Project",
    description: "A comprehensive collection of modern, attractive, and unique reusable TypeScript components crafted specifically for Next.js.",
    link: "#"
  },
  {
    image: "https://cdn.openai.com/dall-e-2/dall-e-2-logo.png",
    title: "DSA Guide",
    subtitle: "Programming Assistant",
    description: "Interactive guidance on Data Structures and Algorithms with visual explanations and practice problems.",
    link: "#"
  },
  {
    image: "https://www.synthesia.io/favicon-32x32.png",
    title: "Resume Builder",
    subtitle: "Career AI",
    description: "AI-powered feedback using STAR method to optimize your resume for success and ATS systems.",
    link: "#"
  },
  {
    image: "https://runwayml.com/favicon-32x32.png",
    title: "AI Tools Master",
    subtitle: "Productivity Suite",
    description: "Expert guidance on AI tools, frameworks, and workflow optimization strategies for your business.",
    link: "#"
  }
];
let gemsIndex = 0;

function renderGem(index, animate = true, direction = 1) {
  const gem = gemsData[index];
  const imageDiv = document.querySelector('.gems-image');
  const infoDiv = document.querySelector('.gems-info');
  if (!gem || !imageDiv || !infoDiv) return;

  // Animate out
  if (animate) {
    imageDiv.classList.remove('gems-fade-in', 'gems-slide-in');
    infoDiv.classList.remove('gems-fade-in', 'gems-slide-in');
    imageDiv.classList.add('gems-fade-out');
    infoDiv.classList.add('gems-fade-out');
    setTimeout(() => {
      updateGemContent(gem, imageDiv, infoDiv);
      imageDiv.classList.remove('gems-fade-out');
      infoDiv.classList.remove('gems-fade-out');
      imageDiv.classList.add(direction > 0 ? 'gems-slide-in' : 'gems-fade-in');
      infoDiv.classList.add(direction > 0 ? 'gems-slide-in' : 'gems-fade-in');
    }, 400);
  } else {
    updateGemContent(gem, imageDiv, infoDiv);
    imageDiv.classList.add('gems-fade-in');
    infoDiv.classList.add('gems-fade-in');
  }
}

function updateGemContent(gem, imageDiv, infoDiv) {
  imageDiv.innerHTML = `<img src="${gem.image}" alt="${gem.title}" />`;
  infoDiv.innerHTML = `
    <h3 class="gems-title">${gem.title}</h3>
    <div class="gems-subtitle">${gem.subtitle}</div>
    <p class="gems-description">${gem.description}</p>
    <div class="gems-actions">
      <button class="gems-btn gems-prev">Previous</button>
      <button class="gems-btn gems-next">Next</button>
      <a href="${gem.link}" class="gems-btn gems-primary" target="_blank">Open Web App</a>
    </div>
  `;
  // Wire up buttons
  infoDiv.querySelector('.gems-prev').onclick = () => {
    gemsIndex = (gemsIndex - 1 + gemsData.length) % gemsData.length;
    renderGem(gemsIndex, true, -1);
  };
  infoDiv.querySelector('.gems-next').onclick = () => {
    gemsIndex = (gemsIndex + 1) % gemsData.length;
    renderGem(gemsIndex, true, 1);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  renderGem(gemsIndex, false);
});

// --- CUSTOMIZED GPTs SECTION ---
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

document.addEventListener('DOMContentLoaded', () => {
  const gptCardsContainer = document.querySelector('.gpt-cards-container');
  if (!gptCardsContainer) return;

  // Append each GPT card to the container and apply initial transforms
  gpts.forEach((gpt, index) => {
    const card = createGptCard(gpt);
    gptCardsContainer.appendChild(card);

    // Calculate initial rotation and translation for each card
    const numCards = gpts.length;
    const middleIndex = Math.floor(numCards / 2);
    const cardBendDegree = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-bend-degree'));
    const cardTranslateYBase = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-translate-y-base'));
    const cardTranslateXBase = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-translate-x-base'));

    let rotationDegree = 0;
    let translateYValue = 0;
    let translateXValue = 0;
    let zIndex = 0;

    // Make the middle card straight and the furthest cards more bent
    const distanceFromMiddle = Math.abs(index - middleIndex);
    const maxBend = cardBendDegree;
    const maxTranslate = cardTranslateYBase * 3;

    rotationDegree = (index - middleIndex) * (maxBend / middleIndex);
    translateYValue = distanceFromMiddle * (maxTranslate / middleIndex);
    translateXValue = (index - middleIndex) * (cardTranslateXBase * 1.5);

    // Adjust Z-index so central cards are on top, fading outwards
    zIndex = numCards - distanceFromMiddle;

    // Apply initial transform and z-index
    card.style.transform = `translateX(${translateXValue}px) translateY(${translateYValue}px) rotate(${rotationDegree}deg)`;
    card.style.zIndex = zIndex;
    card.dataset.initialTransform = `translateX(${translateXValue}px) translateY(${translateYValue}px) rotate(${rotationDegree}deg)`;
    card.dataset.initialZIndex = zIndex;
  });
});