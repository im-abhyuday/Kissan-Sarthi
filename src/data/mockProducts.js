// Product images using emoji-based category icons + Unsplash placeholders
// TODO: Replace image URLs with actual product images stored in Supabase Storage

export const PRODUCT_IMAGES = {
  Vegetables: [
    'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1518977676601-b53f82ber678?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&h=300&fit=crop',
  ],
  Fruits: [
    'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop',
  ],
  Grains: [
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
  ],
  Pulses: [
    'https://images.unsplash.com/photo-1515543904067-3d4e0f5b4eaa?w=400&h=300&fit=crop',
  ],
  Spices: [
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop',
  ],
};

export const INITIAL_PRODUCTS = [
  { id: 1, name: 'Fresh Wheat (Gehu)', price: 30, unit: 'kg', seller: 'Ram Lal', sellerId: 'f1', category: 'Grains', image: PRODUCT_IMAGES.Grains[0], rating: 4.5, stock: 500 },
  { id: 2, name: 'Organic Tomatoes', price: 40, unit: 'kg', seller: 'Suresh Patil', sellerId: 'f2', category: 'Vegetables', image: PRODUCT_IMAGES.Vegetables[0], rating: 4.8, stock: 200 },
  { id: 3, name: 'Basmati Rice', price: 120, unit: 'kg', seller: 'Priya Singh', sellerId: 'f3', category: 'Grains', image: PRODUCT_IMAGES.Grains[1], rating: 4.7, stock: 1000 },
  { id: 4, name: 'Red Onions', price: 25, unit: 'kg', seller: 'K. Gowda', sellerId: 'f4', category: 'Vegetables', image: PRODUCT_IMAGES.Vegetables[2], rating: 4.3, stock: 300 },
  { id: 5, name: 'Fresh Mangoes (Alphonso)', price: 250, unit: 'dozen', seller: 'Suresh Patil', sellerId: 'f2', category: 'Fruits', image: PRODUCT_IMAGES.Fruits[0], rating: 4.9, stock: 50 },
  { id: 6, name: 'Green Chillies', price: 60, unit: 'kg', seller: 'Ram Lal', sellerId: 'f1', category: 'Vegetables', image: PRODUCT_IMAGES.Vegetables[1], rating: 4.2, stock: 100 },
  { id: 7, name: 'Toor Dal', price: 140, unit: 'kg', seller: 'Priya Singh', sellerId: 'f3', category: 'Pulses', image: PRODUCT_IMAGES.Pulses[0], rating: 4.6, stock: 400 },
  { id: 8, name: 'Turmeric Powder', price: 200, unit: 'kg', seller: 'K. Gowda', sellerId: 'f4', category: 'Spices', image: PRODUCT_IMAGES.Spices[0], rating: 4.8, stock: 150 },
  { id: 9, name: 'Fresh Bananas', price: 40, unit: 'dozen', seller: 'Ram Lal', sellerId: 'f1', category: 'Fruits', image: PRODUCT_IMAGES.Fruits[1], rating: 4.4, stock: 200 },
  { id: 10, name: 'Jowar (Sorghum)', price: 45, unit: 'kg', seller: 'Suresh Patil', sellerId: 'f2', category: 'Grains', image: PRODUCT_IMAGES.Grains[2], rating: 4.1, stock: 600 },
  { id: 11, name: 'Pomegranate', price: 180, unit: 'kg', seller: 'Priya Singh', sellerId: 'f3', category: 'Fruits', image: PRODUCT_IMAGES.Fruits[2], rating: 4.7, stock: 80 },
  { id: 12, name: 'Fresh Potatoes', price: 20, unit: 'kg', seller: 'K. Gowda', sellerId: 'f4', category: 'Vegetables', image: PRODUCT_IMAGES.Vegetables[0], rating: 4.5, stock: 500 },
];

export const CATEGORIES = ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices'];
