export interface Region {
    name: string;
}

export interface Room {
    uid?: string,
    name?: string;
    region?: string;
    active?: boolean;
}

export interface AppUser {
    uid?: string,
    email?: string,
    name?: string,
    regions?: string[],
    active?: boolean,
    role?: string,
}