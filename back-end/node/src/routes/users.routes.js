/*Agrupar todas las rutas*/
import {Router} from "express";
import {getUsers,createUsers, updateUsers, deleteUsers, getUsersId,getUsersLogin} from '../controllers/users.controller.js';
import {getRoles, getRolesId, createRoles, deleteRoles, updateRoles } from '../controllers/users.controller.js';

const router = Router()
/*_________________________________ */
/*Roles */
router.get('/roles', getRoles)
router.get('/roles/:id', getRolesId)
router.post('/roles', createRoles)
router.delete('/roles/:id' , deleteRoles)
router.patch('/roles/:id' , updateRoles)



/*_________________________________ */
/* Users */
/*Endpoints para consultar desde aplicaciones clientes*/
router.get('/users' , getUsers)//Leer todos los clientes
router.get('/users/:id' , getUsersId)//Leer clientes
router.post('/auth/register' ,createUsers)//Crear clientes
router.post('/auth/login' ,getUsersLogin)//Consultar login
router.delete('/users/:id' , deleteUsers)//Eliminar clientes
router.patch('/users/:id' , updateUsers)//Actualizar clientes






export default router