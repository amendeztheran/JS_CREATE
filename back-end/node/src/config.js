import {config} from "dotenv";
//------------------------------------------------------------------------
// validación de que entorno nos encontramos
export const enviroment = process.env.NODE_ENV
//------------------------------------------------------------------------
let envFile;
// Aquí, se verifica el valor de NODE_ENV en process.env.

// Si NODE_ENV es igual a 'development', se asigna el archivo .env.development a envFile
if (enviroment=== 'development') {
    envFile = '.env.development';
} else {
    //  de lo contrario, se asigna .env.production.
    envFile = '.env.production';
};

config({ path: envFile });
// Se utiliza la función config para cargar las variables de 
//entorno desde el archivo especificado en envFile.

//NO ACTIVAR LOS VALORES POR DEFECTO A MENOS QUE OCURRA UN ERROR DE
//TIPO  undefined AL MOMENTO DE EJECUTAR "npm run dev"  EN LA PARTE DE 
//DB_USER
export const PORT = process.env.PORT || 3001/*PORT: Es el servidor */
export const DB_USER = process.env.USER_DB //|| 'root'
export const DB_HOST = process.env.HOST_DB //|| 'localhost'
export const DB_DATABASE = process.env.DATABASE_DB //|| 'compras_create'
export const DB_PORT = process.env.PORT_DB //|| 3306/*Puerto de la base de datos */
export const DB_PASSWORD = process.env.PASSWORD_DB //|| ''/*Puerto de la base de datos */

//host: 'localhost',
//user: 'root',
//password: "root",
//port: 3306,
//database: 'compras_create'