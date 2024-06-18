import {pool} from "../db.js"

 export const getSearchProducts = async (req, res) => {
    try {
        
        //Search, RegExpor, busca en una cadena de texto la palabra que se relacioné a encontrar.
        //let name = new RegExp(`.*${req.query.title || ''}.*`)/*de la petición que se hace (req) busque en la url (query) peticiones que se realizan desde la url, buscar el parametro searchBy. */
        //buscar en database
        const title = req.params.title
        const [rows] = await pool.query('SELECT*FROM products WHERE title LIKE ?', [`%${title}%`])
        console.log(rows)
    
        if (rows.length <=0) return res.status(404).json({
            message: 'Product not found'
        })
        res.json(rows)/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}