import { supabase } from './supabase';

// Supabase Storage URL for product images
const STORAGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images`;

// Category mapping for storage paths
const categoryPaths: { [key: string]: string } = {
  'BAKERY': 'bakery',
  'CANDY': 'candy',
  'CHEESES': 'misc', // Map to closest category
  'COOKIES': 'sweets',
  'DATES': 'sweets',
  'DESSERT MIX': 'sweets',
  'DRINKS': 'misc',
  'FETA': 'misc',
  'FILLO': 'bakery',
  'FOODSERVICE': 'foodservice',
  'FROZEN': 'misc',
  'GRAINS': 'misc',
  'GROCERY': 'misc',
  'HALAL CANDY': 'candy',
  'ICE CREAM': 'misc',
  'JAMS & HONEY': 'sweets',
  'KITCHEN': 'kitchen',
  'MEAT': 'meat',
  'MISC': 'misc',
  'NUTS': 'nuts',
  'OLIVES': 'olives',
  'PASTA': 'pasta',
  'PICKLES': 'pickles',
  'READY TO EAT': 'ready-to-eat',
  'SADAF': 'misc',
  'SAUCES': 'sauces',
  'SNACKS': 'snacks',
  'SPICES': 'spices',
  'SWEETS': 'sweets',
  'TEA': 'tea',
  'COFFEE': 'tea', // Map to tea folder
  'YOGURT': 'yogurt',
  'ZIYAD': 'misc'
};

// Cache for image listings
let imageCache: { [category: string]: string[] } = {};
let cacheTimestamp = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Sanitize a product name to match potential file names
 */
function sanitizeForMatching(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except word chars, spaces, and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

/**
 * Get list of images from Supabase Storage for a category
 */
async function getImagesForCategory(category: string): Promise<string[]> {
  const categoryPath = categoryPaths[category];
  if (!categoryPath) return [];

  // Check cache first
  const now = Date.now();
  if (imageCache[categoryPath] && (now - cacheTimestamp < CACHE_DURATION)) {
    return imageCache[categoryPath];
  }

  try {
    const { data, error } = await supabase.storage
      .from('product-images')
      .list(categoryPath);

    if (error) throw error;

    const imageList = data?.map(file => file.name) || [];
    
    // Update cache
    imageCache[categoryPath] = imageList;
    cacheTimestamp = now;
    
    return imageList;
  } catch (error) {
    console.error(`Error fetching images for category ${category}:`, error);
    return [];
  }
}

/**
 * Find the best matching image for a product
 */
async function findMatchingImage(productName: string, category: string): Promise<string | null> {
  const images = await getImagesForCategory(category);
  if (images.length === 0) return null;

  const sanitizedProductName = sanitizeForMatching(productName);
  const productWords = sanitizedProductName.split('-').filter(word => word.length > 2);

  // Try different matching strategies
  
  // 1. Exact match
  const exactMatch = images.find(img => 
    sanitizeForMatching(img.replace(/\.[^/.]+$/, "")) === sanitizedProductName
  );
  if (exactMatch) return exactMatch;

  // 2. Partial match with multiple words
  if (productWords.length > 1) {
    const partialMatch = images.find(img => {
      const imgName = sanitizeForMatching(img.replace(/\.[^/.]+$/, ""));
      return productWords.every(word => imgName.includes(word));
    });
    if (partialMatch) return partialMatch;
  }

  // 3. Single word match (for longer words)
  const singleWordMatch = images.find(img => {
    const imgName = sanitizeForMatching(img.replace(/\.[^/.]+$/, ""));
    return productWords.some(word => word.length > 3 && imgName.includes(word));
  });
  if (singleWordMatch) return singleWordMatch;

  // 4. Brand name matching (common brand names)
  const brandWords = ['adonis', 'aleppo', 'castania', 'barak', 'samir', 'al-wadi', 'ziyad', 'sadaf'];
  const brandMatch = images.find(img => {
    const imgName = sanitizeForMatching(img.replace(/\.[^/.]+$/, ""));
    return brandWords.some(brand => 
      sanitizedProductName.includes(brand) && imgName.includes(brand)
    );
  });
  if (brandMatch) return brandMatch;

  return null;
}

/**
 * Get the full URL for a product image
 */
export async function getProductImageUrl(productName: string, category: string, imageUrl?: string): Promise<string> {
  // If product has a specific image URL, use it first
  if (imageUrl) {
    return imageUrl;
  }

  try {
    const matchingImage = await findMatchingImage(productName, category);
    
    if (matchingImage) {
      const categoryPath = categoryPaths[category];
      return `${STORAGE_URL}/${categoryPath}/${matchingImage}`;
    }
  } catch (error) {
    console.error('Error getting product image:', error);
  }

  // Fallback to category placeholder
  return getCategoryPlaceholder(category);
}

/**
 * Get placeholder image for category
 */
export function getCategoryPlaceholder(category: string): string {
  const imageMap: { [key: string]: string } = {
    'BAKERY': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'CANDY': 'https://images.unsplash.com/photo-1514849302-984523450cf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'CHEESES': 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'COOKIES': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'DATES': 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'DRINKS': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'FROZEN': 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'GRAINS': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'NUTS': 'https://images.unsplash.com/photo-1508747792480-cca4d777b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'OLIVES': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'PASTA': 'https://images.unsplash.com/photo-1551892589-865f69869476?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'SPICES': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'TEA': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'COFFEE': 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'YOGURT': 'https://images.unsplash.com/photo-1571212515416-8b71b4752fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };
  
  return imageMap[category] || 'https://images.unsplash.com/photo-1556909114-4f0f33e6a3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
}

/**
 * Preload images for better performance
 */
export async function preloadCategoryImages(categories: string[]): Promise<void> {
  const promises = categories.map(category => getImagesForCategory(category));
  await Promise.all(promises);
}

/**
 * Clear image cache (useful for testing)
 */
export function clearImageCache(): void {
  imageCache = {};
  cacheTimestamp = 0;
} 