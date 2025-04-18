export interface ProductType {
  id: string;
  farmer_id: string;
  category_id: string;
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
  id: string;
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

export interface InsuranceType {
  id: string;
  farm_id: string;
  user_id: string;
  provider: string;
  policy_number: string;
  coverage_details: string;
  coverage_amount: string;
  premium: string;
  insurance_status: string; // Example status options
  claim_status: string; // Example claim status options
  created_at: string; // ISO 8601 date-time string
  updated_at: string; // ISO 8601 date-time string
  user: {
    id: number;
    name: string;
  };
  farm: {
    id: number;
    farm_name: string;
  };
}
