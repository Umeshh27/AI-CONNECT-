const NEWS_API_KEY = 'pub_a79ee64c46634d18862d64b592524c4b'; // Replace with your NewsData.io API key

// News API (NewsData.io)
class FreeNewsAPI {
    static async fetchAINews() {
        const url = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=AI&language=en`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                return data.results.map(article => ({
                    title: article.title,
                    description: article.description,
                    url: article.link,
                    urlToImage: article.image_url,
                    publishedAt: article.pubDate,
                    source: { name: article.source_id }
                }));
            } else {
                console.warn("No news found from NewsData.io, using demo data.");
                return this.getDemoNews();
            }
        } catch (error) {
            console.error("Error fetching news from NewsData.io:", error);
            return this.getDemoNews(); // Fallback to demo data on error
        }
    }

    static getDemoNews() {
        return [
            {
                title: "AI Breakthrough: New Algorithm Achieves Human-Level Performance",
                description: "Researchers at leading AI labs have announced a groundbreaking new algorithm that demonstrates human-level performance on complex cognitive tasks.",
                url: "#",
                urlToImage: "https://via.placeholder.com/400x200?text=AI+News+1",
                publishedAt: "2025-07-19T10:00:00Z",
                source: { name: "AI Today" }
            },
            {
                title: "The Future of Work: How AI is Reshaping Industries",
                description: "Artificial intelligence is rapidly transforming various industries, leading to new efficiencies and job roles. Experts discuss the impact on the global workforce.",
                url: "#",
                urlToImage: "https://via.placeholder.com/400x200?text=AI+News+2",
                publishedAt: "2025-07-18T14:30:00Z",
                source: { name: "Tech Insights" }
            },
            {
                title: "Ethical AI: Addressing Bias in Machine Learning Models",
                description: "As AI becomes more prevalent, the importance of ethical considerations and addressing biases in machine learning models is paramount.",
                url: "#",
                urlToImage: "https://via.placeholder.com/400x200?text=AI+News+3",
                publishedAt: "2025-07-17T09:15:00Z",
                source: { name: "Global AI Review" }
            },
            {
                title: "AI in Healthcare: Revolutionizing Diagnostics and Treatment",
                description: "AI-powered tools are making significant strides in healthcare, from early disease detection to personalized treatment plans.",
                url: "#",
                urlToImage: "https://via.placeholder.com/400x200?text=AI+News+4",
                publishedAt: "2025-07-16T11:45:00Z",
                source: { name: "HealthTech Weekly" }
            },
            {
                title: "Generative AI: Creating Art, Music, and More",
                description: "The rise of generative AI models is enabling machines to create original content, pushing the boundaries of creativity.",
                url: "#",
                urlToImage: "https://via.placeholder.com/400x200?text=AI+News+5",
                publishedAt: "2025-07-15T16:00:00Z",
                source: { name: "Creative AI Hub" }
            },
            {
                title: "AI in Finance: Automating Trading and Risk Management",
                description: "Financial institutions are increasingly adopting AI for automated trading, fraud detection, and sophisticated risk management.",
                url: "#",
                urlToImage: "https://via.placeholder.com/400x200?text=AI+News+6",
                publishedAt: "2025-07-14T13:20:00Z",
                source: { name: "FinTech Insights" }
            }
        ];
    }
}

// Tools API (Local Demo Data)
class ToolsAPI {
    static async fetchTrendingTools() {
        // In a real application, this would fetch from a backend API
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.getDemoTools());
            }, 500);
        });
    }

    static async fetchToolsByCategory(category) {
        return new Promise(resolve => {
            setTimeout(() => {
                const allTools = this.getDemoTools();
                if (category === 'All Tools') {
                    resolve(allTools);
                } else {
                    resolve(allTools.filter(tool => tool.category === category));
                }
            }, 500);
        });
    }

    static getDemoTools() {
        return [
            {
                name: "ChatGPT",
                description: "Advanced AI chatbot for conversations and content generation.",
                icon: "<i class=\"fas fa-comments\"></i>",
                rating: 4.8,
                category: "Productivity",
                tags: ["Chatbot", "NLP", "Content Creation"],
                url: "https://openai.com/chatgpt",
                isPopular: true,
                isNew: false
            },
            {
                name: "Midjourney",
                description: "AI art generator creating stunning images from text prompts.",
                icon: "<i class=\"fas fa-paint-brush\"></i>",
                rating: 4.7,
                category: "Creative",
                tags: ["Image Generation", "Art", "Design"],
                url: "https://www.midjourney.com/",
                isPopular: true,
                isNew: false
            },
            {
                name: "GitHub Copilot",
                description: "AI pair programmer that suggests code and functions in real-time.",
                icon: "<i class=\"fas fa-code\"></i>",
                rating: 4.9,
                category: "Development",
                tags: ["Coding", "IDE Integration", "Automation"],
                url: "https://github.com/features/copilot",
                isPopular: true,
                isNew: false
            },
            {
                name: "Grammarly AI",
                description: "AI-powered writing assistant for grammar, style, and tone.",
                icon: "<i class=\"fas fa-pen-nib\"></i>",
                rating: 4.6,
                category: "Productivity",
                tags: ["Writing", "Editing", "Communication"],
                url: "https://www.grammarly.com/",
                isPopular: false,
                isNew: false
            },
            {
                name: "DALL-E 3",
                description: "Generates high-quality images from textual descriptions.",
                icon: "<i class=\"fas fa-image\"></i>",
                rating: 4.7,
                category: "Creative",
                tags: ["Image Generation", "Art", "AI Art"],
                url: "https://openai.com/dall-e-3",
                isPopular: true,
                isNew: true
            },
            {
                name: "TensorFlow",
                description: "Open-source machine learning framework for research and production.",
                icon: "<i class=\"fas fa-brain\"></i>",
                rating: 4.9,
                category: "Development",
                tags: ["Machine Learning", "Deep Learning", "Framework"],
                url: "https://www.tensorflow.org/",
                isPopular: false,
                isNew: false
            },
            {
                name: "Tableau",
                description: "Business intelligence tool for data visualization and analysis.",
                icon: "<i class=\"fas fa-chart-bar\"></i>",
                rating: 4.5,
                category: "Analysis",
                tags: ["Data Visualization", "BI", "Analytics"],
                url: "https://www.tableau.com/",
                isPopular: false,
                isNew: false
            },
            {
                name: "Synthesia",
                description: "AI video generation platform for creating realistic avatars.",
                icon: "<i class=\"fas fa-video\"></i>",
                rating: 4.6,
                category: "Creative",
                tags: ["Video Generation", "Avatar", "Content Creation"],
                url: "https://www.synthesia.io/",
                isPopular: false,
                isNew: true
            },
            {
                name: "Perplexity AI",
                description: "AI-powered search engine that provides direct answers with sources.",
                icon: "<i class=\"fas fa-search\"></i>",
                rating: 4.8,
                category: "Productivity",
                tags: ["Search Engine", "Information Retrieval", "Research"],
                url: "https://www.perplexity.ai/",
                isPopular: true,
                isNew: false
            }
        ];
    }
}

// Expose APIs to the window object
window.FreeNewsAPI = FreeNewsAPI;
window.ToolsAPI = ToolsAPI;

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Helper function to truncate text
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}


