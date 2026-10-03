// /src/components/FilterBar.tsx
// Composant pour filtrer par catégorie et distance

import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { APP_CONFIG } from "../config";

interface FilterBarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedDistance: number;
  onDistanceChange: (distance: number) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedDistance,
  onDistanceChange,
}) => {
  const distanceOptions = [5, 10, 20, 30, 50];

  return (
    <View style={styles.container}>
      {/* Filtres catégorie */}
      <Text style={styles.label}>Catégorie</Text>
      <ScrollView
        style={styles.categoryScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === null && styles.categoryButtonActive,
          ]}
          onPress={() => onCategoryChange(null)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === null && styles.categoryTextActive,
            ]}
          >
            Tous
          </Text>
        </TouchableOpacity>

        {APP_CONFIG.categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryButton,
              selectedCategory === cat.id && styles.categoryButtonActive,
            ]}
            onPress={() => onCategoryChange(cat.id)}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat.id && styles.categoryTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filtres distance */}
      <Text style={styles.label}>Distance maximale</Text>
      <ScrollView
        style={styles.distanceScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {distanceOptions.map((distance) => (
          <TouchableOpacity
            key={distance}
            style={[
              styles.distanceButton,
              selectedDistance === distance && styles.distanceButtonActive,
            ]}
            onPress={() => onDistanceChange(distance)}
          >
            <Text
              style={[
                styles.distanceText,
                selectedDistance === distance && styles.distanceTextActive,
              ]}
            >
              {distance} km
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 10,
  },
  label: {
    paddingHorizontal: 16,
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  categoryScroll: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    minHeight: 36,
  },
  categoryButtonActive: {
    backgroundColor: "#007AFF",
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  categoryTextActive: {
    color: "#fff",
  },
  distanceScroll: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  distanceButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    minHeight: 34,
    justifyContent: "center",
  },
  distanceButtonActive: {
    backgroundColor: "#34C759",
  },
  distanceText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#333",
  },
  distanceTextActive: {
    color: "#fff",
  },
});
