// API Configuration
const API_CONFIG = {
    newsAPI: {
        baseURL: 'https://newsapi.org/v2',
        apiKey: 'pub_a79ee64c46634d18862d64b592524c4b', // Replace with actual API key
        endpoints: {
            everything: '/everything',
            topHeadlines: '/top-headlines'
        }
    },
    // Fallback news sources for demo
    fallbackNews: [
        {
            title: "OpenAI Announces GPT-5 with Revolutionary Capabilities",
            description: "The latest iteration promises unprecedented reasoning abilities and multimodal understanding...",
            url: "#",
            urlToImage: "https://via.placeholder.com/400x200?text=AI+News",
            publishedAt: new Date().toISOString(),
            source: { name: "AI Research Team" }
        },
        {
            title: "Google's New AI Chip Delivers 10x Performance",
            description: "The TPU v5 promises to accelerate machine learning workloads significantly...",
            url: "#",
            urlToImage: "https://via.placeholder.com/400x200?text=Tech+News",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            source: { name: "Tech Insider" }
        },
        {
            title: "Breakthrough in Neural Network Efficiency",
            description: "Researchers develop new architecture that reduces training time by 80%...",
            url: "#",
            urlToImage: "https://via.placeholder.com/400x200?text=Research+News",
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            source: { name: "Research Lab" }
        }
    ],
    // Trending AI tools data
    trendingTools: [
        {
            name: "ChatGPT",
            description: "Advanced conversational AI for writing, coding, and problem-solving",
            category: "Text Generation",
            rating: 4.8,
            tags: ["Text Generation", "Code Assistance", "Research"],
            url: "https://chat.openai.com",
            icon: "🤖",
            isPopular: true,
            isNew: false
        },
        {
            name: "Midjourney",
            description: "AI art generator for creating stunning visual content and illustrations",
            category: "Image Generation",
            rating: 4.9,
            tags: ["Image Generation", "Art Creation", "Style Transfer"],
            url: "https://midjourney.com",
            icon: "🎨",
            isPopular: true,
            isNew: false
        },
        {
            name: "Claude",
            description: "Anthropic's AI assistant for analysis, writing, and complex reasoning",
            category: "Text Generation",
            rating: 4.7,
            tags: ["Analysis", "Writing", "Reasoning"],
            url: "https://claude.ai",
            icon: "🧠",
            isPopular: false,
            isNew: true
        },
        {
            name: "Runway ML",
            description: "AI-powered video editing and generation platform",
            category: "Video Generation",
            rating: 4.6,
            tags: ["Video Generation", "Video Editing", "Motion Graphics"],
            url: "https://runwayml.com",
            icon: "🎬",
            isPopular: false,
            isNew: true
        },
        {
            name: "GitHub Copilot",
            description: "AI pair programmer that helps you write code faster",
            category: "Development",
            rating: 4.5,
            tags: ["Code Generation", "Development", "Productivity"],
            url: "https://github.com/features/copilot",
            icon: "💻",
            isPopular: true,
            isNew: false
        },
        {
            name: "Stable Diffusion",
            description: "Open-source AI model for generating images from text descriptions",
            category: "Image Generation",
            rating: 4.4,
            tags: ["Image Generation", "Open Source", "Text-to-Image"],
            url: "https://stability.ai",
            icon: "🖼️",
            isPopular: true,
            isNew: false
        }
    ]
};

// News API Functions
class NewsAPI {
    constructor() {
        this.baseURL = API_CONFIG.newsAPI.baseURL;
        this.apiKey = API_CONFIG.newsAPI.apiKey;
    }

    async fetchAINews() {
        try {
            // Try to fetch from NewsAPI first
            if (this.apiKey && this.apiKey !== 'YOUR_NEWS_API_KEY') {
                const response = await fetch(
                    `${this.baseURL}/everything?q=artificial intelligence OR AI OR machine learning&sortBy=publishedAt&pageSize=10&apiKey=${this.apiKey}`
                );
                
                if (response.ok) {
                    const data = await response.json();
                    return data.articles;
                }
            }
            
            // Fallback to demo data
            console.log('Using fallback news data');
            return API_CONFIG.fallbackNews;
        } catch (error) {
            console.error('Error fetching news:', error);
            return API_CONFIG.fallbackNews;
        }
    }

    async fetchTechNews() {
        try {
            if (this.apiKey && this.apiKey !== 'YOUR_NEWS_API_KEY') {
                const response = await fetch(
                    `${this.baseURL}/top-headlines?category=technology&pageSize=6&apiKey=${this.apiKey}`
                );
                
                if (response.ok) {
                    const data = await response.json();
                    return data.articles;
                }
            }
            
            return API_CONFIG.fallbackNews.slice(0, 3);
        } catch (error) {
            console.error('Error fetching tech news:', error);
            return API_CONFIG.fallbackNews.slice(0, 3);
        }
    }
}

// Tools API Functions
class ToolsAPI {
    constructor() {
        this.tools = API_CONFIG.trendingTools;
    }

    async fetchTrendingTools() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sort by popularity and rating
        return this.tools.sort((a, b) => {
            if (a.isPopular && !b.isPopular) return -1;
            if (!a.isPopular && b.isPopular) return 1;
            return b.rating - a.rating;
        });
    }

    async fetchToolsByCategory(category) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (category === 'All Tools') {
            return this.tools;
        }
        
        return this.tools.filter(tool => 
            tool.category.toLowerCase() === category.toLowerCase() ||
            tool.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
        );
    }

    async fetchNewTools() {
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.tools.filter(tool => tool.isNew);
    }

    async fetchPopularTools() {
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.tools.filter(tool => tool.isPopular);
    }
}

// Initialize API instances
const newsAPI = new NewsAPI();
const toolsAPI = new ToolsAPI();

// Export for use in other files
window.NewsAPI = newsAPI;
window.ToolsAPI = toolsAPI;

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
}

function truncateText(text, maxLength = 150) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

// Auto-refresh functionality
class AutoRefresh {
    constructor() {
        this.newsRefreshInterval = 30 * 60 * 1000; // 30 minutes
        this.toolsRefreshInterval = 60 * 60 * 1000; // 1 hour
        this.startAutoRefresh();
    }

    startAutoRefresh() {
        // Refresh news every 30 minutes
        setInterval(async () => {
            console.log('Auto-refreshing news...');
            await this.refreshNews();
        }, this.newsRefreshInterval);

        // Refresh tools every hour
        setInterval(async () => {
            console.log('Auto-refreshing tools...');
            await this.refreshTools();
        }, this.toolsRefreshInterval);
    }

    async refreshNews() {
        try {
            const newsSection = document.querySelector('#news');
            if (newsSection) {
                const newsContainer = newsSection.querySelector('.news-grid');
                if (newsContainer) {
                    // Add loading state
                    newsContainer.style.opacity = '0.7';
                    
                    const latestNews = await newsAPI.fetchAINews();
                    await updateNewsSection(latestNews);
                    
                    // Remove loading state
                    newsContainer.style.opacity = '1';
                    
                    // Show refresh notification
                    this.showRefreshNotification('News updated with latest articles');
                }
            }
        } catch (error) {
            console.error('Error refreshing news:', error);
        }
    }

    async refreshTools() {
        try {
            const toolsSection = document.querySelector('#tools');
            if (toolsSection) {
                const toolsContainer = toolsSection.querySelector('.tools-grid');
                if (toolsContainer) {
                    toolsContainer.style.opacity = '0.7';
                    
                    const trendingTools = await toolsAPI.fetchTrendingTools();
                    await updateToolsSection(trendingTools);
                    
                    toolsContainer.style.opacity = '1';
                    this.showRefreshNotification('Tools updated with latest trending items');
                }
            }
        } catch (error) {
            console.error('Error refreshing tools:', error);
        }
    }

    showRefreshNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'refresh-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize auto-refresh when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AutoRefresh();
});

