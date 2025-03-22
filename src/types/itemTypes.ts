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

export interface Farmer {
  id: number;
  name: string;
}

export interface FarmType {
  id: number;
  farmer_id: number;
  farm_name: string;
  location: string;
  size: string;
  crop_type: string;
  image: string[];
  video: string[];
  crop_status: string;
  operational_costs: string;
  created_at: string;
  updated_at: string;
  farmer: Farmer;
}

export interface InvestmentType {
  id: number;
  investor_id: number;
  farm_id: number;
  amount: string;
  invest_status: string;
  profit_share: string;
  created_at: string;
  updated_at: string;
  investor: Investor;
  farm: FarmType;
}

interface Investor {
  id: number;
  name: string;
}
