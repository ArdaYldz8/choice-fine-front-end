export interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  sku: string;
  quantity_on_hand?: number;
  image_url?: string;
  quickbooks_id?: string;
}