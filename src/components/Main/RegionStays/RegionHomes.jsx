import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRowsWithOptions, getAllRows } from "../../../api/apiRooms";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import Header from "../../Header/Header";
import LongFooter from "../../House-detail/LongFooter";
import { applyDubaiBranding } from "../../../utils/dubaiBranding";
import { svg as favSvg } from "../../../asset/HeartIconSvg";
import {
  setHoveredItem,
  setIsFavorite,
  setItemId,
  setShowLogin,
  setUserFavListing,
  removeUserFavListing,
  setStartScroll,
} from "../../../redux/AppSlice";
import star from "../../../asset/Icons_svg/star.svg";

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom price marker icon
const createPriceIcon = (price, isHovered) => {
  return L.divIcon({
    className: "custom-price-marker",
    html: `
      <div style="
        background: ${isHovered ? "#000" : "#fff"};
        color: ${isHovered ? "#fff" : "#000"};
        padding: 6px 10px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        border: 1px solid ${isHovered ? "#000" : "#ddd"};
        white-space: nowrap;
        transform: translate(-50%, -50%);
      ">
        AED ${price}
      </div>
    `,
    iconSize: [80, 30],
    iconAnchor: [40, 15],
  });
};

// ============ PROPERTY CARD COMPONENT ============
const PropertyCard = ({ item, favListings, userData, dispatch, onHover }) => {
  const navigate = useNavigate();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userData) {
      dispatch(setShowLogin(true));
    } else {
      if (favListings.includes(item.id)) {
        dispatch(removeUserFavListing(item.id));
        dispatch(setIsFavorite(false));
        dispatch(setItemId(item.id));
      } else {
        dispatch(setUserFavListing(item.id));
        dispatch(setIsFavorite(true));
        dispatch(setItemId(item.id));
      }
    }
  };

  const pricePerNight = Math.ceil(item.price / 83);
  const selectedStartDate = useSelector((store) => store.form.selectedStartDate);
  const selectedEndDate = useSelector((store) => store.form.selectedEndDate);

  const formatDateRange = () => {
    if (selectedStartDate && selectedEndDate) {
      const start = format(new Date(selectedStartDate), "MMM dd");
      const end = format(new Date(selectedEndDate), "MMM dd");
      return `${start}-${end}`;
    }
    return "Add dates";
  };

  return (
    <div
      onClick={() => navigate(`/property/${item.id}`)}
      onMouseEnter={() => onHover?.(item.id)}
      onMouseLeave={() => onHover?.(null)}
      className="cursor-pointer group"
    >
      <div className="relative rounded-2xl overflow-hidden mb-3 aspect-square">
        <img
          src={item.images?.[0] || "https://via.placeholder.com/400x300"}
          alt={item["house-title"]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.guest_favorite === "Guest favourite" && (
          <div className="absolute top-2 left-2 bg-white rounded-lg px-2 py-1 shadow-lg z-10">
            <span className="text-[10px] font-medium">Guest favourite</span>
          </div>
        )}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 hover:scale-110 transition-transform"
        >
          {favSvg(item?.id, favListings, userData)}
        </button>
        {item.images && item.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {item.images.slice(0, 5).map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${index === 0 ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-base flex-1 truncate pr-2">{item["house-title"]}</h3>
          {item.house_rating > 2 && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <img src={star} className="w-4 h-4" alt="Star" />
              <span className="font-medium text-sm">{item.house_rating}</span>
            </div>
          )}
        </div>
        <p className="text-grey text-sm mb-1 line-clamp-1">
          {item.location || `${Math.ceil(item.price / 83 + 150)} kilometers away`}
        </p>
        <p className="text-grey text-sm mb-1">{formatDateRange()}</p>
        <div className="flex items-baseline gap-1">
          <span className="font-semibold text-base">AED {pricePerNight}</span>
          <span className="text-grey text-sm">night</span>
        </div>
      </div>
    </div>
  );
};

// ============ MAP ICON ============
const MapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
    <path d="M8 2v16" />
    <path d="M16 6v16" />
  </svg>
);

// ============ LIST ICON ============
const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

// ============ LEAFLET MAP COMPONENT ============
const PropertyMap = ({ properties, hoveredId, onMarkerClick, className, style }) => {
  // Dubai coordinates as default center
  const defaultCenter = [25.2048, 55.2708];
  
  // Calculate center from properties if available
  const getCenter = () => {
    if (!properties || properties.length === 0) return defaultCenter;
    
    // Use first property with coordinates or default
    const propWithCoords = properties.find(p => p.latitude && p.longitude);
    if (propWithCoords) {
      return [propWithCoords.latitude, propWithCoords.longitude];
    }
    return defaultCenter;
  };

  return (
    <MapContainer
      center={getCenter()}
      zoom={12}
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {properties?.map((property, index) => {
        // Generate pseudo-random coordinates around Dubai if not available
        const lat = property.latitude || 25.2048 + (Math.sin(index * 0.5) * 0.05);
        const lng = property.longitude || 55.2708 + (Math.cos(index * 0.7) * 0.08);
        const price = Math.ceil(property.price / 83);
        const isHovered = hoveredId === property.id;

        return (
          <Marker
            key={property.id}
            position={[lat, lng]}
            icon={createPriceIcon(price, isHovered)}
            eventHandlers={{
              click: () => onMarkerClick?.(property),
            }}
          >
            <Popup>
              <div className="w-48">
                <img
                  src={property.images?.[0] || "https://via.placeholder.com/200x150"}
                  alt={property["house-title"]}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <h4 className="font-semibold text-sm truncate">{property["house-title"]}</h4>
                <p className="text-sm font-medium">AED {price}/night</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

// ============ MAIN COMPONENT ============
const RegionHomes = () => {
  const { regionName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, userFavListing: favListings } = useSelector((store) => store.app);
  const headerRef = useRef(null);

  useEffect(() => {
    dispatch(setStartScroll(false));
  }, [dispatch]);

  const formattedRegionName = regionName
    ? regionName.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "";

  useQuery({ queryKey: ["allRows"], queryFn: getAllRows });

  let city = null;
  let country = "United Arab Emirates";
  if (formattedRegionName.toLowerCase().includes("dubai")) {
    city = "Dubai";
  } else {
    city = formattedRegionName;
  }

  const isValidImageUrl = (url) => {
    if (!url || typeof url !== "string") return false;
    const trimmed = url.trim();
    if (trimmed === "" || trimmed === "null" || trimmed === "undefined") return false;
    try {
      new URL(trimmed);
      return true;
    } catch {
      return (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("data:image/") ||
        (trimmed.startsWith("/") && trimmed.length > 1)
      );
    }
  };

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["regionHomes", city, country, formattedRegionName],
    queryFn: async () => {
      try {
        let allResults = [];
        let currentOffset = 0;
        let attempts = 0;
        const maxAttempts = 3;
        const fetchLimit = 150;

        while (allResults.length < 50 && attempts < maxAttempts) {
          let result = await fetchRowsWithOptions(null, null, country, city, currentOffset, currentOffset + fetchLimit - 1);
          if (!result || result.length === 0) {
            result = await fetchRowsWithOptions(null, null, country, null, currentOffset, currentOffset + fetchLimit - 1);
          }
          if (!result || result.length === 0) {
            result = await fetchRowsWithOptions(null, null, null, city, currentOffset, currentOffset + fetchLimit - 1);
          }
          if (!result || result.length === 0) {
            result = await fetchRowsWithOptions(null, null, null, null, currentOffset, currentOffset + fetchLimit - 1);
          }
          if (!result || result.length === 0) break;

          const validResults = (result || []).filter((item) => {
            if (!item.images || !Array.isArray(item.images) || item.images.length === 0) return false;
            return item.images[0] && isValidImageUrl(item.images[0]);
          });

          allResults = [...allResults, ...validResults];
          currentOffset += fetchLimit;
          attempts++;
        }

        return allResults.slice(0, 50).map(applyDubaiBranding);
      } catch (err) {
        console.error("Error fetching properties:", err);
        return [];
      }
    },
    enabled: true,
    retry: 2,
  });

  const { minimize } = useSelector((state) => state.app);

  // ============ STATE ============
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 1024 : false);
  const [mobileView, setMobileView] = useState("list"); // 'list' or 'map'
  const [hoveredPropertyId, setHoveredPropertyId] = useState(null);
  const [sheetHeight, setSheetHeight] = useState(200);
  const [isDragging, setIsDragging] = useState(false);

  // Drag refs
  const dragRef = useRef({ active: false, startY: 0, startHeight: 200 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sheet height limits
  const minHeight = 100;
  const maxHeight = typeof window !== "undefined" ? window.innerHeight - 150 : 500;

  // Drag handlers for bottom sheet
  const handleDragStart = useCallback((e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = { active: true, startY: clientY, startHeight: sheetHeight };
    setIsDragging(true);
  }, [sheetHeight]);

  const handleDragMove = useCallback((e) => {
    if (!dragRef.current.active) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = dragRef.current.startY - clientY;
    const newHeight = Math.max(minHeight, Math.min(maxHeight, dragRef.current.startHeight + deltaY));
    setSheetHeight(newHeight);
  }, [minHeight, maxHeight]);

  const handleDragEnd = useCallback(() => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setIsDragging(false);
    
    // Snap to min or max
    const midPoint = (minHeight + maxHeight) / 2;
    setSheetHeight(sheetHeight > midPoint ? maxHeight : minHeight);
  }, [sheetHeight, minHeight, maxHeight]);

  const handleMarkerClick = (property) => {
    navigate(`/property/${property.id}`);
  };

  const getHeaderClasses = () => {
    const baseClasses = "fixed transition-all duration-300 ease-in-out bg-gray-50 w-full flex items-start justify-center top-0";
    const zIndexClass = minimize ? "z-50" : "z-40";
    const heightClass = minimize ? "animate-expand" : "h-[5rem]";
    return `${baseClasses} ${zIndexClass} ${heightClass}`;
  };

  // ============ RENDER ============
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div ref={headerRef} id="header" className={getHeaderClasses()}>
        <Header headerRef={headerRef} />
      </div>

      {/* ============ DESKTOP LAYOUT ============ */}
      {!isMobile && (
        <div className="flex flex-row pt-24 h-screen">
          {/* Properties List - Left Side */}
          <div className="w-[55%] h-[calc(100vh-6rem)] overflow-y-auto px-6 py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold mb-2">{formattedRegionName}</h1>
              <p className="text-sm text-grey">{properties?.length || 0}+ places to stay</p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 rounded-2xl aspect-square mb-3"></div>
                    <div className="bg-gray-200 rounded h-4 w-3/4 mb-2"></div>
                    <div className="bg-gray-200 rounded h-4 w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-grey mb-2">Error loading properties</p>
              </div>
            ) : !properties?.length ? (
              <div className="text-center py-12">
                <p className="text-grey mb-2">No properties found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((item) => (
                  <PropertyCard
                    key={item.id}
                    item={item}
                    favListings={favListings}
                    userData={userData}
                    dispatch={dispatch}
                    onHover={setHoveredPropertyId}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Map - Right Side */}
          <div className="w-[45%] h-[calc(100vh-6rem)] sticky top-24 p-4">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-200">
              <PropertyMap
                properties={properties}
                hoveredId={hoveredPropertyId}
                onMarkerClick={handleMarkerClick}
              />
            </div>
          </div>
        </div>
      )}

      {/* ============ MOBILE LAYOUT ============ */}
      {isMobile && (
        <div className="pt-20 h-screen flex flex-col">
          {/* Map Container - Takes remaining space above sheet */}
          <div 
            className="flex-1 relative"
            style={{ marginBottom: `${sheetHeight}px` }}
          >
            <PropertyMap
              properties={properties}
              hoveredId={hoveredPropertyId}
              onMarkerClick={handleMarkerClick}
              style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            />
          </div>

          {/* Bottom Sheet */}
          <div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl flex flex-col"
            style={{
              height: `${sheetHeight}px`,
              transition: isDragging ? "none" : "height 0.3s ease-out",
              zIndex: 50,
            }}
          >
            {/* Drag Handle */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center py-3 cursor-grab active:cursor-grabbing bg-white rounded-t-3xl"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              style={{ touchAction: "none" }}
            >
              <div className="w-10 h-1.5 bg-gray-300 rounded-full mb-2" />
              <p className="text-sm font-medium text-gray-700">
                {properties?.length || 0}+ places
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="animate-pulse flex gap-4">
                      <div className="bg-gray-200 rounded-xl w-24 h-24 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="bg-gray-200 rounded h-4 w-3/4 mb-2"></div>
                        <div className="bg-gray-200 rounded h-4 w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {properties?.map((item) => (
                    <MobilePropertyCard
                      key={item.id}
                      item={item}
                      favListings={favListings}
                      userData={userData}
                      dispatch={dispatch}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer - Desktop only */}
      {!isMobile && (
        <div className="w-full border-t border-grey-dim">
          <LongFooter />
        </div>
      )}
    </div>
  );
};

// ============ MOBILE PROPERTY CARD (Compact) ============
const MobilePropertyCard = ({ item, favListings, userData, dispatch }) => {
  const navigate = useNavigate();
  const pricePerNight = Math.ceil(item.price / 83);

  return (
    <div
      onClick={() => navigate(`/property/${item.id}`)}
      className="flex gap-3 cursor-pointer active:bg-gray-50 rounded-xl p-2 -mx-2"
    >
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={item.images?.[0] || "https://via.placeholder.com/100x100"}
          alt={item["house-title"]}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 py-1">
        <h3 className="font-medium text-sm truncate mb-1">{item["house-title"]}</h3>
        <p className="text-grey text-xs mb-1 truncate">
          {item.location || "Dubai, UAE"}
        </p>
        {item.house_rating > 2 && (
          <div className="flex items-center gap-1 mb-1">
            <img src={star} className="w-3 h-3" alt="Star" />
            <span className="text-xs">{item.house_rating}</span>
          </div>
        )}
        <p className="font-semibold text-sm">
          AED {pricePerNight} <span className="font-normal text-grey">night</span>
        </p>
      </div>
    </div>
  );
};

export default RegionHomes;