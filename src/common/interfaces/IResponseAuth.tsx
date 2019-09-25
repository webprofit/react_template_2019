export interface IResponseAuth {
    ensureResponsAuth(response: Response): boolean;
}