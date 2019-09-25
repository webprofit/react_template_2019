import { IUrlBuilder, IQueryParams, ISelectParams, IUpdateParams } from "../interfaces/IUrlBuilder";

export default class UrlHelper implements IUrlBuilder {    
        
    private base = '/api/';

    getBaseURL = (query: string):string => `${this.base}${query}`;

    getQueryParams(params: IQueryParams): string {
        let url = `?`;
        if (params.order){
            url +=  `&$orderBy=${params.order}`
        }
        if(params.skip){
            url += `&$skip=${params.skip}`;
        }
        if(params.take){
            url += `&$top=${params.take}`;
        }
        if(params.count){
            url += '&$count=true'
        }    
        if(params.includes){
            url += `&$expand=${params.includes}`;
        }
        if (params.filter) {
            url += `&$filter=${params.filter}`;
        }
        if (params.oDataQuery) {
            url += `${params.oDataQuery}`;
        }

        return url;
    }

    getSelectParams = (params: ISelectParams): string => `/${params.id}${params.urlSuffix ? params.urlSuffix : ''}${params.includes ? `?includes=${params.includes}` : ''}`;

    getUpdateParams(params: IUpdateParams, putIdInUrl = true): string {
        let url = "";
        if (params.rowVersion) {
            url = `/${putIdInUrl ? (params.uniqueId ? params.uniqueId : params.objId) : ''}?rv=${params.rowVersion.split('+').join('%2B')}`;
        } else {
            url = `/${putIdInUrl ? (params.uniqueId ? params.uniqueId : params.objId) : ''}`;
        }
        return url;
    }

    getUrlWithQuery = (urlSufix: string, params: IQueryParams): string => `${this.getBaseURL(urlSufix)}${this.getQueryParams(params)}`;
}
