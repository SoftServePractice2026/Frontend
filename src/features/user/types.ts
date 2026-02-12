export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface IdentityDetailsDto {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    roles: string[];
}

export interface AuthResponse {
    token: string;
    expiryDate: string;
    userDetails: IdentityDetailsDto;
    refreshToken: string | null;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    tokenHash: string;
}

export interface RecoveryPasswordRequest {
    email: string;
    token: string;
    newPassword: string;
}