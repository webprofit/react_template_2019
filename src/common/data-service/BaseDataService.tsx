import { IServiceConfig } from 'COMMON/interfaces/IServiceConfig';
import ErrorResponse from 'COMMON/services/ErrorHandling';


export default class BaseDataService {

    protected headers: HeadersInit = { 'Content-Type': 'application/json' };
    protected credentials: RequestCredentials = 'same-origin';
    protected config: IServiceConfig;
    protected url: string;

    constructor(config: IServiceConfig) {
        this.config = config;
        this.url = this.config.urlBuilder.getBaseURL(this.config.url);

        if (process.env.NODE_ENV === 'development') {
            this.credentials = 'include';
        }
    }

    private async submitRequest(url: string, method: string = 'GET', body: any = null, headers:any = this.headers): Promise<any> {
        let options: any = {
            method: method,
            headers: headers,
            credentials: this.credentials,
        }
        if (method !== 'GET') {
            options.body = body;
        }
        const response = await fetch(url, options);
        if (!this.config.auth.ensureResponsAuth(response)) {
            return Promise.reject(new ErrorResponse("Unauthorized", response))
        }
        if (!response.ok) {
            return Promise.reject(new ErrorResponse(response.statusText, response));
        }
        if (method == "DELETE") {
            return;
        }
        else {
            return response;
        }

    }

    request = (url: string, method: string = 'GET', body: any = null, headers:any = this.headers): Promise<any> => this.submitRequest(url, method, JSON.stringify(body),headers);

    protected async requestJSON(url: string, method: string = 'GET', body: any = null, headers:any = this.headers, noResponse: boolean = false ): Promise<any> {
       
        const res = await this.request(url, method, body, headers);
       
        if (res) {
            if (noResponse) {
                return ;
            } else {
                return res.json();
            }
        }
    }

    protected submitFile(url: string, method: string, body: any): Promise<any>  {
        return this.submitRequest(url, method, body)
    };

    protected async requestFile(url: string): Promise<any> {

        const res = await this.request(url);
        if (res) {
            return res.blob();
        }
    }
}