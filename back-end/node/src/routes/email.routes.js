import { Router } from "express";
import { envioCorreo } from '../controllers/email.controller.js';

const router = Router();

router.post('/envio', envioCorreo);

export default router;