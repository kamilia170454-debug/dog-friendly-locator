// Script d'import des données initiales pour toute la France
// Couverture complète : Paris, Lyon, Marseille, Nice, Bordeaux, Toulouse, Côte d'Azur, etc.

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Données des catégories
const categoriesData = [
  { slug: "restaurant", name: "Restaurants", icon: "🍽️" },
  { slug: "cafe", name: "Cafés", icon: "☕" },
  { slug: "balade", name: "Balades", icon: "🥾" },
  { slug: "plage", name: "Plages", icon: "🏖️" },
  { slug: "hotel", name: "Hôtels", icon: "🏨" },
];

// Données des hôtels par région
const hotelsData = [
  // PARIS
  {
    name: "Hôtel Dog-Friendly Paris Marais",
    address: "45 Rue de Turenne",
    city: "Paris",
    postal_code: "75003",
    country: "FR",
    latitude: 48.8615,
    longitude: 2.3659,
    radius_km: 15,
    phone: "+33 1 42 72 00 00",
    website: "https://hotel-paris-marais.fr",
    status: "active",
  },
  // LYON
  {
    name: "Hôtel Dog-Friendly Lyon Confluence",
    address: "87 Quai Saint-Antoine",
    city: "Lyon",
    postal_code: "69002",
    country: "FR",
    latitude: 45.729,
    longitude: 4.8244,
    radius_km: 12,
    phone: "+33 4 72 00 00 00",
    website: "https://hotel-lyon-confluence.fr",
    status: "active",
  },
  // MARSEILLE
  {
    name: "Hôtel Dog-Friendly Marseille Vieux Port",
    address: "15 Rue Grignan",
    city: "Marseille",
    postal_code: "13001",
    country: "FR",
    latitude: 43.2965,
    longitude: 5.3698,
    radius_km: 12,
    phone: "+33 4 91 00 00 00",
    website: "https://hotel-marseille-vieux-port.fr",
    status: "active",
  },
  // NICE
  {
    name: "Hôtel Dog-Friendly Nice Promenade",
    address: "23 Avenue de la Promenade des Anglais",
    city: "Nice",
    postal_code: "06200",
    country: "FR",
    latitude: 43.6941,
    longitude: 7.2589,
    radius_km: 10,
    phone: "+33 4 93 00 00 00",
    website: "https://hotel-nice-promenade.fr",
    status: "active",
  },
  // BORDEAUX
  {
    name: "Hôtel Dog-Friendly Bordeaux Chartrons",
    address: "12 Rue Ferrère",
    city: "Bordeaux",
    postal_code: "33000",
    country: "FR",
    latitude: 44.8378,
    longitude: -0.5744,
    radius_km: 12,
    phone: "+33 5 56 00 00 00",
    website: "https://hotel-bordeaux-chartrons.fr",
    status: "active",
  },
  // TOULOUSE
  {
    name: "Hôtel Dog-Friendly Toulouse Capitole",
    address: "8 Rue Joutx-Aigues",
    city: "Toulouse",
    postal_code: "31000",
    country: "FR",
    latitude: 43.6047,
    longitude: 1.4442,
    radius_km: 12,
    phone: "+33 5 61 00 00 00",
    website: "https://hotel-toulouse-capitole.fr",
    status: "active",
  },
  // ARLES (zone pilote)
  {
    name: "Hotel Provence Charm",
    address: "123 Rue de la République",
    city: "Arles",
    postal_code: "13200",
    country: "FR",
    latitude: 43.6767,
    longitude: 4.6278,
    radius_km: 10,
    phone: "+33 4 90 00 00 00",
    website: "https://hotel-provence.fr",
    status: "active",
  },
  // SAINT-RÉMY-DE-PROVENCE
  {
    name: "Hôtel Dog-Friendly Saint-Rémy Alpilles",
    address: "34 Boulevard Marceau",
    city: "Saint-Rémy-de-Provence",
    postal_code: "13210",
    country: "FR",
    latitude: 43.7885,
    longitude: 4.8356,
    radius_km: 10,
    phone: "+33 4 90 92 00 00",
    website: "https://hotel-saint-remy-alpilles.fr",
    status: "active",
  },
  // CANNES (Côte d'Azur)
  {
    name: "Hôtel Dog-Friendly Cannes Croisette",
    address: "42 Boulevard de la Croisette",
    city: "Cannes",
    postal_code: "06400",
    country: "FR",
    latitude: 43.5528,
    longitude: 7.0176,
    radius_km: 10,
    phone: "+33 4 93 68 00 00",
    website: "https://hotel-cannes-croisette.fr",
    status: "active",
  },
  // ANTIBES (Côte d'Azur)
  {
    name: "Hôtel Dog-Friendly Antibes Vieille Ville",
    address: "5 Rue Lacan",
    city: "Antibes",
    postal_code: "06600",
    country: "FR",
    latitude: 43.5825,
    longitude: 7.1233,
    radius_km: 10,
    phone: "+33 4 92 91 00 00",
    website: "https://hotel-antibes-vieille-ville.fr",
    status: "active",
  },
];

// Données des lieux dog-friendly par ville
const placesData = [
  // ==================== PARIS ====================
  // RESTAURANTS PARIS
  {
    category_slug: "restaurant",
    city: "Paris",
    name: "Le Jardin du Palais",
    address: "25 Rue de Turenne",
    postal_code: "75003",
    latitude: 48.8615,
    longitude: 2.3659,
    phone: "+33 1 42 72 10 10",
    website: "https://example.com",
    description: "Restaurant dog-friendly avec terrasse spacieuse en plein cœur du Marais",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },
  {
    category_slug: "restaurant",
    city: "Paris",
    name: "Bistrot Le Parisien",
    address: "12 Rue des Francs Bourgeois",
    postal_code: "75003",
    latitude: 48.863,
    longitude: 2.367,
    phone: "+33 1 42 72 20 20",
    website: "https://example.com",
    description: "Cuisine française classique, chiens acceptés sur terrasse",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: true,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: false,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },
  {
    category_slug: "restaurant",
    city: "Paris",
    name: "Café Gourmet Champs",
    address: "52 Avenue des Champs-Élysées",
    postal_code: "75008",
    latitude: 48.8698,
    longitude: 2.309,
    phone: "+33 1 42 89 30 30",
    website: "https://example.com",
    description: "Café chic avec terrasse sur les Champs-Élysées, accueil chaleureux des chiens",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // CAFÉS PARIS
  {
    category_slug: "cafe",
    city: "Paris",
    name: "Café des Artistes",
    address: "78 Rue de Rivoli",
    postal_code: "75001",
    latitude: 48.8613,
    longitude: 2.3582,
    phone: "+33 1 42 61 40 40",
    website: "https://example.com",
    description: "Café cosy avec terrasse, gamelles d'eau pour chiens",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: false,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // BALADES PARIS
  {
    category_slug: "balade",
    city: "Paris",
    name: "Parc des Buttes-aux-Cailles",
    address: "Rue Butte-aux-Cailles",
    postal_code: "75013",
    latitude: 48.8273,
    longitude: 2.3585,
    phone: "",
    website: "https://example.com",
    description: "Parc urbain agréable pour balades avec chiens en laisse",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },
  {
    category_slug: "balade",
    city: "Paris",
    name: "Bois de Vincennes",
    address: "Avenue de Paris",
    postal_code: "75012",
    latitude: 48.8387,
    longitude: 2.4288,
    phone: "",
    website: "https://example.com",
    description: "Grand parc avec nombreux sentiers, idéal pour balades longues avec chiens",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: false,
    water_bowl: false,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // ==================== LYON ====================
  // RESTAURANTS LYON
  {
    category_slug: "restaurant",
    city: "Lyon",
    name: "Bistrot des Quais",
    address: "32 Quai Saint-Antoine",
    postal_code: "69002",
    latitude: 45.729,
    longitude: 4.8244,
    phone: "+33 4 72 10 00 00",
    website: "https://example.com",
    description: "Restaurant gastronomique avec terrasse vue sur la Saône, chiens acceptés",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },
  {
    category_slug: "restaurant",
    city: "Lyon",
    name: "Le Parc Lyonnais",
    address: "15 Rue Childebert",
    postal_code: "69002",
    latitude: 45.7342,
    longitude: 4.8301,
    phone: "+33 4 72 11 11 11",
    website: "https://example.com",
    description: "Cuisine régionale, terrasse accueillante pour les chiens",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: true,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // BALADES LYON
  {
    category_slug: "balade",
    city: "Lyon",
    name: "Parc de la Tête d'Or",
    address: "Boulevard de la Corniche",
    postal_code: "69002",
    latitude: 45.7677,
    longitude: 4.838,
    phone: "",
    website: "https://example.com",
    description: "Magnifique parc urbain avec lac, espaces verts spacieux pour balades",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // ==================== MARSEILLE ====================
  // RESTAURANTS MARSEILLE
  {
    category_slug: "restaurant",
    city: "Marseille",
    name: "La Bouillabaisse du Port",
    address: "25 Quai des Belges",
    postal_code: "13001",
    latitude: 43.2965,
    longitude: 5.3698,
    phone: "+33 4 91 22 22 22",
    website: "https://example.com",
    description: "Restaurant traditionnel marseillais, terrasse vue sur le Vieux Port",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: false,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },
  {
    category_slug: "restaurant",
    city: "Marseille",
    name: "Le Méditerranée",
    address: "8 Rue de la Paix",
    postal_code: "13001",
    latitude: 43.299,
    longitude: 5.372,
    phone: "+33 4 91 33 33 33",
    website: "https://example.com",
    description: "Fruits de mer frais, chiens acceptés sur terrasse",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: true,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // PLAGES MARSEILLE
  {
    category_slug: "plage",
    city: "Marseille",
    name: "Plage des Catalans",
    address: "Boulevard des Catalans",
    postal_code: "13007",
    latitude: 43.3087,
    longitude: 5.3398,
    phone: "",
    website: "https://example.com",
    description: "Plage de sable fin, chiens autorisés en laisse (hors saison estivale)",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: true,
    parking_available: true,
    wheelchair_accessible: false,
    status: "approved",
    source: "manual",
  },

  // ==================== NICE ====================
  // RESTAURANTS NICE
  {
    category_slug: "restaurant",
    city: "Nice",
    name: "Le Niçois Gourmand",
    address: "18 Promenade des Anglais",
    postal_code: "06200",
    latitude: 43.6941,
    longitude: 7.2589,
    phone: "+33 4 93 44 44 44",
    website: "https://example.com",
    description: "Cuisine niçoise traditionnelle, terrasse vue mer",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // PLAGES NICE
  {
    category_slug: "plage",
    city: "Nice",
    name: "Plage de la Baie des Anges",
    address: "Promenade des Anglais",
    postal_code: "06200",
    latitude: 43.6941,
    longitude: 7.2589,
    phone: "",
    website: "https://example.com",
    description: "Plage célèbre avec chiens toléré en laisse en dehors de l'été",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: true,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // ==================== BORDEAUX ====================
  // RESTAURANTS BORDEAUX
  {
    category_slug: "restaurant",
    city: "Bordeaux",
    name: "La Cour des Vins",
    address: "45 Rue Ferrère",
    postal_code: "33000",
    latitude: 44.8378,
    longitude: -0.5744,
    phone: "+33 5 56 55 55 55",
    website: "https://example.com",
    description: "Gastronomie bordelaise, terrasse spacieuse dog-friendly",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: true,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // BALADES BORDEAUX
  {
    category_slug: "balade",
    city: "Bordeaux",
    name: "Parc Bordelais",
    address: "Avenue Général de Gaulle",
    postal_code: "33000",
    latitude: 44.8545,
    longitude: -0.5758,
    phone: "",
    website: "https://example.com",
    description: "Grand parc urbain avec aires de jeux pour chiens",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // ==================== TOULOUSE ====================
  // RESTAURANTS TOULOUSE
  {
    category_slug: "restaurant",
    city: "Toulouse",
    name: "Le Capitole Gourmand",
    address: "22 Place du Capitole",
    postal_code: "31000",
    latitude: 43.6047,
    longitude: 1.4442,
    phone: "+33 5 61 66 66 66",
    website: "https://example.com",
    description: "Cuisine occitane, terrasse place du Capitole",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // BALADES TOULOUSE
  {
    category_slug: "balade",
    city: "Toulouse",
    name: "Jardin Japonais du Grand Rond",
    address: "Place du Grand Rond",
    postal_code: "31000",
    latitude: 43.6009,
    longitude: 1.4518,
    phone: "",
    website: "https://example.com",
    description: "Jardin paisible avec chemins pour balades zen avec chiens",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: false,
    parking_available: false,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // ==================== CÔTE D'AZUR - CANNES ====================
  // RESTAURANTS CANNES
  {
    category_slug: "restaurant",
    city: "Cannes",
    name: "La Croisette Gourmande",
    address: "42 Boulevard de la Croisette",
    postal_code: "06400",
    latitude: 43.5528,
    longitude: 7.0176,
    phone: "+33 4 93 77 77 77",
    website: "https://example.com",
    description: "Restaurant chic vue sur la Baie de Cannes, chiens acceptés",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // PLAGES CANNES
  {
    category_slug: "plage",
    city: "Cannes",
    name: "Plage Macé",
    address: "Boulevard de la Croisette",
    postal_code: "06400",
    latitude: 43.5488,
    longitude: 7.0188,
    phone: "",
    website: "https://example.com",
    description: "Plage dog-friendly (hors saison), sable fin",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: true,
    parking_available: true,
    wheelchair_accessible: false,
    status: "approved",
    source: "manual",
  },

  // ==================== CÔTE D'AZUR - ANTIBES ====================
  // RESTAURANTS ANTIBES
  {
    category_slug: "restaurant",
    city: "Antibes",
    name: "La Table Méditerranéenne",
    address: "5 Rue Lacan",
    postal_code: "06600",
    latitude: 43.5825,
    longitude: 7.1233,
    phone: "+33 4 92 88 88 88",
    website: "https://example.com",
    description: "Cuisine méditerranéenne, terrasse vieille ville",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: true,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // BALADES ANTIBES
  {
    category_slug: "balade",
    city: "Antibes",
    name: "Sentier du Littoral d'Antibes",
    address: "Cap d'Antibes",
    postal_code: "06600",
    latitude: 43.5756,
    longitude: 7.1366,
    phone: "",
    website: "https://example.com",
    description: "Sentier côtier magnifique avec vue sur la Méditerranée",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: false,
    status: "approved",
    source: "manual",
  },

  // ==================== ARLES / ALPILLES (zone pilote) ====================
  // RESTAURANTS ARLES
  {
    category_slug: "restaurant",
    city: "Arles",
    name: "Bistrot des Toutous",
    address: "12 Place du Forum",
    postal_code: "13200",
    latitude: 43.6767,
    longitude: 4.6278,
    phone: "+33 4 90 00 00 01",
    website: "https://example.com",
    description: "Restaurant dog-friendly avec terrasse et gamelle d'eau",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: false,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },
  {
    category_slug: "restaurant",
    city: "Arles",
    name: "Le Flamant Rose",
    address: "45 Rue de la Calade",
    postal_code: "13200",
    latitude: 43.678,
    longitude: 4.63,
    phone: "+33 4 90 00 00 02",
    website: "https://example.com",
    description: "Cuisine provençale, terrasse dog-friendly",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: true,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // CAFÉS ARLES
  {
    category_slug: "cafe",
    city: "Arles",
    name: "Superfood",
    address: "15 Rue de la République",
    postal_code: "13200",
    latitude: 43.6775,
    longitude: 4.629,
    phone: "+33 4 90 00 00 06",
    website: "https://example.com",
    description: "Café végétarien avec terrasse, gamelles d'eau",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: false,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // BALADES ARLES
  {
    category_slug: "balade",
    city: "Arles",
    name: "Berges du Rhône",
    address: "Quai de Provence",
    postal_code: "13200",
    latitude: 43.665,
    longitude: 4.625,
    phone: "",
    website: "https://example.com",
    description: "Promenade urbaine agréable le long du Rhône",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // PLAGES ARLES
  {
    category_slug: "plage",
    city: "Arles",
    name: "Plage de Piémanson",
    address: "Salin-de-Giraud",
    postal_code: "13200",
    latitude: 43.4233,
    longitude: 4.7369,
    phone: "",
    website: "https://example.com",
    description: "Plage sauvage, chiens autorisés en laisse",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: true,
    parking_available: true,
    wheelchair_accessible: false,
    status: "approved",
    source: "manual",
  },

  // RESTAURANTS SAINT-RÉMY
  {
    category_slug: "restaurant",
    city: "Saint-Rémy-de-Provence",
    name: "La Table d'Yvan",
    address: "Quartier des Carassins",
    postal_code: "13210",
    latitude: 43.7866,
    longitude: 4.8318,
    phone: "+33 4 90 92 00 01",
    website: "https://example.com",
    description: "Cuisine fine française, chiens bien accueillis",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // BALADES ALPILLES
  {
    category_slug: "balade",
    city: "Saint-Rémy-de-Provence",
    name: "Parc Naturel Régional des Alpilles",
    address: "Chemin Montagnes",
    postal_code: "13210",
    latitude: 43.7916,
    longitude: 4.8233,
    phone: "+33 4 90 00 00 08",
    website: "https://www.parc-alpilles.fr",
    description: "Magnifiques sentiers de randonnée avec vues sur les montagnes",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: false,
    water_bowl: false,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: false,
    status: "approved",
    source: "manual",
  },
];

async function importData() {
  try {
    console.log("🚀 Début de l'import des données pour toute la France...\n");

    // 1. Importer les catégories
    console.log("📌 Import des catégories...");
    const { data: categories, error: categoriesError } = await supabase
      .from("place_categories")
      .insert(categoriesData)
      .select();

    if (categoriesError) {
      console.error("Erreur catégories:", categoriesError);
      return;
    }
    console.log(`✅ ${categoriesData.length} catégories importées\n`);

    // 2. Importer les hôtels
    console.log("🏨 Import des hôtels...");
    const { data: hotelsResult, error: hotelError } = await supabase
      .from("hotels")
      .insert(hotelsData)
      .select();

    if (hotelError) {
      console.error("Erreur hôtels:", hotelError);
      return;
    }
    console.log(`✅ ${hotelsData.length} hôtels importés\n`);

    // 3. Générer des codes QR pour chaque hôtel
    console.log("📱 Création des codes QR...");
    const qrCodes = hotelsResult.map((hotel) => ({
      hotel_id: hotel.id,
      code: `HOTEL_QR:${hotel.id.substring(0, 8).toUpperCase()}`,
      is_active: true,
      status: "active",
    }));

    const { data: qrResult, error: qrError } = await supabase
      .from("qr_codes")
      .insert(qrCodes)
      .select();

    if (qrError) {
      console.error("Erreur QR codes:", qrError);
    } else {
      console.log(`✅ ${qrCodes.length} codes QR créés\n`);

      // Afficher les codes QR
      console.log("📱 Codes QR générés :");
      hotelsResult.forEach((hotel, index) => {
        console.log(`  - ${hotel.name}: ${qrCodes[index].code}`);
      });
      console.log("");
    }

    // 4. Récupérer les IDs des catégories
    console.log("🔍 Récupération des IDs catégories...");
    const { data: allCategories, error: fetchCategoriesError } = await supabase
      .from("place_categories")
      .select("id, slug");

    if (fetchCategoriesError) {
      console.error("Erreur récupération catégories:", fetchCategoriesError);
      return;
    }

    const categoryMap = new Map(
      allCategories.map((cat: any) => [cat.slug, cat.id])
    );

    // 5. Importer les lieux
    console.log("📍 Import des lieux dog-friendly...");
    const placesToInsert = placesData.map((place) => ({
      ...place,
      category_id: categoryMap.get(place.category_slug),
    }));

    // Retirer le champ category_slug
    const cleanPlaces = placesToInsert.map((place) => {
      const { category_slug, ...rest } = place as any;
      return rest;
    });

    const { data: placesResult, error: placesError } = await supabase
      .from("places")
      .insert(cleanPlaces)
      .select();

    if (placesError) {
      console.error("Erreur lieux:", placesError);
    } else {
      console.log(`✅ ${cleanPlaces.length} lieux importés\n`);
    }

    // Résumé par ville
    console.log("🎉 Import terminé avec succès!\n");
    console.log("📊 Résumé complet :");
    console.log(`  - Catégories: ${categoriesData.length}`);
    console.log(`  - Hôtels: ${hotelsData.length}`);
    console.log(`  - Lieux dog-friendly: ${cleanPlaces.length}`);
    console.log(`  - Codes QR générés: ${qrCodes.length}\n`);

    // Statistiques par ville
    const placesByCity: Record<string, number> = {};
    cleanPlaces.forEach((place: any) => {
      placesByCity[place.city] = (placesByCity[place.city] || 0) + 1;
    });

    console.log("📍 Répartition par ville :");
    Object.entries(placesByCity)
      .sort((a, b) => b[1] - a[1])
      .forEach(([city, count]) => {
        console.log(`  - ${city}: ${count} lieux`);
      });

    console.log("\n✅ Import complet pour toute la France effectué !");
  } catch (error) {
    console.error("❌ Erreur générale:", error);
  }
}

// Exécuter l'import
importData();
