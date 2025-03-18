export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  role: string;
  address: string;
  phone: string | null;
  image: string;
  otp: string | null;
  otp_expire_at: string | null;
  google_id: string | null;
  stripe_connect_id: string | null;
  completed_stripe_onboarding: number;
  status: string;
  balance: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ApiResponse {
  status: boolean;
  data: User;
}
