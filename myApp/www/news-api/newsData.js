// Mock disaster/emergency news data for demonstration
// This can be replaced with actual ReliefWeb API calls

const mockNewsData = {
    data: [
        {
            fields: {
                title: "Flood Warning Issued for Coastal Regions",
                summary: "Heavy rainfall expected in western coastal areas, residents advised to take precautions.",
                date: "2025-04-06T12:37:19Z"
            }
        },
        {
            fields: {
                title: "Emergency Services Deployed in Chennai",
                summary: "NDRF teams activated for flood relief operations in affected areas.",
                date: "2025-04-06T09:37:19Z"
            }
        },
        {
            fields: {
                title: "Earthquake Preparedness Drill Scheduled",
                summary: "State-wide earthquake preparedness drill to be conducted next week.",
                date: "2025-04-05T15:22:10Z"
            }
        },
        {
            fields: {
                title: "Cyclone Alert for Eastern Coast",
                summary: "Meteorological department issues cyclone warning for coastal districts.",
                date: "2025-04-05T08:45:30Z"
            }
        },
        {
            fields: {
                title: "Relief Camps Established in Maharashtra",
                summary: "Temporary shelters set up for flood-affected communities.",
                date: "2025-04-04T18:20:15Z"
            }
        }
    ]
};

// Function to get news data (can be replaced with actual API call)
function getNewsData() {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            resolve(mockNewsData);
        }, 1000);
    });
}

// Function to display news with loading state
async function displayNewsWithLoading() {
    const newsContainer = document.getElementById('news-container');
    
    // Show loading state
    newsContainer.innerHTML = `
        <div class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            <span class="ml-3 text-gray-600">Loading news...</span>
        </div>
    `;
    
    try {
        const newsData = await getNewsData();
        displayNews(newsData);
    } catch (error) {
        console.error('Error loading news:', error);
        newsContainer.innerHTML = `
            <div class="text-center py-8 text-red-500">
                <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                <p>Failed to load news. Please try again later.</p>
            </div>
        `;
    }
}

// Function to display news articles
function displayNews(data) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear existing content
    
    if (!data || !data.data || data.data.length === 0) {
        newsContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-newspaper text-2xl mb-2"></i>
                <p>No news available at the moment.</p>
            </div>
        `;
        return;
    }
    
    data.data.forEach(item => {
        const article = document.createElement('article');
        article.className = 'bg-white rounded-lg shadow p-4 mb-4';
        article.innerHTML = `
            <h2 class="text-gray-900 font-semibold text-base mb-2">${item.fields.title}</h2>
            <p class="text-gray-700 text-sm mb-3">${item.fields.summary}</p>
            <time class="text-gray-400 text-xs">${new Date(item.fields.date).toLocaleString()}</time>
        `;
        newsContainer.appendChild(article);
    });
}

// Export functions for use in other files
window.NewsAPI = {
    getNewsData,
    displayNewsWithLoading,
    displayNews
};
