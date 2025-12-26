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
 * Fetch backend properties with filters
 * Calls: GET /api/properties with query params
 * @param {Object} options - Filter options
 * @param {string} options.city - Filter by city
 * @param {string} options.country - Filter by country
 * @param {number} options.page - Page number
 * @param {number} options.perPage - Items per page
 * @returns {Promise<{data: Array, meta: Object}>}
 */
export async function fetchBackendPropertiesWithFilters({
  city = null,
  country = null,
  page = 1,
  perPage = 15,
} = {}) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });

    if (city) {
      params.append('city', city);
    }
    if (country) {
      params.append('country', country);
    }

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
