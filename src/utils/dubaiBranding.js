const DUBAI_LOCATIONS = [
  { label: "Skyline loft", area: "Downtown Dubai", detail: "Burj Khalifa views" },
  { label: "Palm retreat", area: "Palm Jumeirah", detail: "private beach access" },
  { label: "Marina highrise", area: "Dubai Marina", detail: "yacht club strolls" },
  { label: "Desert-chic villa", area: "Al Barari", detail: "lush botanical escapes" },
  { label: "Old town residence", area: "Al Fahidi", detail: "heritage quarter stay" },
  { label: "Creekside suite", area: "Dubai Creek Harbour", detail: "sunset dhow views" },
  { label: "Design-forward flat", area: "Business Bay", detail: "canal promenades" },
  { label: "Club Vista home", area: "Jumeirah Beach Residence", detail: "steps from The Walk" },
  { label: "Lagoon haven", area: "Tilal Al Ghaf", detail: "waterfront living" },
  { label: "Hillside manor", area: "Dubai Hills Estate", detail: "golf-view calm" },
  { label: "City Walk studio", area: "City Walk", detail: "designer boulevards" },
  { label: "Creek Harbour loft", area: "Ras Al Khor", detail: "flamingo sanctuary strolls" },
];

const getVariantIndex = (id) => {
  if (typeof id === "number" && Number.isFinite(id)) {
    return Math.abs(id);
  }

  if (typeof id === "string") {
    let hash = 0;
    for (let i = 0; i < id.length; i += 1) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  return 0;
};

export const applyDubaiBranding = (item) => {
  if (!item) return item;

  const variant =
    DUBAI_LOCATIONS[getVariantIndex(item.id) % DUBAI_LOCATIONS.length];

  if (!variant) return item;

  const dubaiTitle = `${variant.label} · ${variant.detail}`;
  
  return {
    ...item,
    city: variant.area,
    country: "United Arab Emirates",
    ["house-title"]: dubaiTitle,
    title_1: dubaiTitle,
    title_2: dubaiTitle,
    neighborhood: variant.area,
    region: "Dubai",
  };
};

