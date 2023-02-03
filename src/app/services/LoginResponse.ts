import { Register } from '../model/register';


export interface LoginResponse {
    token: string;
    refreshToken: string;
    expiresAt: string;
    register: Register;
}
