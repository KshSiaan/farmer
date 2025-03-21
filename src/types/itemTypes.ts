export interface ProductType {
  id: number;
  farmer_id: number;
  category_id: number;
  name: string;
  description: string;
  price: string;
  harvest_date: string;
  image: string;
  created_at: string;
  updated_at: string;
  farmer: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
    icon: string;
  };
}
