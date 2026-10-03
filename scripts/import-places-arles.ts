// Script d'import des données initiales pour la zone pilote
// Arles / Saint-Rémy-de-Provence / Les Alpilles

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Données de la zone pilote
const categoriesData = [
  { slug: "restaurant", name: "Restaurants", icon: "🍽️" },
  { slug: "cafe", name: "Cafés", icon: "☕" },
  { slug: "balade", name: "Balades", icon: "🥾" },
  { slug: "plage", name: "Plages", icon: "🏖️" },
];

const hotelData = {
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
};

const placesData = [
  // RESTAURANTS - Arles
  {
    category_slug: "restaurant",
    name: "Bistrot des Toutous",
    address: "12 Place du Forum",
    city: "Arles",
    postal_code: "13200",
    latitude: 43.6767,
    longitude: 4.6278,
    phone: "+33 4 90 00 00 01",
    website: "https://example.com",
    description:
      "Restaurant dog-friendly avec terrasse et gamelle d'eau fournie",
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
    name: "Le Flamant Rose",
    address: "45 Rue de la Calade",
    city: "Arles",
    postal_code: "13200",
    latitude: 43.678,
    longitude: 4.63,
    phone: "+33 4 90 00 00 02",
    website: "https://example.com",
    description: "Cuisine provençale traditionnelle, terrasse dog-friendly",
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
  {
    category_slug: "restaurant",
    name: "La Chassagnette",
    address: "Le Sambuc",
    city: "Arles",
    postal_code: "13200",
    latitude: 43.615,
    longitude: 4.543,
    phone: "+33 4 90 00 00 03",
    website: "https://example.com",
    description:
      "Restaurant Michelin* avec jardin spacieux, bienvenue aux chiens",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: false,
    status: "approved",
    source: "manual",
  },

  // RESTAURANTS - Saint-Rémy
  {
    category_slug: "restaurant",
    name: "La Table d'Yvan - Mas des Carassins",
    address: "Quartier des Carassins",
    city: "Saint-Rémy-de-Provence",
    postal_code: "13210",
    latitude: 43.7866,
    longitude: 4.8318,
    phone: "+33 4 90 00 00 04",
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
  {
    category_slug: "restaurant",
    name: "Bistrot Canto Cigalo",
    address: "Rue de la Liberté",
    city: "Saint-Rémy-de-Provence",
    postal_code: "13210",
    latitude: 43.7885,
    longitude: 4.8356,
    phone: "+33 4 90 00 00 05",
    website: "https://example.com",
    description: "Bistrot français, chiens acceptés sur terrasse",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // CAFÉS - Arles
  {
    category_slug: "cafe",
    name: "Superfood",
    address: "15 Rue de la République",
    city: "Arles",
    postal_code: "13200",
    latitude: 43.6775,
    longitude: 4.629,
    phone: "+33 4 90 00 00 06",
    website: "https://example.com",
    description: "Café végétarien avec terrasse ombragée, gamelles d'eau",
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
    category_slug: "cafe",
    name: "Café de la Place",
    address: "Place Lamartine",
    city: "Arles",
    postal_code: "13200",
    latitude: 43.674,
    longitude: 4.628,
    phone: "+33 4 90 00 00 07",
    website: "https://example.com",
    description: "Café traditionnel avec terrasse tolérante pour les chiens",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    status: "approved",
    source: "manual",
  },

  // BALADES - Alpilles
  {
    category_slug: "balade",
    name: "Parc Naturel Régional des Alpilles",
    address: "Chemin Montagnes",
    city: "Saint-Rémy-de-Provence",
    postal_code: "13210",
    latitude: 43.7916,
    longitude: 4.8233,
    phone: "+33 4 90 00 00 08",
    website: "https://www.parc-alpilles.fr",
    description:
      "Magnifiques sentiers de randonnée avec vues sur les montagnes. Laisse obligatoire du 15 avril au 30 juin.",
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
  {
    category_slug: "balade",
    name: "Berges du Rhône",
    address: "Quai de Provence",
    city: "Arles",
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
  {
    category_slug: "balade",
    name: "Square de Verdun",
    address: "Rue Thiers",
    city: "Saint-Rémy-de-Provence",
    postal_code: "13210",
    latitude: 43.7756,
    longitude: 4.8325,
    phone: "",
    website: "https://example.com",
    description: "Petit parc agréable situé à 1.5 km du centre",
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

  // PLAGES
  {
    category_slug: "plage",
    name: "Plage de Piémanson",
    address: "Salin-de-Giraud",
    city: "Arles",
    postal_code: "13200",
    latitude: 43.4233,
    longitude: 4.7369,
    phone: "",
    website: "https://example.com",
    description:
      "Plage sauvage avec sable fin, chiens autorisés en laisse. À 30 km d'Arles.",
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
  {
    category_slug: "plage",
    name: "Plage de Beauduc",
    address: "Camargue",
    city: "Arles",
    postal_code: "13200",
    latitude: 43.3756,
    longitude: 4.6342,
    phone: "",
    website: "https://example.com",
    description: "Plage sauvage très détendue, peu fréquentée hors saison",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: true,
    parking_available: false,
    wheelchair_accessible: false,
    status: "approved",
    source: "manual",
  },
];

async function importData() {
  try {
    console.log("🚀 Début de l'import des données...\n");

    // 1. Importer les catégories
    console.log("📌 Import des catégories...");
    const { data: categories, error: categoriesError } = await supabase
      .from("place_categories")
      .insert(categoriesData);

    if (categoriesError) {
      console.error("Erreur catégories:", categoriesError);
    } else {
      console.log(`✅ ${categoriesData.length} catégories importées\n`);
    }

    // 2. Importer l'hôtel
    console.log("🏨 Import de l'hôtel...");
    const { data: hotelResult, error: hotelError } = await supabase
      .from("hotels")
      .insert([hotelData])
      .select();

    if (hotelError) {
      console.error("Erreur hôtel:", hotelError);
      return;
    }

    const hotelId = hotelResult?.[0]?.id;
    console.log(`✅ Hôtel importé: ${hotelId}\n`);

    // 3. Générer un QR code
    console.log("📱 Création du code QR...");
    const qrCode = `HOTEL_QR:${hotelId.substring(0, 8).toUpperCase()}`;
    const { data: qrResult, error: qrError } = await supabase
      .from("qr_codes")
      .insert([
        {
          hotel_id: hotelId,
          code: qrCode,
          is_active: true,
          status: "active",
        },
      ])
      .select();

    if (qrError) {
      console.error("Erreur QR code:", qrError);
    } else {
      console.log(`✅ Code QR créé: ${qrCode}\n`);
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
    console.log("📍 Import des lieux...");
    const placesToInsert = placesData.map((place) => ({
      ...place,
      category_id: categoryMap.get(place.category_slug),
    }));

    // Retirer le champ category_slug avant l'insertion
    const cleanPlaces = placesToInsert.map((place) => {
      const { category_slug, ...rest } = place as any;
      return rest;
    });

    const { data: placesResult, error: placesError } = await supabase
      .from("places")
      .insert(cleanPlaces);

    if (placesError) {
      console.error("Erreur lieux:", placesError);
    } else {
      console.log(`✅ ${cleanPlaces.length} lieux importés\n`);
    }

    console.log("🎉 Import terminé avec succès!");
    console.log("\n📊 Résumé:");
    console.log(`  - Catégories: ${categoriesData.length}`);
    console.log(`  - Hôtels: 1`);
    console.log(`  - Lieux: ${cleanPlaces.length}`);
    console.log(`  - Code QR: ${qrCode}\n`);
  } catch (error) {
    console.error("❌ Erreur générale:", error);
  }
}

// Exécuter l'import
importData();
