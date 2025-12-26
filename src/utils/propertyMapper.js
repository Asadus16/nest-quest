/**
 * Property Mapper Utility
 * Transforms backend property data to match the Supabase format used by the frontend
 */

/**
 * Maps a single backend property to the frontend (Supabase) format
 * @param {Object} backendProperty - Property from PMS backend
 * @returns {Object} Property in frontend format
 */
export function mapBackendPropertyToFrontend(backendProperty) {
  if (!backendProperty) return null;

  // Extract images from photos array
  const images = (backendProperty.photos || [])
    .map(photo => photo.url)
    .filter(url => url && url.trim() !== '');

  // Get pricing - prefer short_term_rent pricing
  let price = 0;
  const pricings = backendProperty.pricings || [];
  const shortTermPricing = pricings.find(p => p.property_usage === 'short_term_rent');
  const monthlyPricing = pricings.find(p => p.property_usage === 'monthly_rent');

  if (shortTermPricing && shortTermPricing.nightly_base_price) {
    price = parseFloat(shortTermPricing.nightly_base_price);
  } else if (monthlyPricing && monthlyPricing.rental_amount) {
    // Convert monthly to daily (approximate)
    price = parseFloat(monthlyPricing.rental_amount) / 30;
  }

  // Build amenities/filter string from amenities array
  const amenities = (backendProperty.amenities || [])
    .map(a => a.name)
    .join(', ');

  // Get title from description or fallback
  const title = backendProperty.description?.public_name ||
    `${backendProperty.type || 'Property'} in ${backendProperty.city || 'Dubai'}`;

  // Format property type for display
  const propertyType = backendProperty.type
    ? backendProperty.type.charAt(0).toUpperCase() + backendProperty.type.slice(1)
    : 'Property';

  // Build detail page fields
  const bedrooms = backendProperty.bedrooms || 0;
  const bathrooms = backendProperty.bathrooms || 0;
  const maxGuests = backendProperty.max_guests || 2;

  // Build the property object in frontend format
  return {
    // Use 'backend_' prefix to identify backend properties
    id: `backend_${backendProperty.id}`,
    originalId: backendProperty.id,
    isBackendProperty: true,

    // Core property info
    'house-title': title,
    images: images.length > 0 ? images : ['https://placehold.co/400x300/e2e8f0/64748b?text=No+Image'],
    price: price * 83, // Convert to match the frontend's price conversion (AED to USD * 83)

    // Rating - default since backend doesn't have ratings yet
    house_rating: 4.5,
    guest_favorite: null,

    // Location
    country: backendProperty.country || 'UAE',
    city: backendProperty.city || 'Dubai',
    state: backendProperty.state || '',
    address_1: backendProperty.address_1 || '',
    address_2: backendProperty.address_2 || '',
    latitude: backendProperty.latitude,
    longitude: backendProperty.longitude,

    // Amenities as filter string
    filter: amenities,

    // Property details
    type: backendProperty.type,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    rooms: backendProperty.rooms,
    max_guests: maxGuests,
    property_size: backendProperty.property_size,
    area_size: backendProperty.area_size,
    furnished: backendProperty.furnished,

    // Fields for HouseDetail page (title_1, title_2, etc.)
    title_1: title,
    title_2: `${propertyType} in ${backendProperty.city || 'Dubai'}`,

    // Detail page counts
    guest_count: `${maxGuests} guest${maxGuests > 1 ? 's' : ''}`,
    bedroom_count: `${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}`,
    bed_count: `${bedrooms} bed${bedrooms !== 1 ? 's' : ''}`,
    bathroom_count: `${bathrooms} bathroom${bathrooms !== 1 ? 's' : ''}`,
    rating_count: '4.5 (New)',

    // Host info (using owner data if available)
    host_name: backendProperty.owner?.name || 'Property Host',
    host_image: backendProperty.owner?.profile_photo || null,

    // Booking settings
    check_in_time: backendProperty.check_in_time,
    check_out_time: backendProperty.check_out_time,
    minimum_stay: backendProperty.minimum_stay,
    maximum_stay: backendProperty.maximum_stay,

    // Description details
    short_description: backendProperty.description?.short_description || '',
    long_description: backendProperty.description?.long_description || '',
    house_manual: backendProperty.description?.house_manual || '',
    neighborhood: backendProperty.description?.neighborhood || '',

    // WiFi
    wifi_name: backendProperty.wifi_name,
    wifi_password: backendProperty.wifi_password,

    // Amenities as array (for detail page)
    amenitiesList: backendProperty.amenities || [],

    // Policies
    policies: backendProperty.policies || [],

    // Pricing details (for detail page)
    pricingDetails: shortTermPricing || monthlyPricing || null,

    // Store original backend data for reference
    _backendData: backendProperty,
  };
}

/**
 * Maps an array of backend properties to frontend format
 * @param {Array} backendProperties - Array of properties from PMS backend
 * @returns {Array} Properties in frontend format
 */
export function mapBackendPropertiesToFrontend(backendProperties) {
  if (!Array.isArray(backendProperties)) return [];
  return backendProperties.map(mapBackendPropertyToFrontend).filter(Boolean);
}

/**
 * Checks if a property ID belongs to the backend
 * @param {string|number} id - Property ID
 * @returns {boolean}
 */
export function isBackendPropertyId(id) {
  return String(id).startsWith('backend_');
}

/**
 * Extracts the original backend ID from a prefixed ID
 * @param {string|number} id - Property ID (possibly with backend_ prefix)
 * @returns {string} Original ID without prefix
 */
export function getOriginalBackendId(id) {
  return String(id).replace('backend_', '');
}

export default {
  mapBackendPropertyToFrontend,
  mapBackendPropertiesToFrontend,
  isBackendPropertyId,
  getOriginalBackendId,
};
