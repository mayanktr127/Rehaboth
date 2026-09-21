export interface AuthUser {
  id: string;
  phone: string;
  fullName: string;
  email?: string;
  membershipTier: 'standard' | 'gold' | 'atelier';
  createdAt: string;
}

export interface OtpRequestInput {
  phone: string;
  fullName?: string;
  email?: string;
}

export interface OtpRequestResult {
  phone: string;
  expiresInSeconds: number;
  devOtp?: string;
  message: string;
}

export interface OtpVerifyInput {
  phone: string;
  otp: string;
}

export interface AuthSession {
  token: string;
  refreshToken?: string;
  user: AuthUser;
  isNewUser: boolean;
}
