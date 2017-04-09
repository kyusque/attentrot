export interface User {
    id: number;
    name: string;
    verified: boolean;
    authType: 'totp' | 'none';
    admin: boolean;
    active: boolean;
}

export function safeUser({id, name, verified, authType, admin, active}: User): User {
    return { id, name, verified, authType, admin, active };
}
