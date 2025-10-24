export interface APIConfigModel {
        endpoint: string,
        method: APIMethodEnum,
        isAccessTokenReq?: boolean,
        isTMDB?: boolean,
        key?: string,
};

export enum APIMethodEnum {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
}

export interface APIResponseModel {
    data: any | null;
    loading: boolean;
    error: string;
}