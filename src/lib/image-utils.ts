export function getOptimizedImageUrl(url: string | null | undefined): string {
  // Return default placeholder if no URL
  if (!url) return '/placeholder.svg';
  
  // Return the URL as-is for now
  return url;
}

export function getProductImageUrl(productName: string): string {
  // Mock implementation - return placeholder
  return '/placeholder.svg';
}

export function getCategoryPlaceholder(category: string): string {
  // Mock implementation - return placeholder based on category
  return '/placeholder.svg';
}

export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
}