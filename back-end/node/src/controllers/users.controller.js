import {pool} from "../db.js"
//import encrypt from "../utils/bcrypt.js";
import {encrypt,compareEncript} from "../utils/bcrypt.js";
import generateToken from "../utils/token.js";

/*Roles */
export const getRoles = async (req, res) => /*res.send ('obteniendo clientes')*/{
    try {
        const [rows] = await pool.query('SELECT * FROM roles')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({/*Si ocurre un error devolver status.(500) que es un conflicto con el servidor pero puede seguir ejecutandose*/
            message: 'Something goes wrong'
        })
        
    }
 }

 /*______________________________________________________________*/
 export const getRolesId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM roles WHERE id_role=?', [req.params.id])
        console.log(rows)

        if (rows.length <=0) return res.status(404).json({
            message: 'user not found'
        })
        res.json(rows[0])/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}



 /*______________________________________________________________*/
 export const createRoles = async (req, res) => { 
    try {
        const {id_role, nombre_roll} = req.body 

        const [rows] = await pool.query('INSERT INTO roles(id_role, nombre_roll) VALUES (?, ?)', [id_role, nombre_roll])
        
        res.send({
            id:rows.insertId,
            id_role,
            nombre_roll
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
/*______________________________________________________________*/
export const deleteRoles = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM roles WHERE id_role = ?', [req.params.id])
        console.log(result);
    
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Role not found'
        })
            res.send('Role deleted')
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const updateRoles = async (req, res) => {
    try {
        /*Actualizar datos */
        const {id} = req.params
        const {nombre_roll} = req.body 
        
        const [result] = await pool.query('UPDATE roles SET nombre_roll = IFNULL(?, nombre_roll) WHERE id_role = ?', [nombre_roll, id])

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message:('user not found')
        })

        /*Ver los datos actualizados */
        const [rows] = await pool.query('SELECT * FROM roles WHERE id_role = ?', [id])/*Va a pasar el id actualizado */
        res.json(rows[0])/*[0] para quitar el arreglo y solo obtener el objeto con la información */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}


/*Users*/
/*______________________________________________________________*/

export const getUsers = async (req, res) => /*res.send ('obteniendo clientes')*/{
    try {
        console.log(req.headers.authorization);
     const [rows] = await pool.query('SELECT*FROM users')
     res.json(rows)
    } catch (error) {
     return res.status(500).json({
         message: 'Something goes wrong'
     })
    }
 }

/*Login */
 export const getUsersLogin = async (req, res) => {
    try {
        console.log(req.body);
        let { email, password } = req.body.user;

        const [rows] = await pool.query('SELECT * FROM users WHERE email=?  LIMIT 1', [email]);

        // Agrega console logs para depurar
        console.log("Contraseña proporcionada:", password);
        console.log("Hash almacenado en la base de datos:", rows[0].password);
        console.log("respuesta BD:", rows);

        try {
            const passwordMatches = await compareEncript(password, rows[0].password);

            if (passwordMatches) {
                console.log("Contraseña correcta");

                const token = generateToken(rows[0].email, rows[0].id_role);
                console.log("Token generado:", token);

                res.status(202).json({ "user": rows[0], "token": token });
            } else {
                // Contraseña incorrecta
                console.log("Contraseña incorrecta");
                res.status(403).json({
                    message: 'Incorrect password'
                });
            }
        } catch (error) {
            console.error("Error comparando contraseñas:", error);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(503).json({
            message: 'Something goes wrong',
            technicalMessage: error
        });
    }
};



/*______________________________________________________________*/
export const getUsersId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT*FROM users WHERE id_user=?', [req.params.id])
        console.log(rows)

        if (rows.length <=0) return res.status(404).json({
            message: 'user not found'
        })
        res.json(rows[0])/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
/*Register */
export const createUsers = async (req, res) => { 
    
    try {
        console.log(req.body)    /*Ver los datos que el cliente envía al realizar la petición*/
        let {id_user, type_doc, doc_number, name, last_name, email, password, id_role} = req.body.user /*Extraer los datos para pasarlo a la consulta INSERT INTO */
        const passHash = await encrypt(password); /*Encriptar password */
        password=passHash; /* */
        const [rows] = await pool.query('INSERT INTO users(id_user, type_doc, doc_number, name, last_name, email, password, id_role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id_user, type_doc, doc_number, name, last_name, email, password, id_role])/*Biblioteca: (?, ?) Se buscaran en el orden de las ?, se realizará una consullta en orden. Const rows se guarda la respuesta. */
        res.status(201).send({/*Al recibir la respuesta se crea un insertId, se coloca el id:rows.insertId para que se muestre el id auto-incrementado y name, salary para toda la información.*/ 
            id:rows.insertId,
            id_user,
            type_doc, 
            doc_number, 
            name, 
            last_name, 
            email, 
            password, 
            id_role
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


/*______________________________________________________________*/
export const deleteUsers = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id_user = ?', [req.params.id])
        console.log(result);
    
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'User not found'
        })
            res.send('User deleted')
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const updateUsers = async (req, res) => {
    try {
        /*Actualizar datos */
        const {id} = req.params
        const {type_doc , doc_number, name, last_name, email, password, id_role} = req.body 
        
        const [result] = await pool.query('UPDATE users SET type_doc = IFNULL(?, type_doc), doc_number = IFNULL(?, doc_number), name = IFNULL(?, name), last_name = IFNULL(?, last_name), email = IFNULL(?, email), password = IFNULL(?, password),id_role = IFNULL(?, id_role) WHERE id_user = ?', [type_doc , doc_number, name, last_name, email, password, id_role, id])

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message:('user not found')
        })

        /*Ver los datos actualizados */
        const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ?', [id])/*Va a pasar el id actualizado */
        res.json(rows[0])/*[0] para quitar el arreglo y solo obtener el objeto con la información */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}