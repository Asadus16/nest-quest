# Properties Filters API Documentation

## Overview

This document describes the filter parameters for the Properties API endpoint. The filters allow clients to search and filter properties based on various criteria including location, amenities, pricing, property features, and more.

## Base URL
```
/api/properties
```

## Endpoint

**GET** `/api/properties`

Retrieve a paginated list of properties with optional filtering.

---

## Query Parameters

### Pagination Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number for pagination |
| `per_page` | integer | No | 15 | Number of items per page (max: 100) |

**Example:**
```
GET /api/properties?page=1&per_page=20
```

---

### Location Filters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `city` | string | No | Filter by city name | `city=Dubai` |
| `country` | string | No | Filter by country code or name | `country=UAE` or `country=United Arab Emirates` |
| `state` | string | No | Filter by state/province | `state=Dubai` |
| `latitude` | float | No | Latitude for location-based search | `latitude=25.2048` |
| `longitude` | float | No | Longitude for location-based search | `longitude=55.2708` |
| `radius` | integer | No | Search radius in kilometers (requires lat/lng) | `radius=10` |

**Example:**
```
GET /api/properties?city=Dubai&country=UAE
GET /api/properties?latitude=25.2048&longitude=55.2708&radius=5
```

---

### Price Range Filters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `min_price` | float | No | Minimum nightly price | `min_price=50` |
| `max_price` | float | No | Maximum nightly price | `max_price=500` |
| `currency` | string | No | Currency code (default: USD) | `currency=AED` |

**Example:**
```
GET /api/properties?min_price=100&max_price=300
```

**Note:** Prices should be in the property's base currency. The backend should handle currency conversion if needed.

---

### Property Type Filters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `property_type` | string | No | Filter by property type (comma-separated for multiple) | `property_type=apartment,villa` |

**Available Property Types:**
- `apartment`
- `house`
- `villa`
- `condo`
- `townhouse`
- `studio`
- `loft`
- `penthouse`
- `cabin`
- `cottage`
- `bungalow`
- `other`

**Example:**
```
GET /api/properties?property_type=apartment,villa
```

---

### Room & Capacity Filters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `bedrooms` | integer | No | Minimum number of bedrooms | `bedrooms=2` |
| `bathrooms` | integer | No | Minimum number of bathrooms | `bathrooms=1` |
| `beds` | integer | No | Minimum number of beds | `beds=2` |
| `max_guests` | integer | No | Minimum maximum guest capacity | `max_guests=4` |
| `rooms` | integer | No | Minimum number of rooms | `rooms=3` |

**Example:**
```
GET /api/properties?bedrooms=2&bathrooms=2&max_guests=4
```

---

### Amenities Filters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `amenities` | string | No | Comma-separated list of amenity slugs | `amenities=wifi,airconditioning,pool` |

**Available Amenities:**

#### Essentials
- `wifi` - WiFi
- `airconditioning` - Air Conditioning
- `heating` - Heating
- `kitchen` - Kitchen
- `washer` - Washer
- `dryer` - Dryer
- `parking` - Free parking on premises
- `tv` - TV

#### Features
- `pool` - Pool
- `hottub` - Hot tub
- `gym` - Gym
- `workspace` - Dedicated workspace
- `fireplace` - Fireplace
- `balcony` - Balcony
- `patio` - Patio
- `garden` - Garden
- `bbq` - BBQ grill

#### Safety
- `smoke_alarm` - Smoke alarm
- `carbon_monoxide_alarm` - Carbon monoxide alarm
- `fire_extinguisher` - Fire extinguisher
- `first_aid_kit` - First aid kit
- `security_cameras` - Security cameras
- `lockbox` - Lockbox

#### Accessibility
- `wheelchair_accessible` - Wheelchair accessible
- `step_free_entry` - Step-free entry
- `wide_entryway` - Wide entryway
- `accessible_bathroom` - Accessible bathroom
- `accessible_parking` - Accessible parking

**Example:**
```
GET /api/properties?amenities=wifi,airconditioning,pool,kitchen
```

**Note:** When multiple amenities are provided, properties must have ALL specified amenities (AND logic).

---

### Booking & Availability Filters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `check_in` | date | No | Check-in date (YYYY-MM-DD) | `check_in=2024-06-15` |
| `check_out` | date | No | Check-out date (YYYY-MM-DD) | `check_out=2024-06-20` |
| `minimum_stay` | integer | No | Maximum minimum stay nights | `minimum_stay=3` |
| `maximum_stay` | integer | No | Minimum maximum stay nights | `maximum_stay=30` |
| `instant_book` | boolean | No | Filter for instant book properties | `instant_book=true` |

**Example:**
```
GET /api/properties?check_in=2024-06-15&check_out=2024-06-20&instant_book=true
```

---

### Property Features Filters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `furnished` | boolean | No | Filter by furnished status | `furnished=true` |
| `pet_friendly` | boolean | No | Filter for pet-friendly properties | `pet_friendly=true` |
| `smoking_allowed` | boolean | No | Filter for smoking allowed | `smoking_allowed=false` |
| `property_size_min` | integer | No | Minimum property size in square meters | `property_size_min=50` |
| `property_size_max` | integer | No | Maximum property size in square meters | `property_size_max=200` |

**Example:**
```
GET /api/properties?furnished=true&pet_friendly=true
```

---

### Standout Stays Filters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `standout_stays` | string | No | Comma-separated list of standout stay types | `standout_stays=amazing_views,trending` |

**Available Standout Stay Types:**
- `amazing_views` - Amazing views
- `trending` - Trending
- `amazing_pools` - Amazing pools
- `beachfront` - Beachfront
- `cabins` - Cabins
- `camping` - Camping
- `castles` - Castles
- `countryside` - Countryside
- `design` - Design
- `domes` - Domes
- `farms` - Farms
- `islands` - Islands
- `lakefront` - Lakefront
- `luxe` - Luxe
- `mansions` - Mansions
- `off_the_grid` - Off-the-grid
- `play` - Play
- `riads` - Riads
- `ryokans` - Ryokans
- `ski_in_out` - Ski-in/out
- `tiny_homes` - Tiny homes
- `towers` - Towers
- `tropical` - Tropical
- `windmills` - Windmills
- `yurts` - Yurts

**Example:**
```
GET /api/properties?standout_stays=amazing_views,beachfront
```

---

### Host Language Filters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `host_languages` | string | No | Comma-separated list of language codes | `host_languages=en,ar` |

**Available Language Codes:**
- `en` - English
- `ar` - Arabic
- `fr` - French
- `es` - Spanish
- `de` - German
- `it` - Italian
- `pt` - Portuguese
- `zh` - Chinese
- `ja` - Japanese
- `ko` - Korean
- `hi` - Hindi
- `ru` - Russian

**Example:**
```
GET /api/properties?host_languages=en,ar
```

---

### Sorting & Ordering

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `sort_by` | string | No | Sort field (default: `created_at`) | `sort_by=price` |
| `order` | string | No | Sort order: `asc` or `desc` (default: `desc`) | `order=asc` |

**Available Sort Fields:**
- `created_at` - Date created (default)
- `price` - Price (nightly)
- `rating` - Average rating
- `reviews_count` - Number of reviews
- `updated_at` - Last updated

**Example:**
```
GET /api/properties?sort_by=price&order=asc
```

---

## Request Examples

### Basic Request
```http
GET /api/properties?page=1&per_page=15
```

### Filter by Location
```http
GET /api/properties?city=Dubai&country=UAE&page=1&per_page=20
```

### Filter by Price Range
```http
GET /api/properties?min_price=100&max_price=500&currency=AED
```

### Filter by Property Type and Rooms
```http
GET /api/properties?property_type=apartment&bedrooms=2&bathrooms=2&max_guests=4
```

### Filter by Amenities
```http
GET /api/properties?amenities=wifi,airconditioning,pool,kitchen,parking
```

### Filter by Availability
```http
GET /api/properties?check_in=2024-06-15&check_out=2024-06-20&instant_book=true
```

### Complex Filter Combination
```http
GET /api/properties?city=Dubai&country=UAE&property_type=apartment,villa&bedrooms=2&bathrooms=2&min_price=100&max_price=500&amenities=wifi,airconditioning,pool&furnished=true&pet_friendly=true&check_in=2024-06-15&check_out=2024-06-20&sort_by=price&order=asc&page=1&per_page=20
```

---

## Response Format

### Success Response (200 OK)

```json
{
  "data": [
    {
      "id": 1,
      "type": "apartment",
      "city": "Dubai",
      "country": "UAE",
      "state": "Dubai",
      "address_1": "123 Main Street",
      "address_2": "Downtown",
      "latitude": 25.2048,
      "longitude": 55.2708,
      "bedrooms": 2,
      "bathrooms": 2,
      "beds": 2,
      "max_guests": 4,
      "rooms": 3,
      "property_size": 120,
      "area_size": 100,
      "furnished": true,
      "description": {
        "public_name": "Modern Apartment in Downtown Dubai",
        "short_description": "Beautiful 2-bedroom apartment...",
        "long_description": "This stunning apartment...",
        "house_manual": "Check-in instructions...",
        "neighborhood": "Located in the heart of Dubai..."
      },
      "photos": [
        {
          "id": 1,
          "url": "https://example.com/image1.jpg",
          "type": "main"
        }
      ],
      "pricings": [
        {
          "property_usage": "short_term_rent",
          "nightly_base_price": 150.00,
          "currency": "AED"
        }
      ],
      "amenities": [
        {
          "id": 1,
          "name": "WiFi",
          "slug": "wifi",
          "category": "essentials"
        },
        {
          "id": 2,
          "name": "Air Conditioning",
          "slug": "airconditioning",
          "category": "essentials"
        }
      ],
      "policies": [],
      "check_in_time": "15:00",
      "check_out_time": "11:00",
      "minimum_stay": 1,
      "maximum_stay": 30,
      "instant_book": true,
      "pet_friendly": false,
      "smoking_allowed": false,
      "owner": {
        "id": 1,
        "name": "John Doe",
        "profile_photo": "https://example.com/profile.jpg"
      },
      "created_at": "2024-01-15T10:30:00.000000Z",
      "updated_at": "2024-01-15T10:30:00.000000Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 150,
    "last_page": 10,
    "from": 1,
    "to": 15,
    "path": "/api/properties",
    "first_page_url": "/api/properties?page=1",
    "last_page_url": "/api/properties?page=10",
    "next_page_url": "/api/properties?page=2",
    "prev_page_url": null
  }
}
```

### Error Response (422 Validation Error)

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "check_in": [
      "The check in date must be a date after today."
    ],
    "check_out": [
      "The check out date must be a date after check in date."
    ],
    "min_price": [
      "The min price must be a number."
    ]
  }
}
```

### Error Response (400 Bad Request)

```json
{
  "message": "Invalid filter parameters.",
  "error": "The maximum per_page value is 100."
}
```

---

## Filter Logic

### AND vs OR Logic

- **Multiple values in same filter (comma-separated)**: Uses **OR** logic
  - Example: `property_type=apartment,villa` returns properties that are apartments OR villas

- **Different filter parameters**: Uses **AND** logic
  - Example: `city=Dubai&bedrooms=2&amenities=wifi` returns properties in Dubai AND with 2 bedrooms AND with WiFi

- **Multiple amenities**: Uses **AND** logic
  - Example: `amenities=wifi,pool` returns properties that have WiFi AND Pool

### Date Range Validation

- `check_in` must be today or in the future
- `check_out` must be after `check_in`
- If only `check_in` is provided, properties available on that date are returned
- If only `check_out` is provided, it should be ignored (or return error)
- If both are provided, only properties available for the entire date range are returned

### Price Range

- If only `min_price` is provided, returns properties with price >= `min_price`
- If only `max_price` is provided, returns properties with price <= `max_price`
- If both are provided, returns properties with price between `min_price` and `max_price`
- Prices should be compared in the same currency

### Location Search

- If `latitude` and `longitude` are provided with `radius`, returns properties within the radius
- If `city` is provided, performs case-insensitive partial match
- If `country` is provided, matches by country code or name
- Location filters can be combined (e.g., `city=Dubai&country=UAE`)

---

## Implementation Notes

### Backend Implementation Guidelines

1. **Filter Validation**
   - Validate all filter parameters
   - Return appropriate error messages for invalid values
   - Handle type conversions (string to integer, etc.)

2. **Database Queries**
   - Use efficient database queries with proper indexes
   - Consider using database views or materialized views for complex filters
   - Use eager loading for relationships (amenities, photos, owner, etc.)

3. **Performance**
   - Cache frequently used filter combinations
   - Use database indexes on commonly filtered fields (city, country, price, etc.)
   - Consider pagination limits to prevent excessive data retrieval

4. **Amenities Filtering**
   - Store amenities as a many-to-many relationship
   - Use JOIN queries to filter by multiple amenities
   - Consider using a JSON column for flexible amenity storage

5. **Date Availability**
   - Check property availability against bookings table
   - Consider minimum stay requirements
   - Handle timezone conversions properly

6. **Sorting**
   - Default sort should be by `created_at DESC` (newest first)
   - Ensure sort fields are indexed
   - Handle NULL values in sorting (typically NULLs last)

### Frontend Integration

```javascript
// Example: Building filter query
const buildFilterQuery = (filters) => {
  const params = new URLSearchParams();
  
  // Pagination
  if (filters.page) params.append('page', filters.page);
  if (filters.perPage) params.append('per_page', filters.perPage);
  
  // Location
  if (filters.city) params.append('city', filters.city);
  if (filters.country) params.append('country', filters.country);
  
  // Price
  if (filters.priceRange?.min) params.append('min_price', filters.priceRange.min);
  if (filters.priceRange?.max) params.append('max_price', filters.priceRange.max);
  
  // Property Type
  if (filters.propertyType?.length) {
    params.append('property_type', filters.propertyType.join(','));
  }
  
  // Rooms
  if (filters.rooms?.bedrooms) params.append('bedrooms', filters.rooms.bedrooms);
  if (filters.rooms?.bathrooms) params.append('bathrooms', filters.rooms.bathrooms);
  if (filters.rooms?.beds) params.append('beds', filters.rooms.beds);
  
  // Amenities
  if (filters.amenities?.length) {
    params.append('amenities', filters.amenities.join(','));
  }
  
  // Dates
  if (filters.checkIn) params.append('check_in', filters.checkIn);
  if (filters.checkOut) params.append('check_out', filters.checkOut);
  
  // Sorting
  if (filters.sortBy) params.append('sort_by', filters.sortBy);
  if (filters.order) params.append('order', filters.order);
  
  return params.toString();
};

// Usage
const filters = {
  page: 1,
  perPage: 20,
  city: 'Dubai',
  country: 'UAE',
  priceRange: { min: 100, max: 500 },
  propertyType: ['apartment', 'villa'],
  rooms: { bedrooms: 2, bathrooms: 2 },
  amenities: ['wifi', 'pool', 'airconditioning'],
  checkIn: '2024-06-15',
  checkOut: '2024-06-20',
  sortBy: 'price',
  order: 'asc'
};

const queryString = buildFilterQuery(filters);
const response = await fetch(`/api/properties?${queryString}`);
```

---

## Testing Examples

### Test Case 1: Basic Filtering
```http
GET /api/properties?city=Dubai&bedrooms=2
```
**Expected:** Returns properties in Dubai with at least 2 bedrooms

### Test Case 2: Price Range
```http
GET /api/properties?min_price=100&max_price=300
```
**Expected:** Returns properties with price between 100 and 300

### Test Case 3: Multiple Amenities
```http
GET /api/properties?amenities=wifi,pool,kitchen
```
**Expected:** Returns properties that have WiFi AND Pool AND Kitchen

### Test Case 4: Date Availability
```http
GET /api/properties?check_in=2024-06-15&check_out=2024-06-20
```
**Expected:** Returns properties available for the entire date range

### Test Case 5: Complex Combination
```http
GET /api/properties?city=Dubai&property_type=apartment&bedrooms=2&min_price=100&max_price=500&amenities=wifi,airconditioning&furnished=true&sort_by=price&order=asc
```
**Expected:** Returns furnished apartments in Dubai with 2+ bedrooms, price 100-500, with WiFi and AC, sorted by price ascending

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad request (invalid parameters) |
| 422 | Validation error |
| 500 | Server error |

---

## Changelog

### Version 1.0.0 (2024-01-15)
- Initial filter documentation
- Basic location, price, and property type filters
- Amenities filtering
- Date availability filtering

---

## Support

For questions or issues regarding property filters, please contact the development team or refer to the main API documentation.

