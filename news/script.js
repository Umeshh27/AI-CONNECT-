document.addEventListener('DOMContentLoaded', function () {
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
      <img src="${imageUrl}" alt="${article.title || 'News Image'}" class="news-card-image" onerror="this.onerror=null;this.src='https://placehold.co/600x400/E5E7EB/6B7280?text=No+Image';">
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
  // Target buttons specifically for the dynamic news section using data-news-type attribute
  const categoryButtons = document.querySelectorAll('.news-categories .category-btn');
  const searchInput = document.getElementById('news-data-search-input');
  const searchButton = document.getElementById('news-data-search-btn');
  const loadMoreBtn = document.getElementById('load-more-news-data');

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Deactivate all category buttons
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
    // Deactivate all category buttons and activate 'All'
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

  // Initial fetch for the dynamic news section when the page loads
  fetchDynamicNews(currentDynamicNewsCategory, currentDynamicNewsQuery, dynamicNextPageToken);
}
