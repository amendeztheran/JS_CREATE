import { Router } from "express";
import { getSearchProducts } from "../controllers/search.controller.js";

const router = Router ()

/*Productos */
router.get('/search/:title', getSearchProducts)

export default router