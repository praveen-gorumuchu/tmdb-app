import { Router } from "express";
import { getTrendingMovies, getUsers } from "../controllers/movie.controller.js";

const router = Router();

router.get("/trending/movie/day", getTrendingMovies);
router.get("/users", getUsers);

export default router;
