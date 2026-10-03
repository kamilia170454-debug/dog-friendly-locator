-- Schéma SQL complet pour Supabase
-- Dog-Friendly Locator MVP

-- 1. Table des catégories
CREATE TABLE place_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Table des hôtels
CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  country TEXT DEFAULT 'FR',
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  radius_km INTEGER DEFAULT 10,
  phone TEXT,
  website TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Table des codes QR
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP DEFAULT NOW(),
  used_at TIMESTAMP,
  usage_count INTEGER DEFAULT 0
);

-- 4. Table des lieux (restaurants, cafés, balades, plages)
CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES place_categories(id),
  name TEXT NOT NULL,
  address TEXT,
  city TEXT NOT NULL,
  postal_code TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  phone TEXT,
  website TEXT,
  email TEXT,
  description TEXT,
  dog_friendly BOOLEAN DEFAULT FALSE,
  terrace_allowed BOOLEAN DEFAULT FALSE,
  inside_allowed BOOLEAN DEFAULT FALSE,
  leash_required BOOLEAN DEFAULT TRUE,
  water_bowl BOOLEAN DEFAULT FALSE,
  beach_access BOOLEAN DEFAULT FALSE,
  parking_available BOOLEAN DEFAULT FALSE,
  wheelchair_accessible BOOLEAN DEFAULT FALSE,
  rating_avg DOUBLE PRECISION DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'outdated')),
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'google', 'partner', 'user')),
  created_by UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Table des horaires des lieux
CREATE TABLE place_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. Table des médias (photos/vidéos)
CREATE TABLE place_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  type TEXT DEFAULT 'image' CHECK (type IN ('image', 'video')),
  is_primary BOOLEAN DEFAULT FALSE,
  alt_text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. Table des avis utilisateurs
CREATE TABLE place_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  user_id UUID,
  user_name TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 8. Table des utilisateurs
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 9. Table des favoris
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, place_id)
);

-- 10. Table des signalements/rapports
CREATE TABLE place_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL CHECK (report_type IN ('incorrect_info', 'no_longer_dogfriendly', 'closed', 'spam', 'other')),
  description TEXT,
  user_id UUID,
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- INDEX pour optimiser les requêtes
CREATE INDEX idx_places_city ON places(city);
CREATE INDEX idx_places_category_id ON places(category_id);
CREATE INDEX idx_places_status ON places(status);
CREATE INDEX idx_places_dog_friendly ON places(dog_friendly);
CREATE INDEX idx_qr_codes_hotel_id ON qr_codes(hotel_id);
CREATE INDEX idx_qr_codes_code ON qr_codes(code);
CREATE INDEX idx_place_reviews_place_id ON place_reviews(place_id);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);

-- TRIGGER pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_hotels_updated_at BEFORE UPDATE ON hotels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_places_updated_at BEFORE UPDATE ON places
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Politiques Row Level Security (RLS)
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_reviews ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique pour les lieux approuvés
CREATE POLICY "Lieux approuvés publiquement lisibles" ON places
  FOR SELECT
  USING (status = 'approved');

-- Politique de lecture publique pour les avis approuvés
CREATE POLICY "Avis approuvés publiquement lisibles" ON place_reviews
  FOR SELECT
  USING (is_approved = TRUE);
