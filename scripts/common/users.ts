export interface User {
    id: number;
    name: string;
    ruby: string;
    verified: boolean;
    authType: 'totp' | 'none';
    admin: boolean;
    active: boolean;
}

export function safeUser({id, ruby, name, verified, authType, admin, active}: User): User {
    return { id, name, ruby, verified, authType, admin, active };
}
