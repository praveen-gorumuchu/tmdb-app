import { callAPI } from "../api/apiClient.js";
import { Request, Response, NextFunction } from "express";

export const getTrendingMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await callAPI("trendingMovieDay");
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await callAPI("users");
        res.json(data);
    } catch (err) {
        next(err);
    }
};
