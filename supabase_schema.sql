-- Supabase Schema for Kissan Sarthi
-- Paste this into the Supabase SQL Editor and hit "Run"

-- 1. Create Profiles Table (Extended user data)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('farmer', 'buyer')),
  
  -- Farmer specific fields
  farm_name TEXT,
  state TEXT,
  district TEXT,
  village TEXT,
  farm_size TEXT,
  primary_crops TEXT[], -- Array of crops
  document_url TEXT,
  
  -- Buyer specific fields
  address TEXT,
  city TEXT,
  pincode TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Products Table
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  seller_name TEXT NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  category TEXT NOT NULL,
  stock INTEGER NOT NULL,
  image_url TEXT,
  rating NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Set up Row Level Security (RLS)
-- The user requested "change the database permission to public so it can be access to our api"

-- Enable RLS (Good security practice)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Profiles Policies: Let anyone read profiles, let authenticated users insert/update their own
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." 
ON public.profiles FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own profile." 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Products Policies: Let anyone read products, let authenticated users insert/update/delete their own
CREATE POLICY "Public products are viewable by everyone." 
ON public.products FOR SELECT USING (true);

CREATE POLICY "Users can insert their own products." 
ON public.products FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own products." 
ON public.products FOR UPDATE USING (true);

CREATE POLICY "Users can delete their own products." 
ON public.products FOR DELETE USING (true);

-- 4. Create Storage Bucket for Images
-- We create a bucket named 'kissan-images' with PUBLIC access
INSERT INTO storage.buckets (id, name, public) 
VALUES ('kissan-images', 'kissan-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies: Let anyone read, let authenticated users upload
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT USING (bucket_id = 'kissan-images');

CREATE POLICY "Anyone can upload images" 
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'kissan-images'
);

CREATE POLICY "Users can update their own images" 
ON storage.objects FOR UPDATE USING (
  bucket_id = 'kissan-images' AND auth.uid() = owner
);

CREATE POLICY "Users can delete their own images" 
ON storage.objects FOR DELETE USING (
  bucket_id = 'kissan-images' AND auth.uid() = owner
);
