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

  // Get pricing - check all pricing types
  let price = 0;
  let priceType = 'night'; // Default display type
  const pricings = backendProperty.pricings || [];
  const shortTermPricing = pricings.find(p => p.property_usage === 'short_term_rent');
  const monthlyPricing = pricings.find(p => p.property_usage === 'monthly_rent');
  const salePricing = pricings.find(p => p.property_usage === 'sale');

  if (shortTermPricing && shortTermPricing.nightly_base_price) {
    // Short-term rent: use nightly price directly
    price = parseFloat(shortTermPricing.nightly_base_price);
    priceType = 'night';
  } else if (monthlyPricing && monthlyPricing.rental_amount) {
    // Monthly rent: show monthly price (not converted to daily)
    price = parseFloat(monthlyPricing.rental_amount);
    priceType = 'month';
  } else if (salePricing && salePricing.selling_price) {
    // Sale: show selling price
    price = parseFloat(salePricing.selling_price);
    priceType = 'total';
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
    // Use numeric ID directly (no prefix) for clean URLs
    id: backendProperty.id,
    isBackendProperty: true,

    // Core property info
    'house-title': title,
    images: images.length > 0 ? images : ['https://placehold.co/400x300/e2e8f0/64748b?text=No+Image'],
    price: price * 83, // Multiply by 83 so frontend's division gives correct AED price
    priceType: priceType, // 'night', 'month', or 'total'
    rawPrice: price, // Actual price in AED for direct use

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

    // Fields used by detail page components
    house_description: backendProperty.description?.long_description ||
                       backendProperty.description?.short_description || '',
    house_location: `${backendProperty.city || 'Dubai'}, ${backendProperty.country || 'UAE'}`,
    location_description: backendProperty.description?.neighborhood ||
                          backendProperty.description?.transit ||
                          backendProperty.description?.access || '',
    host_description: backendProperty.description?.interaction || '',

    // Space details for property info
    space_description: backendProperty.description?.space || '',
    notes: backendProperty.description?.notes || '',

    // WiFi
    wifi_name: backendProperty.wifi_name,
    wifi_password: backendProperty.wifi_password,

    // Amenities as array (for detail page)
    amenitiesList: backendProperty.amenities || [],

    // Policies
    policies: backendProperty.policies || [],

    // Pricing details (for detail page)
    pricingDetails: shortTermPricing || monthlyPricing || null,

    // Short-term rental pricing breakdown
    cleaning_fee: shortTermPricing?.cleaning_fee ? parseFloat(shortTermPricing.cleaning_fee) : 0,
    cleaning_fee_tax_percentage: shortTermPricing?.cleaning_fee_tax_percentage ? parseFloat(shortTermPricing.cleaning_fee_tax_percentage) : 0,
    security_deposit: shortTermPricing?.security_deposit ? parseFloat(shortTermPricing.security_deposit) : 0,
    extra_guest_fee: shortTermPricing?.extra_guest_fee ? parseFloat(shortTermPricing.extra_guest_fee) : 0,
    pet_fee: shortTermPricing?.pet_fee ? parseFloat(shortTermPricing.pet_fee) : 0,
    tax_percentage: shortTermPricing?.tax_percentage ? parseFloat(shortTermPricing.tax_percentage) : 0,
    weekend_price: shortTermPricing?.weekend_price ? parseFloat(shortTermPricing.weekend_price) : 0,
    weekly_price: shortTermPricing?.weekly_price ? parseFloat(shortTermPricing.weekly_price) : 0,

    // Monthly rental pricing
    deposit_required: monthlyPricing?.deposit_required ? parseFloat(monthlyPricing.deposit_required) : 0,
    service_charges_rent: monthlyPricing?.service_charges_rent ? parseFloat(monthlyPricing.service_charges_rent) : 0,

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
 * Now deprecated - use houseInfo.isBackendProperty instead
 * @param {string|number} id - Property ID
 * @returns {boolean}
 * @deprecated
 */
export function isBackendPropertyId(id) {
  // No longer using prefix - check isBackendProperty flag on the data instead
  return false;
}

/**
 * Gets the property ID for API calls
 * @param {string|number} id - Property ID
 * @returns {string} ID for API use
 */
export function getPropertyId(id) {
  return String(id);
}

export default {
  mapBackendPropertyToFrontend,
  mapBackendPropertiesToFrontend,
  isBackendPropertyId,
  getPropertyId,
};
