// Fetch news from the ReliefWeb API
async function fetchNews() {
    const url = 'https://api.reliefweb.int/v1/reports?appname=api&limit=5'; // Example endpoint
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayNews(data);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Function to display news on the page
function displayNews(data) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear existing content
    data.data.forEach(item => {
        const article = document.createElement('article');
        article.className = 'bg-white rounded-lg shadow p-4';
        article.innerHTML = `
            <h2 class="text-gray-900 font-semibold text-base">${item.fields.title}</h2>
            <p class="text-gray-700 text-sm">${item.fields.summary}</p>
            <time class="text-gray-400 text-xs">${new Date(item.fields.date).toLocaleString()}</time>
        `;
        newsContainer.appendChild(article);
    });
}

// Call fetchNews on page load
document.addEventListener('DOMContentLoaded', fetchNews);
