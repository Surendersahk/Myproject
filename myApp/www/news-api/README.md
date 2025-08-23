# News API Integration for Rescue AI

This folder contains the news API integration for the Rescue AI application, specifically designed to fetch and display disaster and emergency news from the ReliefWeb API.

## Files Structure

- `reliefWebAPI.js` - Main API integration class for ReliefWeb API
- `newsData.js` - Mock data and fallback functionality
- `fetchNews.js` - Basic fetch utility (legacy)
- `styles.css` - Custom styles for news display
- `README.md` - This documentation file

## Features

### 1. Real-time Disaster News
- Fetches latest emergency reports from ReliefWeb API
- Displays real-time disaster and emergency updates
- Fallback to mock data when API is unavailable

### 2. Advanced Filtering
- Filter by disaster type (Flood, Earthquake, Cyclone, Wildfire, Drought)
- Filter by country (India, US, Japan, Australia, Philippines)
- Real-time filtering without additional API calls

### 3. Responsive Design
- Mobile-friendly interface
- Clean, accessible design matching Rescue AI branding
- Loading states and error handling

### 4. User Experience
- Smooth animations and transitions
- Refresh functionality
- Empty states and error messages
- Bottom navigation integration

## API Integration

### ReliefWeb API
The primary data source is the [ReliefWeb API](https://apidoc.rwlabs.org/), which provides:
- Real-time disaster reports
- Emergency situation updates
- Global coverage of humanitarian crises

### API Endpoints Used
- `GET /v1/reports` - Latest disaster reports
- Filtering by disaster type and country
- Sorting by date (newest first)

### Fallback Mechanism
If the ReliefWeb API is unavailable:
1. Uses mock disaster data
2. Maintains application functionality
3. Provides consistent user experience

## Usage

### Basic Integration
```javascript
// Load latest emergency news
const news = await window.ReliefWebAPI.getLatestEmergencyNews();

// Filter by disaster type
const floodNews = await window.ReliefWebAPI.getNewsByDisasterType('Flood');

// Filter by country
const indiaNews = await window.ReliefWebAPI.getNewsByCountry('India');
```

### Custom Filtering
```javascript
// Custom search parameters
const customNews = await window.ReliefWebAPI.searchDisasterNews(
  'Earthquake', // disaster type
  'Japan',      // country
  5             // limit
);
```

## Styling

The news components use a combination of:
- Tailwind CSS for base styling
- Custom CSS in `styles.css` for news-specific components
- Responsive design patterns
- Consistent color scheme with Rescue AI branding

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Fallback for older browsers with polyfills

## Error Handling

The system includes comprehensive error handling:
- Network error detection
- API timeout handling
- Graceful degradation to mock data
- User-friendly error messages

## Performance

- Efficient API calls with proper caching
- Client-side filtering for instant results
- Optimized DOM updates
- Lazy loading support

## Future Enhancements

1. **Caching**: Implement local storage caching for offline access
2. **Push Notifications**: Real-time alerts for critical emergencies
3. **Geolocation**: Location-based news filtering
4. **Search**: Advanced search functionality
5. **Bookmarks**: Save important news items
6. **Sharing**: Social media integration

## Dependencies

- ReliefWeb API (external)
- Font Awesome Icons
- Tailwind CSS
- Modern JavaScript (ES6+)

## Setup

No additional setup required. The news functionality is integrated into the main `news.html` file and will work out of the box.

## Contributing

When making changes:
1. Follow existing code patterns
2. Maintain backward compatibility
3. Test both API and fallback scenarios
4. Update documentation accordingly
