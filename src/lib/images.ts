// Central, swappable map of travel photography.
// All URLs are freely-licensed Unsplash photos. Because the site is a static
// export with `images.unoptimized`, next/image passes these through as-is.
// Swap any value here (or wire to Decap media) without touching components.

export function img(id: string, w = 1200): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

// A small set of dependable, well-known photo IDs, reused thematically.
const ID = {
  beach: "photo-1507525428034-b723cf961d3e",
  beachUmbrella: "photo-1520250497591-112f2f40a3f4",
  mountainLake: "photo-1506905925346-21bda4d32df4",
  mountains: "photo-1454496522488-7a8e488e8606",
  forest: "photo-1441974231531-c6227db76b6e",
  road: "photo-1469854523086-cc02fe5d8800",
  camp: "photo-1504280390367-361c6d9f38f4",
  city: "photo-1499856871958-5b9627545d1a",
  nyc: "photo-1496442226666-8d4d0e62e6e9",
  food: "photo-1504674900247-0877df9cc836",
  lake: "photo-1476514525535-07fb3b4ae5f1",
  kidJoy: "photo-1502086223501-7ea6ecd79368",
  planningMap: "photo-1488646953014-85cb44e25828",
  airplane: "photo-1436491865332-7a61a109cc05",
  hiking: "photo-1551632811-561732d1e306",
  castle: "photo-1597466599360-3b9775841aec",
  reef: "photo-1544551763-46a013bb70d5",
  valley: "photo-1508739773434-c26b3d09e071",
  sunsetKids: "photo-1526976668912-1a811878dd37",
} as const;

export const IMAGES = {
  // Hero
  hero: img(ID.kidJoy, 1600),
  heroSecondary: img(ID.beach, 900),

  // Vacation categories
  cat_beach: img(ID.beach, 900),
  cat_themeParks: img(ID.castle, 900),
  cat_nationalParks: img(ID.valley, 900),
  cat_city: img(ID.nyc, 900),
  cat_roadTrips: img(ID.road, 900),
  cat_cruises: img(ID.beachUmbrella, 900),
  cat_mountains: img(ID.mountainLake, 900),
  cat_weekend: img(ID.forest, 900),

  // Destinations
  dest_orlando: img(ID.castle, 1200),
  dest_hawaii: img(ID.beach, 1200),
  dest_california: img(ID.city, 1200),
  dest_newyork: img(ID.nyc, 1200),
  dest_floridakeys: img(ID.beachUmbrella, 1200),
  dest_yellowstone: img(ID.valley, 1200),
  dest_sandiego: img(ID.reef, 1200),
  dest_washingtondc: img(ID.city, 1200),

  // Activities
  act_animals: img(ID.reef, 800),
  act_water: img(ID.beachUmbrella, 800),
  act_museums: img(ID.city, 800),
  act_hiking: img(ID.hiking, 800),
  act_themeparks: img(ID.castle, 800),
  act_outdoors: img(ID.camp, 800),
  act_food: img(ID.food, 800),
  act_learning: img(ID.planningMap, 800),

  // Ambient / decorative
  planner: img(ID.planningMap, 1000),
  newsletter: img(ID.sunsetKids, 1200),
  road: img(ID.road, 1200),
  airplane: img(ID.airplane, 1200),

  // Blog fallbacks by theme
  blog_default: img(ID.airplane, 1000),
  blog_beach: img(ID.beach, 1000),
  blog_road: img(ID.road, 1000),
  blog_food: img(ID.food, 1000),
  blog_outdoors: img(ID.camp, 1000),
  blog_city: img(ID.city, 1000),
} as const;

export type ImageKey = keyof typeof IMAGES;
