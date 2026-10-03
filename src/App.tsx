import React, { useEffect, useState } from "react";
import {
  Alert,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";

type Category = "restaurant" | "cafe" | "balade" | "plage" | "hotel";

type Place = {
  id: string;
  name: string;
  category: Category;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
  description?: string;
  dog_friendly: boolean;
  terrace_allowed: boolean;
  inside_allowed: boolean;
  leash_required: boolean;
  water_bowl: boolean;
  beach_access: boolean;
  parking_available?: boolean;
  wheelchair_accessible?: boolean;
  rating_avg: number;
  review_count: number;
  distance_km?: number;
};

type Hotel = {
  id: string;
  name: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  radius_km: number;
};

const categories = [
  { id: "restaurant", label: "Restaurants", icon: "🍽️" },
  { id: "cafe", label: "Cafés", icon: "☕" },
  { id: "balade", label: "Balades", icon: "🥾" },
  { id: "plage", label: "Plages", icon: "🏖️" },
  { id: "hotel", label: "Hôtels", icon: "🏨" },
];

const distanceOptions = [5, 10, 20, 50, 100, 200];

const getDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const parseQrCode = (raw: string) => {
  if (!raw) return null;
  if (raw.startsWith("HOTEL_QR:")) return raw.replace("HOTEL_QR:", "");
  return raw;
};

const mockHotels: Hotel[] = [
  {
    id: "hotel-paris",
    name: "Hôtel Paris Marais",
    city: "Paris",
    address: "45 Rue de Turenne",
    latitude: 48.8615,
    longitude: 2.3659,
    radius_km: 20,
  },
  {
    id: "hotel-lyon",
    name: "Hôtel Lyon Confluence",
    city: "Lyon",
    address: "87 Quai Saint-Antoine",
    latitude: 45.729,
    longitude: 4.8244,
    radius_km: 20,
  },
  {
    id: "hotel-marseille",
    name: "Hôtel Marseille Vieux Port",
    city: "Marseille",
    address: "15 Rue Grignan",
    latitude: 43.2965,
    longitude: 5.3698,
    radius_km: 20,
  },
  {
    id: "hotel-nice",
    name: "Hôtel Nice Promenade",
    city: "Nice",
    address: "23 Avenue de la Promenade",
    latitude: 43.6941,
    longitude: 7.2589,
    radius_km: 20,
  },
  {
    id: "hotel-bordeaux",
    name: "Hôtel Bordeaux Chartrons",
    city: "Bordeaux",
    address: "12 Rue Ferrère",
    latitude: 44.8378,
    longitude: -0.5744,
    radius_km: 20,
  },
];

const qrHotelMap: Record<string, Hotel> = {
  PARIS1: mockHotels[0],
  LYON1: mockHotels[1],
  MARSEILLE1: mockHotels[2],
  NICE1: mockHotels[3],
  BORDEAUX1: mockHotels[4],
};

const mockPlaces: Place[] = [
  {
    id: "place-1",
    name: "Le Jardin du Palais",
    category: "restaurant",
    city: "Paris",
    address: "25 Rue de Turenne",
    latitude: 48.8615,
    longitude: 2.3659,
    phone: "+33 1 42 72 10 10",
    description: "Restaurant dog-friendly avec terrasse spacieuse.",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    rating_avg: 4.6,
    review_count: 92,
  },
  {
    id: "place-2",
    name: "Bistrot des Quais",
    category: "restaurant",
    city: "Lyon",
    address: "32 Quai Saint-Antoine",
    latitude: 45.729,
    longitude: 4.8244,
    phone: "+33 4 72 10 00 00",
    description: "Terrasse vue sur la Saône, très accueillant pour les chiens.",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    rating_avg: 4.7,
    review_count: 140,
  },
  {
    id: "place-3",
    name: "Café des Artistes",
    category: "cafe",
    city: "Paris",
    address: "78 Rue de Rivoli",
    latitude: 48.8613,
    longitude: 2.3582,
    phone: "+33 1 42 61 40 40",
    description: "Café cosy avec terrasse et gamelles d'eau pour chiens.",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: false,
    wheelchair_accessible: true,
    rating_avg: 4.4,
    review_count: 64,
  },
  {
    id: "place-4",
    name: "Parc des Buttes-aux-Cailles",
    category: "balade",
    city: "Paris",
    address: "Rue Butte-aux-Cailles",
    latitude: 48.8273,
    longitude: 2.3585,
    description: "Parc urbain sympathique pour balade avec chien en laisse.",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    rating_avg: 4.7,
    review_count: 88,
  },
  {
    id: "place-5",
    name: "Parc de la Tête d'Or",
    category: "balade",
    city: "Lyon",
    address: "Boulevard de la Corniche",
    latitude: 45.7677,
    longitude: 4.838,
    description: "Grand parc avec sentiers, eau et belle promenade.",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    rating_avg: 4.8,
    review_count: 120,
  },
  {
    id: "place-6",
    name: "Plage des Catalans",
    category: "plage",
    city: "Marseille",
    address: "Boulevard des Catalans",
    latitude: 43.3087,
    longitude: 5.3398,
    description: "Plage animée, accueil des chiens en laisse hors saison.",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: true,
    parking_available: true,
    wheelchair_accessible: false,
    rating_avg: 4.5,
    review_count: 83,
  },
  {
    id: "place-7",
    name: "La Bouillabaisse du Port",
    category: "restaurant",
    city: "Marseille",
    address: "25 Quai des Belges",
    latitude: 43.2965,
    longitude: 5.3698,
    phone: "+33 4 91 22 22 22",
    description: "Restaurant traditionnel avec terrasse face au port.",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: false,
    wheelchair_accessible: true,
    rating_avg: 4.7,
    review_count: 96,
  },
  {
    id: "place-8",
    name: "Plage de la Baie des Anges",
    category: "plage",
    city: "Nice",
    address: "Promenade des Anglais",
    latitude: 43.6941,
    longitude: 7.2589,
    description: "Plage très connue, chien toléré en laisse hors saison.",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: true,
    parking_available: true,
    wheelchair_accessible: false,
    rating_avg: 4.4,
    review_count: 76,
  },
  {
    id: "place-9",
    name: "Le Niçois Gourmand",
    category: "restaurant",
    city: "Nice",
    address: "18 Promenade des Anglais",
    latitude: 43.6941,
    longitude: 7.2589,
    phone: "+33 4 93 44 44 44",
    description: "Cuisine niçoise traditionnelle avec vue mer.",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: false,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    rating_avg: 4.6,
    review_count: 88,
  },
  {
    id: "place-10",
    name: "La Cour des Vins",
    category: "restaurant",
    city: "Bordeaux",
    address: "45 Rue Ferrère",
    latitude: 44.8378,
    longitude: -0.5744,
    phone: "+33 5 56 55 55 55",
    description: "Cuisine bordelaise, terrasse très accueillante.",
    dog_friendly: true,
    terrace_allowed: true,
    inside_allowed: true,
    leash_required: true,
    water_bowl: true,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    rating_avg: 4.7,
    review_count: 115,
  },
  {
    id: "place-11",
    name: "Parc Bordelais",
    category: "balade",
    city: "Bordeaux",
    address: "Avenue Général de Gaulle",
    latitude: 44.8545,
    longitude: -0.5758,
    description: "Parc urbain idéal pour les promenades avec chien.",
    dog_friendly: true,
    terrace_allowed: false,
    inside_allowed: false,
    leash_required: true,
    water_bowl: false,
    beach_access: false,
    parking_available: true,
    wheelchair_accessible: true,
    rating_avg: 4.8,
    review_count: 104,
  },
];

const fetchHotelFromQr = async (qrCode: string): Promise<Hotel | null> => {
  const code = parseQrCode(qrCode);
  if (!code) return null;

  const normalized = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return qrHotelMap[normalized] || null;
};

const fetchPlaces = async (
  baseLatitude: number,
  baseLongitude: number,
  categoryFilter?: string | null,
  maxDistance = 20
): Promise<Place[]> => {
  const filtered = mockPlaces
    .filter((place) => {
      if (!place.dog_friendly) return false;
      if (categoryFilter && place.category !== categoryFilter) return false;
      return true;
    })
    .map((place) => {
      const distance = getDistanceKm(
        baseLatitude,
        baseLongitude,
        place.latitude,
        place.longitude
      );
      return {
        ...place,
        distance_km: distance,
      };
    })
    .filter((place) => (place.distance_km ?? 0) <= maxDistance)
    .sort((a, b) => (a.distance_km ?? 0) - (b.distance_km ?? 0));

  return filtered;
};

const App = () => {
  const [screen, setScreen] = useState<"scanner" | "list" | "detail">("scanner");
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [distanceKm, setDistanceKm] = useState(20);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [scanned, setScanned] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  const useMyGps = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission GPS refusée",
          "Activez la localisation pour utiliser ma position."
        );
        return;
      }

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const location = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };

      setUserLocation(location);
      setGpsEnabled(true);

      const result = await fetchPlaces(
        location.latitude,
        location.longitude,
        selectedCategory,
        distanceKm
      );
      setPlaces(result);
    } catch (error) {
      console.error("GPS error:", error);
      Alert.alert("Erreur GPS", "Impossible de récupérer votre position.");
    }
  };

  const handleScan = async (result: any) => {
    if (scanned) return;
    setScanned(true);

    const qrCode = parseQrCode(result.data);
    if (!qrCode) {
      Alert.alert("Erreur", "QR code invalide.");
      setScanned(false);
      return;
    }

    const hotelData = await fetchHotelFromQr(qrCode);
    if (!hotelData) {
      Alert.alert("Erreur", "Hôtel introuvable.");
      setScanned(false);
      return;
    }

    setHotel(hotelData);
    setScreen("list");
    setUserLocation(null);
    setGpsEnabled(false);
    setSelectedCategory(null);
    setDistanceKm(20);

    setLoading(true);
    const resultPlaces = await fetchPlaces(
      hotelData.latitude,
      hotelData.longitude,
      null,
      20
    );
    setPlaces(resultPlaces);
    setLoading(false);
  };

  useEffect(() => {
    if (!hotel) return;

    const fetchFromCurrentBase = async () => {
      setLoading(true);
      const base = userLocation
        ? userLocation
        : { latitude: hotel.latitude, longitude: hotel.longitude };

      const result = await fetchPlaces(
        base.latitude,
        base.longitude,
        selectedCategory,
        distanceKm
      );
      setPlaces(result);
      setLoading(false);
    };

    fetchFromCurrentBase();
  }, [selectedCategory, distanceKm, userLocation, hotel]);

  const renderPlaceItem = ({ item }: { item: Place }) => (
    <TouchableOpacity
      style={styles.placeCard}
      onPress={() => {
        setSelectedPlace(item);
        setScreen("detail");
      }}
      activeOpacity={0.7}
    >
      <View style={styles.placeIconWrap}>
        <Text style={styles.placeIcon}>
          {item.category === "restaurant"
            ? "🍽️"
            : item.category === "cafe"
            ? "☕"
            : item.category === "balade"
            ? "🥾"
            : item.category === "plage"
            ? "🏖️"
            : "🏨"}
        </Text>
      </View>

      <View style={styles.placeContent}>
        <View style={styles.placeHeader}>
          <Text style={styles.placeName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.placeDistance}>
            {item.distance_km ? `${item.distance_km.toFixed(1)} km` : ""}
          </Text>
        </View>

        <Text style={styles.placeCity}>{item.city}</Text>

        <View style={styles.tagRow}>
          {item.dog_friendly && <Text style={styles.tag}>🐕 OK</Text>}
          {item.terrace_allowed && <Text style={styles.tag}>☀️ Terrasse</Text>}
          {item.water_bowl && <Text style={styles.tag}>💧 Eau</Text>}
          {item.beach_access && <Text style={styles.tag}>🏖️ Baignade</Text>}
        </View>

        {item.rating_avg > 0 && (
          <Text style={styles.rating}>
            ⭐ {item.rating_avg.toFixed(1)} ({item.review_count})
          </Text>
        )}
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  const renderDetail = () => {
    if (!selectedPlace) return null;

    return (
      <ScrollView
        style={styles.detailContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.detailHeader}>
          <Text style={styles.detailTitle}>{selectedPlace.name}</Text>
          <Text style={styles.detailCategory}>{selectedPlace.category}</Text>
          <Text style={styles.detailDistance}>
            📍{" "}
            {selectedPlace.distance_km
              ? `${selectedPlace.distance_km.toFixed(1)} km`
              : ""}
          </Text>
        </View>

        <View style={styles.detailBadges}>
          {selectedPlace.dog_friendly && (
            <Text style={styles.badge}>🐕 Chiens acceptés</Text>
          )}
          {selectedPlace.terrace_allowed && (
            <Text style={styles.badge}>☀️ Terrasse</Text>
          )}
          {selectedPlace.inside_allowed && (
            <Text style={styles.badge}>🏠 Intérieur</Text>
          )}
          {selectedPlace.water_bowl && (
            <Text style={styles.badge}>💧 Eau</Text>
          )}
          {selectedPlace.beach_access && (
            <Text style={styles.badge}>🏖️ Baignade</Text>
          )}
        </View>

        {selectedPlace.description && (
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {selectedPlace.description}
            </Text>
          </View>
        )}

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.infoText}>{selectedPlace.address}</Text>
          <Text style={styles.infoText}>{selectedPlace.city}</Text>
          {selectedPlace.phone && (
            <TouchableOpacity
              onPress={() => Alert.alert("Téléphone", selectedPlace.phone || "")}
            >
              <Text style={styles.linkText}>{selectedPlace.phone}</Text>
            </TouchableOpacity>
          )}
          {selectedPlace.website && (
            <TouchableOpacity
              onPress={() => Alert.alert("Site web", selectedPlace.website || "")}
            >
              <Text style={styles.linkText}>{selectedPlace.website}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Conditions</Text>
          <Text style={styles.infoText}>
            Laisse obligatoire : {selectedPlace.leash_required ? "Oui" : "Non"}
          </Text>
          <Text style={styles.infoText}>
            Parking : {selectedPlace.parking_available ? "Oui" : "Non"}
          </Text>
          <Text style={styles.infoText}>
            Accessible PMR :{" "}
            {selectedPlace.wheelchair_accessible ? "Oui" : "Non"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            Alert.alert(
              "Itinéraire",
              `Ouvre Maps vers : ${selectedPlace.name}`
            );
          }}
        >
          <Text style={styles.primaryButtonText}>Ouvrir dans Maps</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />
      </ScrollView>
    );
  };

  if (screen === "scanner") {
    if (!permission) {
      return (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      );
    }

    if (!permission.granted) {
      return (
        <View style={styles.center}>
          <Text style={styles.title}>Autorisation caméra</Text>
          <Text style={styles.subtitle}>
            Pour scanner le QR de votre hôtel, activez l'accès à la caméra.
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={requestPermission}
          >
            <Text style={styles.primaryButtonText}>Autoriser</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={handleScan}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        />

        <View style={styles.scanOverlay}>
          <View style={styles.scanBox}>
            <Text style={styles.scanText}>Scanner le QR</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.resetButtonText}>Rescanner</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === "detail" && selectedPlace) {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setScreen("list")}>
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>
        </View>
        {renderDetail()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {hotel ? hotel.name : "Liste des lieux"}
        </Text>
        <Text style={styles.headerSubtitle}>
          {places.length} lieux dog-friendly trouvés
        </Text>
      </View>

      <TouchableOpacity style={styles.gpsButton} onPress={useMyGps}>
        <Text style={styles.gpsButtonText}>📍 Utiliser ma position</Text>
      </TouchableOpacity>

      {gpsEnabled && userLocation && (
        <View style={styles.gpsInfo}>
          <Text style={styles.gpsInfoText}>
            Position GPS activée • rayon {distanceKm} km
          </Text>
        </View>
      )}

      <View style={styles.filterWrap}>
        <Text style={styles.filterLabel}>Catégorie</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCategory === null && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === null && styles.filterTextActive,
              ]}
            >
              Tous
            </Text>
          </TouchableOpacity>

          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.filterButton,
                selectedCategory === cat.id && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text style={styles.filterIcon}>{cat.icon}</Text>
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === cat.id && styles.filterTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.filterLabel}>Distance</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {distanceOptions.map((d) => (
            <TouchableOpacity
              key={d}
              style={[
                styles.distanceButton,
                distanceKm === d && styles.distanceButtonActive,
              ]}
              onPress={() => setDistanceKm(d)}
            >
              <Text
                style={[
                  styles.distanceText,
                  distanceKm === d && styles.distanceTextActive,
                ]}
              >
                {d} km
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Chargement des lieux...</Text>
        </View>
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.id}
          renderItem={renderPlaceItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                const base = userLocation
                  ? userLocation
                  : { latitude: hotel!.latitude, longitude: hotel!.longitude };
                const result = await fetchPlaces(
                  base.latitude,
                  base.longitude,
                  selectedCategory,
                  distanceKm
                );
                setPlaces(result);
                setRefreshing(false);
              }}
            />
          }
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🐕</Text>
              <Text style={styles.emptyTitle}>Aucun lieu trouvé</Text>
              <Text style={styles.emptyText}>
                Essayez une distance plus grande ou modifiez le filtre.
              </Text>
            </View>
          }
        />
      )}

      <View style={styles.footerButtons}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            setUserLocation(null);
            setGpsEnabled(false);
            setScreen("scanner");
            setScanned(false);
          }}
        >
          <Text style={styles.secondaryButtonText}>Scanner un autre QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  camera: { flex: 1 },
  scanOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  resetButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  resetButtonText: { color: "#fff", fontWeight: "700" },

  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#6b7280",
  },
  gpsButton: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: "#34C759",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  gpsButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  gpsInfo: {
    backgroundColor: "#d4edda",
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  gpsInfoText: {
    color: "#155724",
    fontSize: 12,
    fontWeight: "600",
  },
  filterWrap: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  filterScroll: {
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    paddingHorizontal: 16,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#f1f3f5",
  },
  filterButtonActive: {
    backgroundColor: "#007AFF",
  },
  filterIcon: { fontSize: 14, marginRight: 5 },
  filterText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
  },
  distanceButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#f1f3f5",
  },
  distanceButtonActive: {
    backgroundColor: "#34C759",
  },
  distanceText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#333",
  },
  distanceTextActive: {
    color: "#fff",
  },

  listContainer: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 80,
  },
  placeCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  placeIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#e8f4ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  placeIcon: {
    fontSize: 24,
  },
  placeContent: {
    flex: 1,
  },
  placeHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  placeName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginRight: 8,
  },
  placeDistance: {
    fontSize: 12,
    fontWeight: "700",
    color: "#007AFF",
  },
  placeCity: {
    marginTop: 4,
    fontSize: 12,
    color: "#6b7280",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 6,
  },
  tag: {
    backgroundColor: "#f1f3f5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 10,
    color: "#333",
    overflow: "hidden",
  },
  rating: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  arrow: {
    fontSize: 24,
    color: "#b0b0b0",
    marginLeft: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  emptyText: {
    marginTop: 8,
    color: "#6b7280",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  footerButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  secondaryButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#111827",
    fontWeight: "700",
  },
  topBar: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backText: {
    color: "#007AFF",
    fontWeight: "700",
    fontSize: 16,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  detailHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  detailCategory: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
  },
  detailDistance: {
    marginTop: 8,
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "700",
  },
  detailBadges: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    backgroundColor: "#e8f4ff",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 11,
    color: "#111827",
    overflow: "hidden",
    fontWeight: "700",
  },
  detailSection: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  descriptionText: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 22,
  },
  infoText: {
    color: "#374151",
    fontSize: 14,
    marginBottom: 8,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 18,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  loadingText: {
    marginTop: 12,
    color: "#6b7280",
  },
  spacer: {
    height: 20,
  },
});

export default App;
