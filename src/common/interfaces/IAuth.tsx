import { User, UserRole } from "COMMON/entities/User";



export interface IAuth {

    signIn(login: string, pass: string): Promise<User>;
    signOut(): Promise<any>;
    isAuthenticated(): boolean;
    hasRole(role: UserRole): boolean;
    getIdentity(): Promise<User>;
    
    ensureResponsAuth(response: Response): boolean;


}