/* Arranca todo el programa, llama a la app, se inicializa el servidor localhost */
import app from './app.js'

import {PORT,enviroment,DB_USER} from './config.js'


app.listen(PORT)
    if (enviroment === "development"){
        //POR FAVOR NO ELIMINAR BD_USER
        console.log('LOCAL SERVER\n  Corriendo el servidor http://localhost:3001/', PORT,DB_USER)
    }else{
        console.log('PRODUCTION AZURE\n  Corriendo el servidor  http://localhost:3001/', PORT,DB_USER)
}
