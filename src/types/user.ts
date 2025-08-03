export type UserRole = "ADMIN" | "USER";

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
}