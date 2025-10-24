import axios, { AxiosRequestConfig } from "axios";
import { APIConfigModel } from "./apiConfig.model.js";
import { API_CONFIG } from "./apiConfig.js";

export async function callAPI(
  key: string,
  pathParams?: Record<string, string | number> | null,
  queryParams?: Record<string, any> | null,
  body?: any | null
) {
  const config: APIConfigModel | undefined = API_CONFIG[key];
  if (!config) throw new Error(`API config not found for key: ${key}`);

  // Replace path params
  let url = config.endpoint ?? "";
  if (pathParams) {
    for (const [param, value] of Object.entries(pathParams)) {
      if (value !== null && value !== undefined) {
        url = url.replace(`:${param}`, String(value));
      }
    }
  }

  // Determine base URL
  const baseUrl = config.isTMDB
    ? process.env.TMDB_BASE_URL ?? ""
    : process.env.IMDB_BASE_URL ?? "";
  if (!baseUrl) throw new Error("Base URL not set in env variables");

  // Merge API key / Authorization
  const headers: Record<string, string> = {};
  const params: Record<string, any> = { ...(queryParams ?? {}) };

  if (config.isTMDB) {
    if (process.env.TMDB_API_KEY) params.api_key = process.env.TMDB_API_KEY;
    if (process.env.TMDB_ACCESS_TOKEN)
      headers.Authorization = `Bearer ${process.env.TMDB_ACCESS_TOKEN}`;
  }

  if (config.isAccessTokenReq && process.env.ACCESS_TOKEN) {
    headers.Authorization = `Bearer ${process.env.ACCESS_TOKEN}`;
  }

  try {
    console.log("Calling API:", `${baseUrl}${url}`, { params, headers });
    const response = await axios.request({
      url: `${baseUrl}${url}`,
      method: config.method ?? "GET",
      data: body ?? null,
      params,
      headers,
    } as AxiosRequestConfig);

    return response.data;
  } catch (err: any) {
    console.error("API call failed:", err.response?.data ?? err.message);
    throw err;
  }
}
