// Static, typed mock content for the vacation-planning UI.
// Blog content stays fully Decap/CMS-driven (see lib/posts.ts). This module only
// backs the new marketing/discovery surfaces and can later be wired to Decap.

import { IMAGES } from "./images";

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
  tint: string; // css color used for the badge / accents
};

export type Destination = {
  slug: string;
  name: string;
  region: string;
  image: string;
  blurb: string;
  bestFor: string;
  ageRange: string;
  duration: string;
  season: string;
  featured?: boolean;
  whyLove: string[];
  bestTime: string;
  stay: { name: string; note: string }[];
  thingsToDo: string[];
  restaurants: { name: string; note: string }[];
  itinerary: { day: number; title: string; detail: string }[];
  budget: string;
  tips: string[];
};

export type Activity = {
  slug: string;
  name: string;
  badge: string;
  image: string;
};

export type AgeGroup = {
  id: string;
  label: string;
  headline: string;
  destinations: string[];
  activities: string[];
  tip: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  avatar: string;
};

export const categories: Category[] = [
  {
    slug: "beach",
    name: "Beach Vacations",
    description: "Sandcastles, gentle waves and lazy sunny afternoons.",
    image: IMAGES.cat_beach,
    tint: "var(--color-sky)",
  },
  {
    slug: "theme-parks",
    name: "Theme Parks",
    description: "Big rides, bigger smiles and storybook characters.",
    image: IMAGES.cat_themeParks,
    tint: "var(--color-coral)",
  },
  {
    slug: "national-parks",
    name: "National Parks",
    description: "Wild landscapes and junior-ranger adventures.",
    image: IMAGES.cat_nationalParks,
    tint: "var(--color-green)",
  },
  {
    slug: "city-adventures",
    name: "City Adventures",
    description: "Museums, food and skyline-sized memories.",
    image: IMAGES.cat_city,
    tint: "var(--color-ocean)",
  },
  {
    slug: "road-trips",
    name: "Road Trips",
    description: "Playlists, pit-stops and the open road.",
    image: IMAGES.cat_roadTrips,
    tint: "var(--color-sun)",
  },
  {
    slug: "cruises",
    name: "Cruises",
    description: "One hotel, many destinations, zero packing stress.",
    image: IMAGES.cat_cruises,
    tint: "var(--color-sky)",
  },
  {
    slug: "mountain-getaways",
    name: "Mountain Getaways",
    description: "Fresh air, cabins and cocoa by the fire.",
    image: IMAGES.cat_mountains,
    tint: "var(--color-ocean)",
  },
  {
    slug: "weekend-escapes",
    name: "Weekend Escapes",
    description: "Two days, close to home, big on fun.",
    image: IMAGES.cat_weekend,
    tint: "var(--color-green)",
  },
];

export const destinations: Destination[] = [
  {
    slug: "orlando",
    name: "Orlando",
    region: "Florida, USA",
    image: IMAGES.dest_orlando,
    blurb:
      "The theme-park capital of the world, purpose-built for families of every age.",
    bestFor: "Theme Parks",
    ageRange: "3–14",
    duration: "5–7 Days",
    season: "Winter / Spring",
    featured: true,
    whyLove: [
      "Every major theme park in one compact, stroller-friendly city.",
      "Hotels and restaurants designed from the ground up around kids.",
      "Rain-or-shine indoor options when the Florida weather turns.",
    ],
    bestTime:
      "Late winter and early spring bring mild temperatures and shorter ride lines before the summer crowds.",
    stay: [
      { name: "On-site resort hotel", note: "Early park entry and easy midday naps." },
      { name: "Suite-style rental", note: "Kitchen + laundry for longer stays." },
    ],
    thingsToDo: [
      "Meet storybook characters at the theme parks",
      "Cool off at a water park",
      "Hands-on science at the discovery museum",
      "Airboat safari to spot real alligators",
    ],
    restaurants: [
      { name: "Character breakfast", note: "Pancakes with the whole cast." },
      { name: "Family food hall", note: "Something for every picky eater." },
    ],
    itinerary: [
      { day: 1, title: "Arrival + Pool Day", detail: "Settle in, splash, early night." },
      { day: 2, title: "Theme Park Adventure", detail: "Headliner rides before lunch." },
      { day: 3, title: "Animal Kingdom", detail: "Safari, shows and shade." },
      { day: 4, title: "Water Park + Downtown", detail: "Slides then a relaxed dinner." },
      { day: 5, title: "Relax + Departure", detail: "Souvenirs and a slow morning." },
    ],
    budget:
      "Mid-range families spend roughly $250–$400 per day including park tickets, food and a family room.",
    tips: [
      "Book park reservations well in advance.",
      "Pack ponchos — afternoon showers are brief but reliable.",
      "Schedule a midday break back at the hotel with young kids.",
    ],
  },
  {
    slug: "hawaii",
    name: "Hawaii",
    region: "Hawaii, USA",
    image: IMAGES.dest_hawaii,
    blurb:
      "Gentle beaches, green valleys and warm water that toddlers and teens both love.",
    bestFor: "Beach + Nature",
    ageRange: "0–17",
    duration: "7–10 Days",
    season: "Spring / Fall",
    featured: true,
    whyLove: [
      "Calm, protected bays that are ideal for first-time swimmers.",
      "Easy wildlife encounters — sea turtles, tropical fish and whales.",
      "A slow island pace that suits nap schedules.",
    ],
    bestTime:
      "Spring and fall offer warm water, smaller crowds and the best value on flights and hotels.",
    stay: [
      { name: "Beachfront resort", note: "Kids' club and shallow pools." },
      { name: "Condo near a calm bay", note: "Space to spread out and cook." },
    ],
    thingsToDo: [
      "Snorkel a calm reef",
      "Watch sea turtles at sunset",
      "Easy rainforest waterfall hike",
      "Learn to boogie board",
    ],
    restaurants: [
      { name: "Beachside plate lunch", note: "Casual, quick and kid-approved." },
      { name: "Shave-ice stand", note: "The essential afternoon treat." },
    ],
    itinerary: [
      { day: 1, title: "Arrival + Beach", detail: "Toes in the sand by afternoon." },
      { day: 2, title: "Snorkel Bay", detail: "Fish, turtles and shade breaks." },
      { day: 3, title: "Rainforest Day", detail: "Waterfall hike and fruit stand." },
      { day: 4, title: "Beach + Luau", detail: "Sandcastles then an evening show." },
      { day: 5, title: "Slow Departure", detail: "One last swim before the airport." },
    ],
    budget:
      "Plan for $300–$500 per day; condos with kitchens keep food costs down considerably.",
    tips: [
      "Reef-safe sunscreen is required by law — pack plenty.",
      "Mornings are calmest for swimming and snorkeling.",
      "Build in downtime; island time is part of the magic.",
    ],
  },
  {
    slug: "california",
    name: "California",
    region: "California, USA",
    image: IMAGES.dest_california,
    blurb:
      "Beaches, big cities and towering redwoods — a whole vacation in one state.",
    bestFor: "Variety",
    ageRange: "4–17",
    duration: "7–10 Days",
    season: "Summer / Fall",
    whyLove: [
      "Coast, city and forest are all within an easy drive.",
      "World-class theme parks and science museums.",
      "Mild weather almost year-round.",
    ],
    bestTime: "Late spring through early fall brings warm, dry, beach-friendly days.",
    stay: [
      { name: "Coastal town inn", note: "Walk to the beach and ice cream." },
      { name: "City apartment", note: "Central base for museums and parks." },
    ],
    thingsToDo: [
      "Ride the coaster on the boardwalk",
      "Walk among giant redwoods",
      "Tide-pooling at low tide",
      "Hands-on exploratorium",
    ],
    restaurants: [
      { name: "Taco shack", note: "Fast, fresh and forgiving of picky eaters." },
      { name: "Farmers-market lunch", note: "Grab-and-go picnic fuel." },
    ],
    itinerary: [
      { day: 1, title: "Coast Arrival", detail: "Boardwalk and beach games." },
      { day: 2, title: "Redwoods", detail: "Short loop trails and a picnic." },
      { day: 3, title: "City Museums", detail: "Science center and skyline views." },
      { day: 4, title: "Theme Park", detail: "One big day of rides." },
      { day: 5, title: "Departure", detail: "Beach walk before flying home." },
    ],
    budget: "Budget around $280–$450 per day depending on city vs. coast.",
    tips: [
      "Pack layers — coastal evenings get chilly.",
      "Book popular attractions online to skip lines.",
      "Distances are long; plan realistic drive times.",
    ],
  },
  {
    slug: "new-york",
    name: "New York",
    region: "New York, USA",
    image: IMAGES.dest_newyork,
    blurb:
      "A big, buzzing city with surprisingly kid-friendly parks, shows and museums.",
    bestFor: "City Adventure",
    ageRange: "6–17",
    duration: "3–5 Days",
    season: "Spring / Fall",
    whyLove: [
      "Enormous playgrounds and open space in the central park.",
      "Family musicals and hands-on museums.",
      "Easy subway hops between neighborhoods.",
    ],
    bestTime: "Spring and fall bring comfortable walking weather and fewer crowds.",
    stay: [
      { name: "Midtown family suite", note: "Close to shows and transit." },
      { name: "Riverside hotel", note: "Quieter nights near the park." },
    ],
    thingsToDo: [
      "Row boats in the park",
      "Natural history museum",
      "Ferry past the harbor landmarks",
      "A family-friendly Broadway show",
    ],
    restaurants: [
      { name: "Classic pizza slice", note: "The city's great equalizer." },
      { name: "Deli brunch", note: "Bagels for the whole crew." },
    ],
    itinerary: [
      { day: 1, title: "Park + Playgrounds", detail: "Boats, carousel and green space." },
      { day: 2, title: "Museums", detail: "Dinosaurs then a planetarium show." },
      { day: 3, title: "Harbor + Show", detail: "Ferry by day, musical by night." },
    ],
    budget: "City stays run higher — roughly $350–$550 per day for a family of four.",
    tips: [
      "A stroller doubles as a nap zone between stops.",
      "Buy show tickets ahead for the best family seats.",
      "Pick two neighborhoods a day to avoid overpacking.",
    ],
  },
  {
    slug: "florida-keys",
    name: "Florida Keys",
    region: "Florida, USA",
    image: IMAGES.dest_floridakeys,
    blurb:
      "Laid-back island-hopping with warm shallow water and easy sea-life encounters.",
    bestFor: "Relaxing Beach",
    ageRange: "3–15",
    duration: "4–6 Days",
    season: "Winter / Spring",
    whyLove: [
      "Calm, warm water perfect for little swimmers.",
      "Up-close (and gentle) marine-life experiences.",
      "A slow, unhurried island rhythm.",
    ],
    bestTime: "Winter and early spring are dry, sunny and pleasantly warm.",
    stay: [
      { name: "Bayside cottage", note: "Sunset views and a small beach." },
      { name: "Resort with lagoon", note: "Protected swimming for toddlers." },
    ],
    thingsToDo: [
      "Meet dolphins at a marine center",
      "Glass-bottom boat over the reef",
      "Kayak the calm mangroves",
      "Sunset ice cream on the pier",
    ],
    restaurants: [
      { name: "Seafood shack", note: "Fish tacos and a sandy floor." },
      { name: "Key-lime pie stop", note: "The one dessert you can't skip." },
    ],
    itinerary: [
      { day: 1, title: "Island Arrival", detail: "Settle in and swim." },
      { day: 2, title: "Reef Day", detail: "Glass-bottom boat and snorkeling." },
      { day: 3, title: "Marine Center", detail: "Dolphins and touch tanks." },
      { day: 4, title: "Departure", detail: "Kayak then hit the road." },
    ],
    budget: "Expect $260–$420 per day; cottages with kitchens trim the food bill.",
    tips: [
      "Book marine experiences in advance — they sell out.",
      "Shade and hats are essential on the water.",
      "The drive down is scenic; plan photo pit-stops.",
    ],
  },
  {
    slug: "yellowstone",
    name: "Yellowstone",
    region: "Wyoming, USA",
    image: IMAGES.dest_yellowstone,
    blurb:
      "Geysers, bison and junior-ranger badges in America's first national park.",
    bestFor: "Nature + Wildlife",
    ageRange: "5–17",
    duration: "5–7 Days",
    season: "Summer",
    whyLove: [
      "Real wildlife around nearly every bend.",
      "Short boardwalk trails that little legs can manage.",
      "A junior-ranger program that turns kids into naturalists.",
    ],
    bestTime: "Summer brings open roads, full facilities and long daylight hours.",
    stay: [
      { name: "In-park lodge", note: "Wake up steps from the geysers." },
      { name: "Gateway-town cabin", note: "More amenities, easy park access." },
    ],
    thingsToDo: [
      "Watch a geyser erupt",
      "Spot bison and elk on a wildlife drive",
      "Earn a junior-ranger badge",
      "Easy lakeshore walk",
    ],
    restaurants: [
      { name: "Lodge dining room", note: "Hearty meals with a view." },
      { name: "Picnic by the lake", note: "Pack lunch between sights." },
    ],
    itinerary: [
      { day: 1, title: "Arrival + Geyser Basin", detail: "Boardwalks and steam." },
      { day: 2, title: "Wildlife Valley", detail: "Dawn drive to spot animals." },
      { day: 3, title: "Canyon + Falls", detail: "Overlooks and a short hike." },
      { day: 4, title: "Lake Day", detail: "Ranger program and shoreline." },
      { day: 5, title: "Departure", detail: "One last wildlife loop." },
    ],
    budget: "Around $220–$380 per day; in-park lodging books up a year ahead.",
    tips: [
      "Reserve lodging extremely early.",
      "Keep a safe distance from all wildlife.",
      "Carry layers — mountain weather shifts fast.",
    ],
  },
  {
    slug: "san-diego",
    name: "San Diego",
    region: "California, USA",
    image: IMAGES.dest_sandiego,
    blurb:
      "Perfect weather, gentle beaches and one of the best zoos on the planet.",
    bestFor: "Animals + Beach",
    ageRange: "0–14",
    duration: "4–6 Days",
    season: "Year-round",
    whyLove: [
      "Famously mild weather in every season.",
      "A world-class zoo and safari park.",
      "Calm, family-friendly beaches with tide pools.",
    ],
    bestTime: "Any time — the coast stays comfortable all year.",
    stay: [
      { name: "Bay-side resort", note: "Calm water and a sandy shore." },
      { name: "Beach town rental", note: "Walk to the pier and shops." },
    ],
    thingsToDo: [
      "Explore the world-famous zoo",
      "Tide-pooling at the cove",
      "Ride the bay-side carousel",
      "Sunset walk on the pier",
    ],
    restaurants: [
      { name: "Fish taco stand", note: "A local rite of passage." },
      { name: "Waterfront brunch", note: "Views the whole family will love." },
    ],
    itinerary: [
      { day: 1, title: "Beach Arrival", detail: "Sand, waves and easy dinner." },
      { day: 2, title: "Zoo Day", detail: "Animals from open to close." },
      { day: 3, title: "Bay + Tide Pools", detail: "Carousel and sea creatures." },
      { day: 4, title: "Departure", detail: "Pier stroll before flying home." },
    ],
    budget: "Plan for $250–$420 per day; beach rentals offer good value.",
    tips: [
      "Mornings are best for the zoo before it warms up.",
      "Check tide charts for the best tide-pooling.",
      "Bring a light jacket for coastal evenings.",
    ],
  },
  {
    slug: "washington-dc",
    name: "Washington DC",
    region: "District of Columbia, USA",
    image: IMAGES.dest_washingtondc,
    blurb:
      "A capital full of free, hands-on museums that make learning feel like play.",
    bestFor: "Educational",
    ageRange: "6–17",
    duration: "3–5 Days",
    season: "Spring / Fall",
    whyLove: [
      "Dozens of world-class museums — most of them free.",
      "Wide-open monuments and green space to roam.",
      "Easy, walkable clusters of things to see.",
    ],
    bestTime: "Spring blossoms and crisp autumn days are ideal for walking.",
    stay: [
      { name: "Hotel near the mall", note: "Walk to museums and monuments." },
      { name: "Metro-close suite", note: "More room, quick city access." },
    ],
    thingsToDo: [
      "Touch a moon rock at the air & space museum",
      "See dinosaurs at the natural history museum",
      "Bike the monument loop",
      "Spot pandas at the zoo",
    ],
    restaurants: [
      { name: "Food-hall lunch", note: "Global flavors, quick service." },
      { name: "Museum café", note: "Refuel without leaving the fun." },
    ],
    itinerary: [
      { day: 1, title: "Museums", detail: "Air & space, then dinosaurs." },
      { day: 2, title: "Monuments", detail: "Bike or walk the green loop." },
      { day: 3, title: "Zoo + Departure", detail: "Pandas then the airport." },
    ],
    budget: "Free museums keep costs low — roughly $220–$360 per day.",
    tips: [
      "Wear comfortable shoes; the mall is bigger than it looks.",
      "Museums open early — beat the school groups.",
      "Refill water bottles; summers are humid.",
    ],
  },
];

export const activities: Activity[] = [
  { slug: "animal-encounters", name: "Animal Encounters", badge: "Wildlife", image: IMAGES.act_animals },
  { slug: "water-activities", name: "Water Activities", badge: "Splash", image: IMAGES.act_water },
  { slug: "museums", name: "Museums", badge: "Learn", image: IMAGES.act_museums },
  { slug: "hiking", name: "Hiking", badge: "Outdoors", image: IMAGES.act_hiking },
  { slug: "theme-parks", name: "Theme Parks", badge: "Thrills", image: IMAGES.act_themeparks },
  { slug: "outdoor-adventures", name: "Outdoor Adventures", badge: "Explore", image: IMAGES.act_outdoors },
  { slug: "kid-friendly-restaurants", name: "Kid-Friendly Dining", badge: "Tasty", image: IMAGES.act_food },
  { slug: "educational-experiences", name: "Educational Experiences", badge: "Discover", image: IMAGES.act_learning },
];

export const ageGroups: AgeGroup[] = [
  {
    id: "0-2",
    label: "0–2 Years",
    headline: "Easy, gentle and nap-friendly",
    destinations: ["Hawaii", "San Diego", "Florida Keys"],
    activities: ["Calm beaches", "Stroller-friendly zoos", "Shaded pools"],
    tip: "Pick one home base and keep travel days short.",
  },
  {
    id: "3-5",
    label: "3–5 Years",
    headline: "Wonder, characters and first splashes",
    destinations: ["Orlando", "San Diego", "Florida Keys"],
    activities: ["Character meets", "Petting zoos", "Splash pads"],
    tip: "Plan a midday break so excitement doesn't tip into meltdown.",
  },
  {
    id: "6-9",
    label: "6–9 Years",
    headline: "Curious explorers ready for more",
    destinations: ["California", "Yellowstone", "Washington DC"],
    activities: ["Junior ranger", "Hands-on museums", "Easy hikes"],
    tip: "Give them a disposable camera or journal to lead the day.",
  },
  {
    id: "10-12",
    label: "10–12 Years",
    headline: "Bigger adventures and real thrills",
    destinations: ["Orlando", "California", "New York"],
    activities: ["Roller coasters", "Snorkeling", "City exploring"],
    tip: "Let them help build the itinerary — buy-in beats boredom.",
  },
  {
    id: "13-17",
    label: "13–17 Years",
    headline: "Independence, culture and adrenaline",
    destinations: ["New York", "California", "Yellowstone"],
    activities: ["Concerts & shows", "Surf lessons", "Backcountry hikes"],
    tip: "Build in free time and let teens choose one activity each.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "We planned our first big trip with two toddlers in an afternoon. The age-based ideas were spot on — everything just worked.",
    name: "Priya & Sam",
    location: "Austin, TX",
    avatar: "PS",
  },
  {
    quote:
      "The itineraries saved our sanity. We knew exactly what to do each day and still had time to relax by the pool.",
    name: "The Morales Family",
    location: "Denver, CO",
    avatar: "M",
  },
  {
    quote:
      "Finally a travel site that gets parents. Real tips, honest budgets and destinations our kids actually loved.",
    name: "Jenna R.",
    location: "Portland, OR",
    avatar: "JR",
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
