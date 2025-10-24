import { APIMethodEnum } from "./apiConfig.model.js";
import { APIEndpoints } from "./apiEndpoint.js";

export const API_CONFIG: any = {

    users: {
        endpoint: APIEndpoints.USER,
        method: APIMethodEnum.GET,
        key: 'movies'
    },
    trendingMovieDay: {
        endpoint: APIEndpoints.TRENDING_MOVIES,
        method: APIMethodEnum.GET,
        isTMDB: true,
    },
};


