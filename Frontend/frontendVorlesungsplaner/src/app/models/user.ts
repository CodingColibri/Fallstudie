export interface LoginRequest {
    mail: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
}

export type UserRoleEnum = 'student' | 'dozent' | 'admin';
export const UserRoleEnum = {
    Student: 'student' as UserRoleEnum,
    Dozent: 'dozent' as UserRoleEnum,
    Admin: 'admin' as UserRoleEnum,
};

export interface UserTokenData {
    access_token: string,
    user: User
}

export interface User {
    id: number;
    mail: string;
    titel?: string;
    vorname: string;
    nachname: string;
    password?: string;
    role: UserRoleEnum;
}

export interface BackendErrorResponse {
    msg: string;
}