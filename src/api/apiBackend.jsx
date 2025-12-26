// API service for PMS Backend integration
// This file calls the existing pms-backend Laravel API endpoints

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Fetch all active properties from the backend
 * Calls: GET /api/properties
 * @param {number} page - Page number for pagination
 * @param {number} perPage - Number of items per page
 * @returns {Promise<{data: Array, meta: Object}>}
 */
export async function getBackendProperties(page = 1, perPage = 15) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/properties?page=${page}&per_page=${perPage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      data: result.data || [],
      meta: result.meta || {},
    };
  } catch (error) {
    console.error('Error fetching backend properties:', error);
    return { data: [], meta: {} };
  }
}

/**
 * Fetch a single property from the backend by ID
 * Calls: GET /api/properties/{id}
 * @param {number|string} id - Property ID
 * @returns {Promise<Object|null>}
 * @throws {Error} If property not found or request fails
 */
export async function getBackendPropertyById(id) {
  const propertyId = String(id);

  const response = await fetch(
    `${API_BASE_URL}/properties/${propertyId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Backend property not found: ${response.status}`);
  }

  const result = await response.json();
  return result.data || null;
}

/**
 * Fetch backend properties with comprehensive filters
 * Calls: GET /api/properties with query params
 * 
 * @param {Object} options - Filter options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.perPage - Items per page (default: 15, max: 100)
 * 
 * Location Filters:
 * @param {string} options.city - Filter by city
 * @param {string} options.country - Filter by country
 * @param {string} options.state - Filter by state/province
 * @param {number} options.latitude - Latitude for location-based search
 * @param {number} options.longitude - Longitude for location-based search
 * @param {number} options.radius - Search radius in kilometers (requires lat/lng)
 * 
 * Price Filters:
 * @param {number} options.minPrice - Minimum nightly price
 * @param {number} options.maxPrice - Maximum nightly price
 * @param {string} options.currency - Currency code (default: USD)
 * 
 * Property Type & Rooms:
 * @param {string|Array} options.propertyType - Property type(s) - comma-separated string or array
 * @param {number} options.bedrooms - Minimum number of bedrooms
 * @param {number} options.bathrooms - Minimum number of bathrooms
 * @param {number} options.beds - Minimum number of beds
 * @param {number} options.maxGuests - Minimum maximum guest capacity
 * @param {number} options.rooms - Minimum number of rooms
 * 
 * Amenities:
 * @param {string|Array} options.amenities - Amenity slugs - comma-separated string or array
 * 
 * Booking & Availability:
 * @param {string} options.checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} options.checkOut - Check-out date (YYYY-MM-DD)
 * @param {number} options.minimumStay - Maximum minimum stay nights
 * @param {number} options.maximumStay - Minimum maximum stay nights
 * @param {boolean} options.instantBook - Filter for instant book properties
 * 
 * Property Features:
 * @param {boolean} options.furnished - Filter by furnished status
 * @param {boolean} options.petFriendly - Filter for pet-friendly properties
 * @param {boolean} options.smokingAllowed - Filter for smoking allowed
 * @param {number} options.propertySizeMin - Minimum property size in square meters
 * @param {number} options.propertySizeMax - Maximum property size in square meters
 * 
 * Standout Stays:
 * @param {string|Array} options.standoutStays - Standout stay types - comma-separated string or array
 * 
 * Host Language:
 * @param {string|Array} options.hostLanguages - Language codes - comma-separated string or array
 * 
 * Sorting:
 * @param {string} options.sortBy - Sort field (created_at, price, rating, reviews_count, updated_at)
 * @param {string} options.order - Sort order (asc, desc) - default: desc
 * 
 * @returns {Promise<{data: Array, meta: Object}>}
 */
export async function fetchBackendPropertiesWithFilters({
  // Pagination
  page = 1,
  perPage = 15,
  
  // Location
  city = null,
  country = null,
  state = null,
  latitude = null,
  longitude = null,
  radius = null,
  
  // Price
  minPrice = null,
  maxPrice = null,
  currency = null,
  
  // Property Type & Rooms
  propertyType = null,
  bedrooms = null,
  bathrooms = null,
  beds = null,
  maxGuests = null,
  rooms = null,
  
  // Amenities
  amenities = null,
  
  // Booking & Availability
  checkIn = null,
  checkOut = null,
  minimumStay = null,
  maximumStay = null,
  instantBook = null,
  
  // Property Features
  furnished = null,
  petFriendly = null,
  smokingAllowed = null,
  propertySizeMin = null,
  propertySizeMax = null,
  
  // Standout Stays
  standoutStays = null,
  
  // Host Language
  hostLanguages = null,
  
  // Sorting
  sortBy = null,
  order = null,
} = {}) {
  try {
    const params = new URLSearchParams();
    
    // Pagination
    params.append('page', page.toString());
    params.append('per_page', perPage.toString());
    
    // Location filters
    if (city) params.append('city', city);
    if (country) params.append('country', country);
    if (state) params.append('state', state);
    if (latitude !== null) params.append('latitude', latitude.toString());
    if (longitude !== null) params.append('longitude', longitude.toString());
    if (radius !== null) params.append('radius', radius.toString());
    
    // Price filters
    if (minPrice !== null) params.append('min_price', minPrice.toString());
    if (maxPrice !== null) params.append('max_price', maxPrice.toString());
    if (currency) params.append('currency', currency);
    
    // Property type & rooms
    if (propertyType) {
      const propertyTypeStr = Array.isArray(propertyType) 
        ? propertyType.join(',') 
        : propertyType;
      params.append('property_type', propertyTypeStr);
    }
    if (bedrooms !== null) params.append('bedrooms', bedrooms.toString());
    if (bathrooms !== null) params.append('bathrooms', bathrooms.toString());
    if (beds !== null) params.append('beds', beds.toString());
    if (maxGuests !== null) params.append('max_guests', maxGuests.toString());
    if (rooms !== null) params.append('rooms', rooms.toString());
    
    // Amenities
    if (amenities) {
      const amenitiesStr = Array.isArray(amenities) 
        ? amenities.join(',') 
        : amenities;
      params.append('amenities', amenitiesStr);
    }
    
    // Booking & availability
    if (checkIn) params.append('check_in', checkIn);
    if (checkOut) params.append('check_out', checkOut);
    if (minimumStay !== null) params.append('minimum_stay', minimumStay.toString());
    if (maximumStay !== null) params.append('maximum_stay', maximumStay.toString());
    if (instantBook !== null) params.append('instant_book', instantBook.toString());
    
    // Property features
    if (furnished !== null) params.append('furnished', furnished.toString());
    if (petFriendly !== null) params.append('pet_friendly', petFriendly.toString());
    if (smokingAllowed !== null) params.append('smoking_allowed', smokingAllowed.toString());
    if (propertySizeMin !== null) params.append('property_size_min', propertySizeMin.toString());
    if (propertySizeMax !== null) params.append('property_size_max', propertySizeMax.toString());
    
    // Standout stays
    if (standoutStays) {
      const standoutStaysStr = Array.isArray(standoutStays) 
        ? standoutStays.join(',') 
        : standoutStays;
      params.append('standout_stays', standoutStaysStr);
    }
    
    // Host languages
    if (hostLanguages) {
      const hostLanguagesStr = Array.isArray(hostLanguages) 
        ? hostLanguages.join(',') 
        : hostLanguages;
      params.append('host_languages', hostLanguagesStr);
    }
    
    // Sorting
    if (sortBy) params.append('sort_by', sortBy);
    if (order) params.append('order', order);

    const response = await fetch(
      `${API_BASE_URL}/properties?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      data: result.data || [],
      meta: result.meta || {},
    };
  } catch (error) {
    console.error('Error fetching backend properties with filters:', error);
    return { data: [], meta: {} };
  }
}

export default {
  getBackendProperties,
  getBackendPropertyById,
  fetchBackendPropertiesWithFilters,
};
