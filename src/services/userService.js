import { supabase } from '../config/supabaseClient';

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  const profile = {
    id: data.id,
    email: data.email,
    role: data.role,
    profile: {
      fullName: data.full_name,
      phone: data.phone,
      farmName: data.farm_name,
      state: data.state,
      district: data.district,
      village: data.village,
      farmSize: data.farm_size,
      primaryCrops: data.primary_crops,
      address: data.address,
      city: data.city,
      pincode: data.pincode,
    }
  };

  return { data: profile, error: null };
};

export const updateUserProfile = async (userId, updates) => {
  const snakeCaseUpdates = {
    full_name: updates.fullName,
    phone: updates.phone,
    farm_name: updates.farmName,
    state: updates.state,
    district: updates.district,
    village: updates.village,
    farm_size: updates.farmSize,
    primary_crops: updates.primaryCrops,
    address: updates.address,
    city: updates.city,
    pincode: updates.pincode,
  };

  // Filter out undefined keys
  Object.keys(snakeCaseUpdates).forEach(key => 
    snakeCaseUpdates[key] === undefined && delete snakeCaseUpdates[key]
  );

  const { data, error } = await supabase
    .from('profiles')
    .update(snakeCaseUpdates)
    .eq('id', userId)
    .select();

  return { data, error: error?.message || null };
};
