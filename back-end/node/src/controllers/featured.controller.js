/*Api destacados */
import { pool } from "../db.js"

export const featuredProducts = async (req,res)=>{
    try {
        const [rows] = await pool.query('SELECT p.id_product,p.url,p.title, p.descrip, b.name_brand, cg.name_category, p.quantify, p.price, p.stock, JSON_OBJECTAGG(s.size, ps.quantify) AS sizes,JSON_OBJECTAGG(c.name_color, pc.quantify) AS colors FROM products p JOIN productsxsize ps ON p.id_product = ps.id_product JOIN productsxcolors pc ON p.id_product = pc.id_product JOIN sizes s ON ps.size = s.id_size JOIN colors c ON pc.color = c.id_color JOIN brand b ON p.brand_product = b.id_brand JOIN category cg ON p.category = cg.id_category JOIN orders_detail od ON od.product = p.id_product GROUP BY p.id_product, p.url, p.title, p.descrip, b.name_brand, cg.name_category, p.quantify, p.price, p.stock ORDER BY SUM(od.quantify) DESC LIMIT 5')
    res.json(rows)
    } catch (error) {
        return res.status(404).json({
            message: 'Endpoint not found'
    })
    
}};