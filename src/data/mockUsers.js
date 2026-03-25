// Mock user database for authentication
// TODO: Replace with Supabase Auth + profiles table

export const MOCK_FARMERS = [
  {
    id: 'f1',
    email: 'ramlal@example.com',
    password: 'farmer123',
    role: 'farmer',
    profile: {
      fullName: 'Ram Lal',
      phone: '9876543210',
      state: 'Uttar Pradesh',
      district: 'Lucknow',
      village: 'Chinhat',
      farmSize: 5,
      primaryCrops: ['Grains', 'Vegetables'],
      idNumber: '',
    }
  },
  {
    id: 'f2',
    email: 'suresh@example.com',
    password: 'farmer123',
    role: 'farmer',
    profile: {
      fullName: 'Suresh Patil',
      phone: '9876543211',
      state: 'Maharashtra',
      district: 'Pune',
      village: 'Khed',
      farmSize: 12,
      primaryCrops: ['Vegetables', 'Fruits', 'Grains'],
      idNumber: '',
    }
  },
  {
    id: 'f3',
    email: 'priya@example.com',
    password: 'farmer123',
    role: 'farmer',
    profile: {
      fullName: 'Priya Singh',
      phone: '9876543212',
      state: 'Punjab',
      district: 'Amritsar',
      village: 'Verka',
      farmSize: 20,
      primaryCrops: ['Grains', 'Pulses', 'Fruits'],
      idNumber: '',
    }
  },
  {
    id: 'f4',
    email: 'gowda@example.com',
    password: 'farmer123',
    role: 'farmer',
    profile: {
      fullName: 'K. Gowda',
      phone: '9876543213',
      state: 'Karnataka',
      district: 'Mysuru',
      village: 'Nanjangud',
      farmSize: 8,
      primaryCrops: ['Vegetables', 'Spices'],
      idNumber: '',
    }
  },
];

export const MOCK_BUYERS = [
  {
    id: 'b1',
    email: 'buyer@example.com',
    password: 'buyer123',
    role: 'buyer',
    profile: {
      fullName: 'Anjali Sharma',
      phone: '9123456789',
      street: '42, MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
    }
  },
];

// Helper to generate next IDs
export const getNextFarmerId = () => `f${MOCK_FARMERS.length + 1}`;
export const getNextBuyerId = () => `b${MOCK_BUYERS.length + 1}`;
