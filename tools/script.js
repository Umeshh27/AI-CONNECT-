// your code goes here
// AI Tools Page JavaScript

// Global variables for AI Tools data
const aiToolsData = [
    {
        id: '1',
        name: 'ChatGPT',
        description: 'Advanced conversational AI for generating human-like text, answering questions, and assisting with a wide range of tasks.',
        category: 'Content Creation',
        sector: 'General AI',
        link: 'https://openai.com/chatgpt/',
        icon: '💬',
        trending: true
    },
    {
        id: '2',
        name: 'Midjourney',
        description: 'Generates stunning, creative images and artwork from text prompts using advanced AI models.',
        category: 'Generative AI',
        sector: 'Creative Arts',
        link: 'https://www.midjourney.com/',
        icon: '🎨',
        trending: true
    },
    {
        id: '3',
        name: 'GitHub Copilot',
        description: 'Helps you write code faster with AI-powered code suggestions and autocompletions inside your IDE.',
        category: 'Development',
        sector: 'Software Development',
        link: 'https://github.com/features/copilot',
        icon: '💻',
        trending: true
    },
    {
        id: '4',
        name: 'Notion AI',
        description: 'Automates note-taking, summaries, and content generation within your Notion workspace, boosting productivity.',
        category: 'Productivity',
        sector: 'Work & Organization',
        link: 'https://www.notion.so/product/ai',
        icon: '📝',
        trending: false
    },
    {
        id: '5',
        name: 'DALL·E 3',
        description: 'Creates original images and artwork from natural language descriptions, powered by OpenAI, with improved coherence.',
        category: 'Generative AI',
        sector: 'Creative Arts',
        link: 'https://openai.com/dall-e-3',
        icon: '🖼️',
        trending: true
    },
    {
        id: '6',
        name: 'Synthesia',
        description: 'Enables you to create professional AI-generated videos from text in minutes, with realistic avatars and voiceovers.',
        category: 'Video Generation',
        sector: 'Marketing & Media',
        link: 'https://www.synthesia.io/',
        icon: '🎬',
        trending: false
    },
    {
        id: '7',
        name: 'Jasper AI',
        description: 'An AI writing assistant for marketing, blogs, and content creation, helping you write better and faster.',
        category: 'Content Creation',
        sector: 'Marketing & Media',
        link: 'https://www.jasper.ai/',
        icon: '✍️',
        trending: false
    },
    {
        id: '8',
        name: 'RunwayML',
        description: 'Offers creative AI tools for video, image, and audio editing, including generative and enhancement features.',
        category: 'Creative AI',
        sector: 'Creative Arts',
        link: 'https://runwayml.com/',
        icon: '✨',
        trending: true
    },
    {
        id: '9',
        name: 'Perplexity AI',
        description: 'An advanced AI-powered search and research assistant that provides accurate, cited answers to complex queries.',
        category: 'AI Search',
        sector: 'Research & Information',
        link: 'https://www.perplexity.ai/',
        icon: '🔍',
        trending: true
    },
    {
        id: '10',
        name: 'AlphaFold',
        description: 'Predicts protein structures with high accuracy, revolutionizing drug discovery and biological research.',
        category: 'Scientific Research',
        sector: 'Healthcare & Biotech',
        link: 'https://deepmind.google/discover/article/alphafold/',
        icon: '🧬',
        trending: false
    },
    {
        id: '11',
        name: 'Adobe Firefly',
        description: 'A family of creative generative AI models integrated into Adobe products for image, text effect, and vector generation.',
        category: 'Generative AI',
        sector: 'Creative Arts',
        link: 'https://www.adobe.com/sensei/generative-ai/firefly.html',
        icon: '🖌️',
        trending: true
    },
    {
        id: '12',
        name: 'Copilot for Microsoft 365',
        description: 'AI assistant integrated across Microsoft 365 apps to summarize documents, draft emails, and create presentations.',
        category: 'Productivity',
        sector: 'Work & Organization',
        link: 'https://www.microsoft.com/en-us/microsoft-365/microsoft-copilot',
        icon: '💼',
        trending: true
    },
    {
        id: '13',
        name: 'Bard (now Gemini)',
        description: 'Google\'s conversational AI, designed to be a creative and helpful collaborator for various tasks and information retrieval.',
        category: 'Conversational AI',
        sector: 'General AI',
        link: 'https://gemini.google.com/',
        icon: '♊',
        trending: true
    },
    {
        id: '14',
        name: 'ElevenLabs',
        description: 'Provides highly realistic AI voice generation and text-to-speech capabilities for various applications.',
        category: 'Audio AI',
        sector: 'Marketing & Media',
        link: 'https://elevenlabs.io/',
        icon: '🎤',
        trending: false
    },
    {
        id: '15',
        name: 'Tabnine',
        description: 'AI code completion tool that helps developers write code faster and with fewer errors across many programming languages.',
        category: 'Development',
        sector: 'Software Development',
        link: 'https://www.tabnine.com/',
        icon: '👨‍💻',
        trending: false
    },
    {
        id: '16',
        name: 'Grammarly',
        description: 'AI-powered writing assistant that checks for grammar, spelling, punctuation, clarity, engagement, and delivery mistakes.',
        category: 'Content Creation',
        sector: 'Education & Writing',
        link: 'https://www.grammarly.com/',
        icon: '✍️',
        trending: false
    },
    {
        id: '17',
        name: 'DeepL Translator',
        description: 'An AI-powered translation tool known for its highly accurate and nuanced translations across multiple languages.',
        category: 'Language AI',
        sector: 'Communication',
        link: 'https://www.deepl.com/translator',
        icon: '🌐',
        trending: false
    },
    {
        id: '18',
        name: 'Synthesia (Healthcare)',
        description: 'Specialized version of Synthesia for generating medical and healthcare-related video content with AI avatars.',
        category: 'Video Generation',
        sector: 'Healthcare & Biotech',
        link: 'https://www.synthesia.io/industries/healthcare',
        icon: '🏥',
        trending: false
    },
    {
        id: '19',
        name: 'Figma AI Plugins',
        description: 'Various AI plugins for Figma that automate design tasks, generate content, and enhance design workflows.',
        category: 'Design AI',
        sector: 'Creative Arts',
        link: 'https://www.figma.com/community/plugins/ai',
        icon: '📐',
        trending: false
    },
    {
        id: '20',
        name: 'Fireflies.ai',
        description: 'AI meeting assistant that records, transcribes, and summarizes your meetings, integrating with popular conferencing tools.',
        category: 'Productivity',
        sector: 'Work & Organization',
        link: 'https://fireflies.ai/',
        icon: '🎙️',
        trending: false
    }
];

// Extract unique categories for filter buttons, including 'Trending'
const getUniqueCategories = () => {
    const categories = new Set();
    aiToolsData.forEach(tool => categories.add(tool.category));
    return ['All', 'Trending', ...Array.from(categories).sort()];
};

let currentSearchTerm = '';
let currentFilterCategory = 'All'; // Default filter

document.addEventListener('DOMContentLoaded', () => {
    // Initialize common functionalities
    initializeModeToggle();
    initializeMobileMenu();
    initializeScrollEffects(); // For header scroll and progress bar
    initializeAnimations(); // For ripple effect on buttons

    // Specific elements for AI Tools page
    const aiToolsGrid = document.getElementById('ai-tools-grid');
    const toolSearchInput = document.getElementById('tool-search');
    const filterButtonsContainer = document.getElementById('filter-buttons');
    const noResultsMessage = document.getElementById('no-results-message');

    // Populate filter buttons
    populateFilterButtons();

    // Initial render of tools
    renderAITools();

    // Search functionality
    toolSearchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.trim();
        renderAITools();
    });

    // Filter functionality
    filterButtonsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Remove active class from all buttons
            filterButtonsContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to the clicked button
            e.target.classList.add('active');
            currentFilterCategory = e.target.dataset.filter;
            renderAITools();
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe initially rendered cards
    document.querySelectorAll('.ai-tool-card').forEach(card => {
        observer.observe(card);
    });
});

/**
 * Populates the filter buttons based on unique categories in aiToolsData.
 */
function populateFilterButtons() {
    const filterButtonsContainer = document.getElementById('filter-buttons');
    const categories = getUniqueCategories();

    filterButtonsContainer.innerHTML = ''; // Clear existing buttons

    categories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('filter-btn');
        const filterValue = category.toLowerCase().replace(/ /g, '-');
        button.dataset.filter = filterValue;
        button.textContent = category;

        if (category === 'All') {
            button.classList.add('active'); // Set 'All' as active by default
        }

        filterButtonsContainer.appendChild(button);
    });
}

/**
 * Renders AI tool cards based on current search and filter criteria.
 */
function renderAITools() {
    const aiToolsGrid = document.getElementById('ai-tools-grid');
    const noResultsMessage = document.getElementById('no-results-message');
    aiToolsGrid.innerHTML = ''; // Clear existing tools

    let filteredTools = aiToolsData;

    // Apply filter
    if (currentFilterCategory === 'trending') {
        filteredTools = filteredTools.filter(tool => tool.trending);
    } else if (currentFilterCategory !== 'all') {
        filteredTools = filteredTools.filter(tool =>
            tool.category.toLowerCase().replace(/ /g, '-') === currentFilterCategory
        );
    }

    // Apply search
    if (currentSearchTerm) {
        const searchTermLower = currentSearchTerm.toLowerCase();
        filteredTools = filteredTools.filter(tool =>
            tool.name.toLowerCase().includes(searchTermLower) ||
            tool.description.toLowerCase().includes(searchTermLower) ||
            tool.sector.toLowerCase().includes(searchTermLower) ||
            tool.category.toLowerCase().includes(searchTermLower)
        );
    }

    if (filteredTools.length === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
        filteredTools.forEach((tool, index) => {
            const toolCard = document.createElement('div');
            toolCard.classList.add('ai-tool-card', 'fade-in-up'); // Add animation class
            toolCard.style.animationDelay = `${index * 0.1}s`; // Stagger animation

            toolCard.innerHTML = `
                <div class="ai-tool-card-header">
                    <div class="ai-tool-icon">${tool.icon}</div>
                    <span class="ai-tool-category-tag">${tool.category}</span>
                </div>
                <h3 class="ai-tool-title">${tool.name}</h3>
                <p class="ai-tool-description">${tool.description}</p>
                <div class="ai-tool-footer">
                    <span class="ai-tool-role">${tool.sector}</span>
                    <a href="${tool.link}" class="ai-tool-link" target="_blank" rel="noopener noreferrer">Learn More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            aiToolsGrid.appendChild(toolCard);

            // Trigger animation after appending
            setTimeout(() => {
                toolCard.classList.add('animate');
            }, 50);
        });
    }
}


// --- COMMON FUNCTIONS (Copied from your script.js for standalone page) ---

/**
 * Initializes the dark/light mode toggle functionality.
 */
function initializeModeToggle() {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const icon = modeToggle.querySelector('i');

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

    modeToggle.addEventListener('click', function () {
        const isDark = body.classList.contains('dark');
        setMode(isDark ? 'light' : 'dark');
    });
}

/**
 * Initializes the mobile menu toggle functionality.
 */
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');

            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });

        mobileNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.querySelector('span:nth-child(1)').style.transform = 'none';
                mobileMenuToggle.querySelector('span:nth-child(2)').style.transform = 'none';
            });
        });
    }
}

/**
 * Initializes scroll effects like header shrinking and scroll progress bar.
 */
function initializeScrollEffects() {
    const header = document.getElementById('header');
    const scrollProgressBar = document.getElementById('scroll-progress');

    let ticking = false;

    function updateScrollEffects() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / docHeight) * 100;

        if (scrollProgressBar) {
            scrollProgressBar.style.width = scrollProgress + '%';
        }

        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
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

/**
 * Initializes general animations like smooth scrolling for anchor links and ripple effects on buttons.
 */
function initializeAnimations() {
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

/**
 * Displays a notification message.
 * @param {string} message - The message to display.
 */
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

/**
 * Enhances accessibility by adding keyboard navigation class.
 */
function enhanceAccessibility() {
    document.body.classList.add('keyboard-navigation');
}
