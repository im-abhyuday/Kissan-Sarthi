import { supabase } from '../config/supabaseClient';

/**
 * Upload an image to Supabase Storage
 */
export const uploadProductImage = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('kissan-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Upload Error:', uploadError);
    return null;
  }

  const { data } = supabase.storage
    .from('kissan-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

/**
 * Get all products
 */
export const getProducts = async (category = null) => {
  let query = supabase.from('products').select('*').order('created_at', { ascending: false });
  
  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  
  if (error) {
    return { data: [], error: error.message };
  }

  // Map snake_case to camelCase
  const formattedData = data.map(p => ({
    ...p,
    sellerId: p.seller_id,
    seller: p.seller_name,
    image: p.image_url,
  }));

  return { data: formattedData, error: null };
};

/**
 * Add a new product listing (supports image upload)
 */
export const addProduct = async (productData, imageFile = null) => {
  let imageUrl = null;
  
  if (imageFile) {
    imageUrl = await uploadProductImage(imageFile);
  }

  const newProduct = {
    seller_id: productData.sellerId,
    seller_name: productData.seller,
    name: productData.name,
    price: parseFloat(productData.price),
    unit: productData.unit,
    category: productData.category,
    stock: productData.stock || 100,
    image_url: imageUrl,
    rating: (4 + Math.random()).toFixed(1) // Random rating for now
  };

  const { data, error } = await supabase
    .from('products')
    .insert([newProduct])
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  // Format back to camelCase for UI
  const formattedData = {
    ...data,
    sellerId: data.seller_id,
    seller: data.seller_name,
    image: data.image_url,
  };

  return { data: formattedData, error: null };
};

/**
 * Delete a product
 */
export const deleteProduct = async (id) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  return { error: error ? error.message : null };
};
