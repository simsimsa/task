export interface User {
    userId: number;
    name: string;
    department: string;
    company: string;
    jobTitle: string;
}

export interface UsersResponse {
    users: User[];
    total: number;
}

export type UsersData = User[];