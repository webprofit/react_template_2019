import { IResponseAuth } from 'COMMON/interfaces/IResponseAuth';
import UrlHelper from 'COMMON/helpers/UrlHelper';
import { User, UserRole } from 'COMMON/entities/User';
import ErrorResponse from './ErrorHandling';

export class Auth implements IResponseAuth {

    private static _instance: Auth;
    private _identity: User = null;
    public Identity = (): User => this._identity;

    private listeners: any[] = [];
    private listeners401: any[] = [];
    private _promise: Promise<User>;

    private headers: HeadersInit = { 'Content-Type': 'application/json' };
    private credentials: RequestCredentials = 'same-origin';
    private url: string = new UrlHelper().getBaseURL('users');

    initCompleted: boolean = false;

    private constructor() {
        if (process.env.NODE_ENV === 'development') {
            this.headers = {
                'Content-Type': 'application/json',
            };
            this.credentials = 'include';
        }
    }

    user = new User();
  

    private load = (): Promise<User> => {
        return new Promise((resolve, reject) => {
            this.user.firstName = "Test",
            this.user.lastName = "User",
            resolve(this.user)
        })
        // if (this._promise) {
        //     return this._promise;
        // }

        // this._promise = fetch(`${this.url}/current`, {
        //     headers: this.headers,
        //     credentials: this.credentials,
        // })
        //     .then(response => {
        //         if (response.status === 401) {
        //             return null;
        //         }
        //         if (!response.ok) {
        //             throw new ErrorResponse(response.statusText, response);
        //         }
        //         return response.json();
        //     });

        // return this._promise;
    }

    public static getProvider = (): Auth => {
        if (!Auth._instance) {
            Auth._instance = new Auth();
        }
        return Auth._instance;
    }

    ensureResponsAuth(response: Response): boolean {
        if (response.status === 401) {
            Auth.getProvider().listeners401.forEach((callback: () => void) => callback());
            return false;
        }
        return true;
    }

    public onInitialized(callback: (identity: User) => void): void {
        this.listeners.push(callback);
    }

    public onUnauthorized(callback: () => void): void {
        this.listeners401.push(callback);
    }

    public signIn(login: string, pass: string): Promise<User> {

        let options: any = {
            headers: this.headers,
            credentials: this.credentials,
            method: 'POST',
            body: JSON.stringify({ 'email': login, 'password': pass })
        }
        return new Promise((resolve, reject) => {
            this.user.firstName = "Test",
            this.user.lastName = "User",
            resolve(this.user)
        })
        // return fetch(this.url + `/login`, options)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new ErrorResponse(response.statusText, response);
        //         }
        //         return response.json();
        //     })
        //     .then(res => {
        //         this._identity = res;
        //         this.initCompleted = true;
        //         this.listeners.forEach((callback) => callback(this._identity));
        //         return res;
        //     });
    }

    public signOut(): Promise<any> {
        let options: any = {
            headers: this.headers,
            credentials: this.credentials,
            method: 'POST',
        }

        return fetch(this.url + `/logout`, options)
            .then(response => {
                if (!response.ok) {
                    throw new ErrorResponse(response.statusText, response);
                } else {
                    this._identity = null;
                    this.initCompleted = false;
                    this.listeners.forEach((callback) => callback(this._identity));
                }
            });
    }


    isAuthenticated = (): boolean => this._identity !== null;

    hasRole = (role: UserRole): boolean => this._identity ? role == this._identity.role : false;

    getIdentity = (): Promise<User> => {
        if (!this._identity) {
            return this.load()
                .then((res) => {
                    this._identity = res;
                    this.initCompleted = true;
                    this.listeners.forEach((callback) => callback(this._identity));
                    return this._identity;
                })
                .catch(e => {
                    this._identity = null;
                    this.initCompleted = true;
                    this.listeners.forEach((callback) => callback(this._identity));
                    return this._identity;
                });
        }
        return new Promise<User>((resolve) => {
            resolve(this._identity)
        })
    }

    // static RouteAuthorized = (path: string) => {
    //     const matchedPath = Auth.RoutesAuthorization.find(x => x.path === path);
    //     if (!matchedPath) {
    //         return true;
    //     }
    //     var userRole = Auth.getProvider()._identity ? Auth.getProvider()._identity.role : UserRole.None;
    //     const role = matchedPath.roles.find(x => x == userRole);
    //     if (role || role == 0) {
    //         return true;
    //     }
    //     return false;
    // }

    // private static RoutesAuthorization = [
    //     {
    //         path: '/auxiliary-data',
    //         roles: [UserRole.None],
    //     },
    // ];
}