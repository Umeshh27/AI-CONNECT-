// AI Portal - Awwwards Style JavaScript
// Smooth, refined animations and interactions

// Global variables
let isLoading = true;
let scrollProgress = 0;
let currentFilter = 'all';
const hero = document.querySelector(".hero");
const primaryButton = document.querySelector(".primary-button");

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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeLoading();
    initializeCursor();
    initializeScrollEffects();
    initializeAnimations();
    initializeInteractions();
    initializeCounters();
    initializeFilters();
    initializeMobileMenu();
    initializeDynamicContent();

    console.log('✨ AI Portal initialized with smooth animations and dynamic content');
});

// Loading Screen
function initializeLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    const progressLine = document.querySelector('.progress-line');

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);

            // Hide loading screen after a short delay
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
                isLoading = false;

                // Start scroll-triggered animations
                setTimeout(() => {
                    initializeScrollAnimations();
                }, 300);
            }, 800);
        }

        progressLine.style.width = progress + '%';
    }, 150);
}

// Custom Cursor
function initializeCursor() {
    const cursor = document.getElementById('cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('active');
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });

    // Smooth cursor animation
    function animateCursor() {
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .sector-card, .tool-card, .gem-card, .news-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursor.style.background = 'rgba(99, 102, 241, 0.8)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursor.style.background = '#6366f1';
        });
    });
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

        // Parallax effect for gradient orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = scrollTop * speed;
            orb.style.transform = `translateY(${yPos}px)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Scroll-triggered Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stagger animations for grid items
                if (entry.target.classList.contains('sector-card') ||
                    entry.target.classList.contains('tool-card') ||
                    entry.target.classList.contains('gem-card') ||
                    entry.target.classList.contains('news-card')) {

                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 100}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(`
        .section-header,
        .sector-card,
        .tool-card,
        .gem-card,
        .news-card,
        .hero-stats .stat-item
    `);

    animatedElements.forEach(element => {
        element.classList.add('fade-in-up');
        observer.observe(element);
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

    // Button click animations
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function (e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Interactive Elements
function initializeInteractions() {
    // Sector card interactions
    document.querySelectorAll('.sector-card').forEach(card => {
        card.addEventListener('click', function () {
            const sector = this.getAttribute('data-sector');
            showNotification(`Exploring ${sector} sector...`);

            // Add click animation
            this.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1)';
            }, 150);
        });
    });

    // Tool card interactions
    document.querySelectorAll('.tool-button').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const toolName = this.closest('.tool-card').querySelector('.tool-title').textContent;
            showNotification(`Launching ${toolName}...`);
        });
    });

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

    // News card interactions
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('click', function () {
            const title = this.querySelector('.news-title').textContent;
            showNotification(`Opening article: ${title.substring(0, 30)}...`);
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
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
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

// Filter System
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter tools with smooth animation
            toolCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;

                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';

                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            currentFilter = filter;
            showNotification(`Filtered tools: ${filter === 'all' ? 'All' : filter}`);
        });
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle) {
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

// Notification System
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = notification.querySelector('.notification-text');

    notificationText.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Smooth Page Transitions
function initializePageTransitions() {
    // Add page transition effects
    document.body.style.opacity = '0';

    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    });
}

// Utility Functions
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

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Accessibility Enhancements
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
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #6366f1';
            element.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
}

// Initialize performance optimizations and accessibility
document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    enhanceAccessibility();
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #6366f1 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);

console.log('🎨 AI Portal loaded with Awwwards-style animations');

// Dynamic Content Initialization
async function initializeDynamicContent() {
    console.log('🔄 Initializing dynamic content...');
    
    try {
        // Load news content
        await loadNewsContent();
        
        // Load tools content
        await loadToolsContent();
        
        // Update last updated timestamp
        updateLastUpdated();
        
        console.log('✅ Dynamic content loaded successfully');
    } catch (error) {
        console.error('❌ Error loading dynamic content:', error);
    }
}

// Load and display news content
async function loadNewsContent() {
    const newsContainer = document.querySelector('.news-grid');
    if (!newsContainer) return;

    // Show loading state
    showLoadingState(newsContainer);

    try {
        const newsData = await window.FreeNewsAPI.fetchAINews();
        await updateNewsSection(newsData);
    } catch (error) {
        console.error('Error loading news:', error);
        showErrorState(newsContainer, 'Failed to load news');
    }
}

// Load and display tools content
async function loadToolsContent() {
    const toolsContainer = document.querySelector('.tools-grid');
    if (!toolsContainer) return;

    // Show loading state
    showLoadingState(toolsContainer);

    try {
        const toolsData = await window.ToolsAPI.fetchTrendingTools();
        await updateToolsSection(toolsData);
    } catch (error) {
        console.error('Error loading tools:', error);
        showErrorState(toolsContainer, 'Failed to load tools');
    }
}

// Update news section with fresh data
async function updateNewsSection(newsData) {
    const newsContainer = document.querySelector('.news-grid');
    if (!newsContainer) return;

    // Clear existing content
    newsContainer.innerHTML = '';

    // Create news cards
    newsData.slice(0, 6).forEach((article, index) => {
        const newsCard = createNewsCard(article, index);
        newsContainer.appendChild(newsCard);
    });

    // Animate cards in
    animateCardsIn(newsContainer.children);
}

// Update tools section with fresh data
async function updateToolsSection(toolsData) {
    const toolsContainer = document.querySelector('.tools-grid');
    if (!toolsContainer) return;

    // Clear existing content
    toolsContainer.innerHTML = '';

    // Create tool cards
    toolsData.slice(0, 6).forEach((tool, index) => {
        const toolCard = createToolCard(tool, index);
        toolsContainer.appendChild(toolCard);
    });

    // Animate cards in
    animateCardsIn(toolsContainer.children);
}

// Create news card element
function createNewsCard(article, index) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const imageUrl = article.urlToImage || 'https://via.placeholder.com/400x200?text=AI+News';
    const publishedDate = formatDate(article.publishedAt);
    const description = truncateText(article.description || '', 120);

    card.innerHTML = `
        <div class="news-image">
            <img src="${imageUrl}" alt="${article.title}" onerror="this.src='https://via.placeholder.com/400x200?text=AI+News'">
            <div class="news-badge">
                <span class="badge-text">BREAKING</span>
            </div>
        </div>
        <div class="news-content">
            <div class="news-meta">
                <span class="news-date">${publishedDate}</span>
                <span class="news-source">${article.source.name}</span>
            </div>
            <h3 class="news-title">${article.title}</h3>
            <p class="news-description">${description}</p>
            <a href="${article.url}" target="_blank" class="news-link">
                Read More
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;

    // Add click handler
    card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
            window.open(article.url, '_blank');
        }
    });

    return card;
}

// Create tool card element
function createToolCard(tool, index) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const badges = [];
    if (tool.isPopular) badges.push('<span class="tool-badge popular">POPULAR</span>');
    if (tool.isNew) badges.push('<span class="tool-badge new">NEW</span>');

    const stars = '★'.repeat(Math.floor(tool.rating)) + '☆'.repeat(5 - Math.floor(tool.rating));

    card.innerHTML = `
        <div class="tool-header">
            <div class="tool-icon">${tool.icon}</div>
            <div class="tool-badges">${badges.join('')}</div>
        </div>
        <div class="tool-content">
            <h3 class="tool-name">${tool.name}</h3>
            <p class="tool-description">${tool.description}</p>
            <div class="tool-meta">
                <div class="tool-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-value">${tool.rating}</span>
                </div>
                <div class="tool-category">${tool.category}</div>
            </div>
            <div class="tool-tags">
                ${tool.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
            </div>
            <a href="${tool.url}" target="_blank" class="tool-link">
                Try Now
                <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `;

    // Add click handler
    card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A' && !e.target.closest('a')) {
            window.open(tool.url, '_blank');
        }
    });

    return card;
}

// Show loading state
function showLoadingState(container) {
    container.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading latest content...</p>
        </div>
    `;
}

// Show error state
function showErrorState(container, message) {
    container.innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <button onclick="location.reload()" class="retry-button">Retry</button>
        </div>
    `;
}

// Animate cards in
function animateCardsIn(cards) {
    Array.from(cards).forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Update last updated timestamp
function updateLastUpdated() {
    const timestamp = document.querySelector('.last-updated');
    if (timestamp) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        timestamp.textContent = `Last updated: ${timeString}`;
    }
}

// Enhanced filter functionality for tools
function initializeToolsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const toolsGrid = document.querySelector('.tools-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.textContent.trim();
            
            // Show loading
            showLoadingState(toolsGrid);
            
            try {
                let toolsData;
                if (category === 'All Tools') {
                    toolsData = await window.ToolsAPI.fetchTrendingTools();
                } else {
                    toolsData = await window.ToolsAPI.fetchToolsByCategory(category);
                }
                
                await updateToolsSection(toolsData);
            } catch (error) {
                console.error('Error filtering tools:', error);
                showErrorState(toolsGrid, 'Failed to load tools');
            }
        });
    });
}

// Initialize tools filter when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeToolsFilter, 1000); // Wait for initial load
});

// Refresh functionality
function addRefreshButton() {
    const refreshButton = document.createElement('button');
    refreshButton.className = 'refresh-button';
    refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Content';
    refreshButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        font-weight: 500;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    `;

    refreshButton.addEventListener('click', async () => {
        refreshButton.style.transform = 'scale(0.95)';
        refreshButton.querySelector('i').style.animation = 'spin 1s linear infinite';
        
        await initializeDynamicContent();
        
        setTimeout(() => {
            refreshButton.style.transform = 'scale(1)';
            refreshButton.querySelector('i').style.animation = 'none';
        }, 1000);
    });

    document.body.appendChild(refreshButton);
}

// Add refresh button when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addRefreshButton, 2000);
});





