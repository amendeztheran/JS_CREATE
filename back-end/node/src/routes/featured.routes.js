/*Api destacados */
import { Router } from "express";

import { featuredProducts } from "../controllers/featured.controller.js";

const router = Router();


router.get('/destacados',featuredProducts)
export default router;