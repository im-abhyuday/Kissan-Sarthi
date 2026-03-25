import { supabase } from '../config/supabaseClient';

/**
 * Sign up a new user using Supabase Auth
 * @param {Object} userData - { email, password, role, profile: {...} }
 */
export const signUp = async (userData) => {
  const { email, password, role, profile } = userData;

  // 1. Sign up auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return { user: null, error: authError.message };
  }

  // 2. Insert into public.profiles (Supabase trigger could also do this, 
  // but we do it manually since we disabled it to keep it simple)
  if (authData.user) {
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: authData.user.id,
        email: authData.user.email,
        role: role,
        full_name: profile.fullName || null,
        phone: profile.phone || null,
        farm_name: profile.farmName || null,
        state: profile.state || null,
        district: profile.district || null,
        village: profile.village || null,
        farm_size: profile.farmSize || null,
        primary_crops: profile.primaryCrops || null,
        document_url: profile.documentUrl || null,
        address: profile.address || null,
        city: profile.city || null,
        pincode: profile.pincode || null,
      }
    ]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      return { user: null, error: 'Failed to create user profile' };
    }
  }

  return { 
    user: { 
      id: authData.user.id, 
      email: authData.user.email, 
      role, 
      profile 
    }, 
    error: null 
  };
};

/**
 * Sign in with email and password
 */
export const signIn = async (email, password) => {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    return { user: null, error: authError.message };
  }

  // Fetch profile
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  if (profileError) {
    return { user: null, error: 'Profile not found' };
  }

  // Map database snake_case back to camelCase profile
  const profile = {
    fullName: profileData.full_name,
    phone: profileData.phone,
    farmName: profileData.farm_name,
    state: profileData.state,
    district: profileData.district,
    village: profileData.village,
    farmSize: profileData.farm_size,
    primaryCrops: profileData.primary_crops,
    address: profileData.address,
    city: profileData.city,
    pincode: profileData.pincode,
  };

  return { 
    user: { 
      id: profileData.id, 
      email: profileData.email, 
      role: profileData.role, 
      profile 
    }, 
    error: null 
  };
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error: error?.message || null };
};

/**
 * Get current session user
 */
export const getCurrentSessionUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) return { user: null };

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (!profileData) return { user: null };

  const profile = {
    fullName: profileData.full_name,
    phone: profileData.phone,
    farmName: profileData.farm_name,
    state: profileData.state,
    district: profileData.district,
    village: profileData.village,
    farmSize: profileData.farm_size,
    primaryCrops: profileData.primary_crops,
    address: profileData.address,
    city: profileData.city,
    pincode: profileData.pincode,
  };

  return { 
    user: { 
      id: profileData.id, 
      email: profileData.email, 
      role: profileData.role, 
      profile 
    } 
  };
};
