import {pool} from '../db.js';

export const controldb = async (req, res) => {/*Consulta a MySql*/
    const [result] = await pool.query('SELECT 1 + 1 As result')
    res.json(result[0])/*Retornar el resultado en el navegador localhost */
}