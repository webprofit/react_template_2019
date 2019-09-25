import { BaseEntityUnDeletable } from "./BaseEntity";

export enum UserRole {
    None = 0,
    User = 10,
    Admin = 100,
}


export class User extends BaseEntityUnDeletable {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    email: string;
    role: UserRole;
   
}