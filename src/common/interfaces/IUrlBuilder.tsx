import { string } from "prop-types";

export interface IQueryParams{
    filter?: string,
    take?: number,
    skip?: number,
    count?: boolean,
    order?: string,
    includes?: string,
    oDataQuery?: string,
}

export interface ISelectParams{
    id: number,
    urlSuffix?: string,
    includes?: string,
}

export interface IUpdateParams {
    objId: number,
    uniqueId?: number,
    rowVersion?: string,
}

export interface IUrlBuilder {
    getBaseURL(urlSufix: string): string;

    getQueryParams(params: IQueryParams): string;

    getSelectParams(params: ISelectParams): string;

    getUpdateParams(params: IUpdateParams, putIdInUrl: boolean): string;

    getUrlWithQuery(urlSufix: string, params: IQueryParams): string;
}