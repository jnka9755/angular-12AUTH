export interface AuthResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    token?: string;
    email?: string;
    msg?: string
}

export interface UserRequest {
    name: string;
    email: string;
    password: string;
}

export interface User {
    uid: string;
    name: string;
    email: string;
}