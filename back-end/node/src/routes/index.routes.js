import {Router} from 'express'
import {controldb} from "../controllers/index.controller.js";

const router = Router()

router.get('/controldb', controldb)/*Retornar el resultado en el navegador localhost */

export default router