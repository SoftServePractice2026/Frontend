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
    firstname: string;
    lastName: string;
    birthDate: string;
    email: string;
    roles: string[];
}

export interface AuthResponse {
    token: string;
    expiryDate: Date;
    UserDetails: IdentityDetailsDto;
}