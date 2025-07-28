document.addEventListener('DOMContentLoaded', function () {
  // Set initial mode to dark
  document.body.classList.add('dark');

  const toggle = document.getElementById('dark-mode-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('dark');
    });
  }

  initializeNewsDataSection();
  // Optional: If you want to show a notification on this page, you can add a simple function here
  // function showNotification(message) {
  //   const notification = document.getElementById('notification');
  //   const notificationText = notification.querySelector('.notification-text');
  //   if (notification && notificationText) {
  //     notificationText.textContent = message;
  //     notification.style.display = 'flex'; // Or 'block'
  //     setTimeout(() => {
  //       notification.style.display = 'none';
  //     }, 3000);
  //   }
  // }
});

const NEWS_API_KEY = "pub_701e0e765cfb4903be09c3a203338f7a"; // <<< YOUR NEWSAPI.IO API KEY IS HERE >>>
const NEWS_BASE_URL = "https://newsdata.io/api/1/news";
let currentDynamicNewsCategory = 'all';
let currentDynamicNewsQuery = '';
let dynamicNextPageToken = null; // This will store the token for subsequent pages

// Static trending AI news items
const staticAINews = [
  {
    title: "GitHub Copilot X: The Future of AI-Powered Development",
    description: "Explore how GitHub Copilot X is revolutionizing coding with chat, voice, and AI-powered pull requests.",
    link: "https://github.blog/2023-03-22-github-copilot-x-the-ai-powered-developer-experience/",
    image_url: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=GitHub+Copilot+X",
    category: ["Technology"],
    pubDate: "2023-03-22T10:00:00Z"
  },
  {
    title: "Google's Bard AI: A New Era for Conversational Search",
    description: "Google introduces Bard, an experimental conversational AI service, powered by LaMDA, to enhance search and creativity.",
    link: "https://blog.google/technology/ai/bard-google-ai-search-updates/",
    image_url: "https://placehold.co/600x400/10B981/FFFFFF?text=Google+Bard+AI",
    category: ["Technology", "AI"],
    pubDate: "2023-02-06T09:00:00Z"
  },
  {
    title: "ChatGPT Takes the World by Storm: A Look at Its Impact",
    description: "OpenAI's ChatGPT has rapidly gained popularity, showcasing the power and potential of large language models.",
    link: "https://openai.com/blog/chatgpt/",
    image_url: "https://placehold.co/600x400/3B82F6/FFFFFF?text=ChatGPT+Impact",
    category: ["Technology", "AI"],
    pubDate: "2022-11-30T12:00:00Z"
  },
  {
    title: "Midjourney V5: Enhanced Realism and Prompt Understanding",
    description: "Midjourney releases its fifth version, bringing significant improvements in image realism and adherence to prompts.",
    link: "https://www.midjourney.com/", // Placeholder, actual blog post might be on their discord or forum
    image_url: "https://placehold.co/600x400/EF4444/FFFFFF?text=Midjourney+V5",
    category: ["Technology", "AI"],
    pubDate: "2023-03-15T11:00:00Z"
  },
  {
    title: "AI in Healthcare: Revolutionizing Diagnostics and Drug Discovery",
    description: "Artificial intelligence is transforming healthcare, from accelerating disease diagnosis to streamlining drug development processes.",
    link: "https://www.who.int/news-room/fact-sheets/detail/artificial-intelligence-in-health", // Example WHO link
    image_url: "https://placehold.co/600x400/F59E0B/FFFFFF?text=AI+Healthcare",
    category: ["Science", "Health"],
    pubDate: "2023-01-20T08:00:00Z"
  }
];


/**
 * Fetches news articles from NewsData.io API for the dynamic section.
 * @param {string} category - The news category (e.g., 'technology', 'business', 'all').
 * @param {string} query - Search query string.
 * @param {string|null} pageToken - The nextPage token for pagination, or null for the first page.
 */
async function fetchDynamicNews(category = 'all', query = '', pageToken = null) {
  // Use specific IDs for the dynamic news section elements
  const newsArticlesGrid = document.getElementById('news-data-articles-grid');
  const loadingIndicator = document.getElementById('news-data-loading-indicator');
  const errorMessage = document.getElementById('news-data-error-message');
  const loadMoreBtn = document.getElementById('load-more-news-data');

  errorMessage.style.display = 'none';
  loadingIndicator.style.display = 'flex';
  loadMoreBtn.style.display = 'none';

  if (pageToken === null) {
    newsArticlesGrid.innerHTML = ''; // Clear grid only for initial load or new search/category
  }

  let url = `${NEWS_BASE_URL}?apikey=${NEWS_API_KEY}&language=en`;

  if (category && category !== 'all') {
    url += `&category=${category}`;
  }
  if (query) {
    url += `&q=${encodeURIComponent(query)}`;
  }
  if (pageToken) {
    url += `&page=${pageToken}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('NewsData.io API Error:', errorData);
      throw new Error(`HTTP error! status: ${response.status} - ${errorData.results.message || 'Unknown error'}`);
    }
    const data = await response.json();

    loadingIndicator.style.display = 'none';

    if (data.results && data.results.length > 0) {
      renderDynamicNews(data.results);
      dynamicNextPageToken = data.nextPage;

      if (dynamicNextPageToken) {
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
      }
    } else {
      if (pageToken === null) { // Only show no results message if it's the initial fetch
        newsArticlesGrid.innerHTML = '<p class="no-results-message">No news found for your criteria. Try a different category or search term.</p>';
      }
      loadMoreBtn.style.display = 'none';
      dynamicNextPageToken = null;
    }
  } catch (error) {
    console.error('Error fetching dynamic news:', error);
    loadingIndicator.style.display = 'none';
    errorMessage.style.display = 'flex';
    if (pageToken === null) { // Clear grid only if initial fetch failed
      newsArticlesGrid.innerHTML = '';
    }
    loadMoreBtn.style.display = 'none';
    dynamicNextPageToken = null;
  }
}

/**
 * Renders dynamic news articles into the grid.
 * @param {Array<Object>} articles - An array of news article objects.
 */
function renderDynamicNews(articles) {
  const newsArticlesGrid = document.getElementById('news-data-articles-grid');
  articles.forEach(article => {
    const newsCard = createDynamicNewsCardElement(article);
    newsArticlesGrid.appendChild(newsCard);
  });
}

/**
 * Renders static AI news articles into the grid.
 * @param {Array<Object>} articles - An array of static news article objects.
 */
function renderStaticAINews(articles) {
  const newsArticlesGrid = document.getElementById('news-data-articles-grid');
  newsArticlesGrid.innerHTML = ''; // Clear existing content
  articles.forEach(article => {
    const newsCard = createDynamicNewsCardElement(article); // Reuse the same card creation logic
    newsArticlesGrid.appendChild(newsCard);
  });
  // Hide load more button for static content
  document.getElementById('load-more-news-data').style.display = 'none';
  document.getElementById('news-data-loading-indicator').style.display = 'none';
  document.getElementById('news-data-error-message').style.display = 'none';
}


/**
 * Creates an HTML element for a single dynamic news card.
 * @param {Object} article - The news article data.
 * @returns {HTMLElement} The created news card div element.
 */
function createDynamicNewsCardElement(article) {
  const card = document.createElement('div');
  card.className = 'news-card'; // Reusing news-card class from your original style.css

  const imageUrl = article.image_url || 'https://placehold.co/600x400/E5E7EB/6B7280?text=No+Image';

  const categoryMap = {
    technology: { icon: 'fas fa-microchip', color: '#8B5CF6' }, // AI
    software: { icon: 'fas fa-tools', color: '#a855f7' },      // Tools
    business: { icon: 'fas fa-briefcase', color: '#10B981' }, // Internships
    science: { icon: 'fas fa-project-diagram', color: '#ec4899' }, // Projects
    // General categories from NewsData.io
    health: { icon: 'fas fa-heartbeat', color: '#EF4444' },
    sports: { icon: 'fas fa-baseball-ball', color: '#F59E0B' },
    entertainment: { icon: 'fas fa-film', color: '#06B6D4' },
    default: { icon: 'fas fa-newspaper', color: '#9CA3AF' }
  };

  const articleCategory = article.category && article.category.length > 0 ? article.category[0].toLowerCase() : 'default';
  const mappedCategory = categoryMap[articleCategory] || categoryMap.default;

  const publishedDate = article.pubDate ? new Date(article.pubDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  }) : 'N/A';

  card.innerHTML = `
    <div class="news-card-image-container">
      <img src="${imageUrl}" alt="${article.title || 'News Image'}" class="news-card-image" onerror="this.onerror=null;this.src='${imageUrl}';">
    </div>
    <div class="news-card-content">
      <div class="news-card-header">
        <div class="news-icon" style="background-color: ${mappedCategory.color};">
          <i class="${mappedCategory.icon}"></i>
        </div>
        <div class="news-meta">
          <span class="news-category">${article.category && article.category.length > 0 ? article.category[0] : 'General'}</span>
          <span class="news-time">
            <i class="fas fa-calendar-alt"></i>
            ${publishedDate}
          </span>
        </div>
      </div>
      <h4 class="news-title">${article.title || 'No Title Available'}</h4>
      <p class="news-summary">${article.description || article.content || 'No summary available.'}</p>
      <div class="news-footer">
        <a href="${article.link || '#'}" target="_blank" rel="noopener noreferrer" class="read-more-btn">Read More &rarr;</a>
      </div>
    </div>
  `;
  return card;
}

/**
 * Initializes the NewsData.io section with event listeners.
 */
function initializeNewsDataSection() {
  const categoryButtons = document.querySelectorAll('.news-categories .category-btn');
  const searchInput = document.getElementById('news-data-search-input');
  const searchButton = document.getElementById('news-data-search-btn');
  const loadMoreBtn = document.getElementById('load-more-news-data');
  const updateButton = document.getElementById('update-news-btn'); // Get the update button

  // Initial display of static news
  renderStaticAINews(staticAINews);

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.news-categories .category-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      currentDynamicNewsCategory = button.dataset.category;
      currentDynamicNewsQuery = '';
      searchInput.value = '';
      dynamicNextPageToken = null; // Reset token for new category
      fetchDynamicNews(currentDynamicNewsCategory, currentDynamicNewsQuery, dynamicNextPageToken);
    });
  });

  searchButton.addEventListener('click', () => {
    currentDynamicNewsQuery = searchInput.value.trim();
    currentDynamicNewsCategory = 'all'; // Reset category when searching
    document.querySelectorAll('.news-categories .category-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.news-categories .category-btn[data-category="all"]').classList.add('active');
    dynamicNextPageToken = null; // Reset token for new search
    fetchDynamicNews(currentDynamicNewsCategory, currentDynamicNewsQuery, dynamicNextPageToken);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });

  loadMoreBtn.addEventListener('click', () => {
    fetchDynamicNews(currentDynamicNewsCategory, currentDynamicNewsQuery, dynamicNextPageToken);
  });

  // Event listener for the Update button
  if (updateButton) {
    updateButton.addEventListener('click', () => {
      // Reset category and query to 'all' and empty for a fresh trending news fetch
      currentDynamicNewsCategory = 'all';
      currentDynamicNewsQuery = '';
      searchInput.value = ''; // Clear search input
      document.querySelectorAll('.news-categories .category-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelector('.news-categories .category-btn[data-category="all"]').classList.add('active');
      dynamicNextPageToken = null; // Ensure we fetch from the first page of NewsData.io
      fetchDynamicNews(currentDynamicNewsCategory, currentDynamicNewsQuery, dynamicNextPageToken);
    });
  }
}
