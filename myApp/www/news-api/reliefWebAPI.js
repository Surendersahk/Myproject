// ReliefWeb API integration for disaster and emergency news
class ReliefWebAPI {
    constructor() {
        this.baseURL = 'https://api.reliefweb.int/v1';
        this.defaultParams = {
            appname: 'rescue-ai-app',
            limit: 10,
            sort: ['date:desc'],
            preset: 'latest'
        };
    }

    // Fetch reports from ReliefWeb API
    async fetchReports(params = {}) {
        const queryParams = new URLSearchParams({
            ...this.defaultParams,
            ...params
        });
        
        try {
            const response = await fetch(`${this.baseURL}/reports?${queryParams}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return this.processResponse(data);
        } catch (error) {
            console.error('Error fetching from ReliefWeb API:', error);
            throw error;
        }
    }

    // Process API response
    processResponse(data) {
        if (!data || !data.data) {
            return [];
        }

        return data.data.map(item => ({
            id: item.id,
            title: item.fields.title,
            summary: item.fields.body || 'No summary available',
            date: item.fields.date.created || item.fields.date.original,
            source: item.fields.source ? item.fields.source[0].name : 'Unknown',
            url: item.fields.url,
            disasterType: item.fields.disaster_type ? item.fields.disaster_type[0].name : 'General',
            country: item.fields.country ? item.fields.country[0].name : 'Multiple'
        }));
    }

    // Search for specific disaster types
    async searchDisasterNews(disasterType = '', country = '', limit = 5) {
        const params = {
            limit: limit,
            'filter[field]': 'disaster_type.name',
            'filter[value]': disasterType
        };

        if (country) {
            params['filter[field]'] = 'country.name';
            params['filter[value]'] = country;
        }

        return await this.fetchReports(params);
    }

    // Get latest emergency news
    async getLatestEmergencyNews(limit = 10) {
        return await this.fetchReports({ limit });
    }

    // Get news by specific disaster type
    async getNewsByDisasterType(disasterType, limit = 5) {
        return await this.searchDisasterNews(disasterType, '', limit);
    }

    // Get news by country
    async getNewsByCountry(country, limit = 5) {
        return await this.searchDisasterNews('', country, limit);
    }
}

// Create global instance
window.ReliefWebAPI = new ReliefWebAPI();

// Utility function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ReliefWebAPI, formatDate };
}
