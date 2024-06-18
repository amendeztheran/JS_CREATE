import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import { envioCorreo } from "./email.controller.js";

/*Productos*/
export const getProducts = async (req, res) => /*res.send ('obteniendo clientes')*/ {
    try {
        const [rows] = await pool.query('SELECT id_product, title,descrip,name_brand,name_category,name_color,quantify,price,url FROM products INNER JOIN  brand ON products.brand_product = brand.id_brand INNER JOIN category ON products.category = category.id_category INNER JOIN colors ON products.color = colors.id_color WHERE quantify>0')
        res.json(rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something goes wrong'
        })

    }
}

/*______________________________________________________________*/
export const getProductsId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT*FROM products WHERE id_product=?', [req.params.id])
        console.log(rows)

        if (rows.length <= 0) return res.status(404).json({
            message: 'Product not found'
        })
        res.json(rows[0])/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createProducts = async (req, res) => {
    try {
        const { id_product, title, descrip, brand_product, color, quantify, price, stock, category, size, url } = req.body

        const [rows] = await pool.query('INSERT INTO products(id_product, title, descrip, brand_product, color, quantify, price, stock, category, size, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id_product, title, descrip, brand_product, color, quantify, price, stock, category, size, url])

        res.send({
            id: rows.insertId,
            id_product,
            title,
            descrip,
            brand_product,
            color, quantify,
            price,
            stock,
            category,
            size,
            url
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const deleteProducts = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id_product = ?', [req.params.id])
        console.log(result);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            message: 'Product deleted'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const updateProducts = async (req, res) => {
    try {
        /*Actualizar datos */
        const { id } = req.params
        const { title, descrip, brand_product, color, quantify, price, stock, category, size } = req.body

        const [result] = await pool.query('UPDATE products SET title = IFNULL(?, title), descrip = IFNULL(?, descrip), brand_product = IFNULL(?, brand_product), color = IFNULL(?, color), quantify = IFNULL(?, quantify), price = IFNULL(?, price), stock = IFNULL(?, stock), category = IFNULL(?, category), size = IFNULL(?, size) WHERE id_product= ?', [title, descrip, brand_product, color, quantify, price, stock, category, size, id])

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: ('Product not found')
        })

        /*Ver los datos actualizados */
        const [rows] = await pool.query('SELECT * FROM products WHERE id_product = ?', [id])/*Va a pasar el id actualizado */
        res.json(rows[0])/*[0] para quitar el arreglo y solo obtener el objeto con la información */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}

/*___________________________________________________________ */










/*Marcas */
export const getBrand = async (req, res) => /*res.send ('obteniendo clientes')*/ {
    try {
        const [rows] = await pool.query('SELECT*FROM brand')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({/*Si ocurre un error devolver status.(500) que es un conflicto con el servidor pero puede seguir ejecutandose*/
            message: 'Something goes wrong'
        })

    }
}

/*______________________________________________________________*/
export const getBrandId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT*FROM brand WHERE id_brand=?', [req.params.id])
        console.log(rows)

        if (rows.length <= 0) return res.status(404).json({
            message: 'brand not found'
        })
        res.json(rows[0])/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const createBrand = async (req, res) => {
    try {
        const { id_brand, name_brand, description } = req.body

        const [rows] = await pool.query('INSERT INTO brand(id_brand, name_brand, description) VALUES (?, ?, ?)', [id_brand, name_brand, description])

        res.send({
            id: rows.insertId,
            id_brand,
            name_brand,
            description
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const deleteBrand = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM brand WHERE id_brand = ?', [req.params.id])
        console.log(result);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Brand not found'
        })
        res.send('Brand deleted')
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const updateBrand = async (req, res) => {
    try {
        /*Actualizar datos */
        const { id } = req.params
        const { name_brand, description } = req.body

        const [result] = await pool.query('UPDATE brand SET name_brand = IFNULL(?, name_brand), description = IFNULL(?, description) WHERE id_brand = ?', [name_brand, description, id])

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: ('brand not found')
        })

        /*Ver los datos actualizados */
        const [rows] = await pool.query('SELECT * FROM brand WHERE id_brand = ?', [id])/*Va a pasar el id actualizado */
        res.json(rows[0])/*[0] para quitar el arreglo y solo obtener el objeto con la información */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}



/*Categoria*/
export const getCategory = async (req, res) => /*res.send ('obteniendo clientes')*/ {
    try {
        const [rows] = await pool.query('select name_category from category;')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({/*Si ocurre un error devolver status.(500) que es un conflicto con el servidor pero puede seguir ejecutandose*/
            message: 'Something goes wrong'
        })

    }
}

/*______________________________________________________________*/

export const getProductsByCategoryAndBrand = async (req, res) => {
    try {
        const category = req.params.category;
        const [rows] = await pool.query("SELECT p.id_product,p.title,p.url, p.descrip,b.name_brand,cg.name_category,p.quantify,p.price,p.stock,JSON_OBJECTAGG(s.size, ps.quantify) AS sizes,JSON_OBJECTAGG(c.name_color, pc.quantify) AS colors FROM products p JOIN productsxsize ps ON p.id_product = ps.id_product JOIN productsxcolors pc ON p.id_product = pc.id_product JOIN sizes s ON ps.size = s.id_size JOIN  colors c ON pc.color = c.id_color JOIN brand b ON p.brand_product = b.id_brand JOIN category cg ON p.category = cg.id_category WHERE (name_category =? OR name_category = 'unisex') AND p.quantify>0  GROUP BY p.id_product, p.title, p.color;", [category])
        console.log(rows)

        if (rows.length <= 0) return res.status(404).json({
            message: 'category not found'
        })
        res.json(rows)/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

// ------------------------------------------------------------------------------------------------------

export const getProductsWithColorsandSizes = async (req, res) => {
    try {
        const id = req.params.id
        const [rows] = await pool.query("SELECT p.id_product,p.title, p.descrip,p.url,b.name_brand,cg.name_category,p.quantify,p.price,p.stock,JSON_OBJECTAGG(s.size, ps.quantify) AS sizes,JSON_OBJECTAGG(c.name_color, pc.quantify) AS colors FROM products p JOIN productsxsize ps ON p.id_product = ps.id_product JOIN productsxcolors pc ON p.id_product = pc.id_product JOIN sizes s ON ps.size = s.id_size JOIN  colors c ON pc.color = c.id_color JOIN brand b ON p.brand_product = b.id_brand JOIN category cg ON p.category = cg.id_category WHERE p.id_product = ? GROUP BY p.id_product, p.title, p.color;", [id])

        if (rows.length <= 0) return res.status(404).json({
            message: 'category not found'
        })
        res.json(rows)/*Para observar en el navegador localhost */
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const getCategoryId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT*FROM category WHERE id_category=?', [req.params.id])
        console.log(rows)

        if (rows.length <= 0) return res.status(404).json({
            message: 'category not found'
        })
        res.json(rows[0])/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const createCategory = async (req, res) => {
    try {
        const { id_category, name_category } = req.body

        const [rows] = await pool.query('INSERT INTO category(id_category, name_category) VALUES (?, ?)', [id_category, name_category])

        res.send({
            id: rows.insertId,
            id_category,
            name_category
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const deleteCategory = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM category WHERE id_category = ?', [req.params.id])
        console.log(result);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Category not found'
        })
        res.send('Category deleted')
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const updateCategory = async (req, res) => {
    try {
        /*Actualizar datos */
        const { id } = req.params
        const { name_category } = req.body

        const [result] = await pool.query('UPDATE category SET name_category = IFNULL(?, name_category) WHERE id_category = ?', [name_category, id])

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: ('category not found')
        })

        /*Ver los datos actualizados */
        const [rows] = await pool.query('SELECT * FROM category WHERE id_category = ?', [id])/*Va a pasar el id actualizado */
        res.json(rows[0])/*[0] para quitar el arreglo y solo obtener el objeto con la información */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}


/*Colores*/
export const getColors = async (req, res) => /*res.send ('obteniendo clientes')*/ {
    try {
        const [rows] = await pool.query('SELECT*FROM colors')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({/*Si ocurre un error devolver status.(500) que es un conflicto con el servidor pero puede seguir ejecutandose*/
            message: 'Something goes wrong'
        })

    }
}

/*______________________________________________________________*/
export const getColorsId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT*FROM colors WHERE id_color=?', [req.params.id])
        console.log(rows)

        if (rows.length <= 0) return res.status(404).json({
            message: 'color not found'
        })
        res.json(rows[0])/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const createColors = async (req, res) => {
    try {
        const { id_color, name_color } = req.body

        const [rows] = await pool.query('INSERT INTO colors(id_color, name_color) VALUES (?, ?)', [id_color, name_color])

        res.send({
            id: rows.insertId,
            id_color,
            name_color
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const deleteColors = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM colors WHERE id_color = ?', [req.params.id])
        console.log(result);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Color not found'
        })
        res.send('Color deleted')
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const updateColors = async (req, res) => {
    try {
        /*Actualizar datos */
        const { id } = req.params
        const { name_color } = req.body

        const [result] = await pool.query('UPDATE colors SET name_color = IFNULL(?, name_color) WHERE id_color = ?', [name_color, id])

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: ('color not found')
        })

        /*Ver los datos actualizados */
        const [rows] = await pool.query('SELECT * FROM colors WHERE id_color = ?', [id])/*Va a pasar el id actualizado */
        res.json(rows[0])/*[0] para quitar el arreglo y solo obtener el objeto con la información */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}


/*Tallas*/
export const getSizes = async (req, res) => /*res.send ('obteniendo clientes')*/ {
    try {
        const [rows] = await pool.query('SELECT*FROM sizes')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })

    }
}

/*______________________________________________________________*/
export const getSizesId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT*FROM sizes WHERE id_size=?', [req.params.id])
        console.log(rows)

        if (rows.length <= 0) return res.status(404).json({
            message: 'size not found'
        })
        res.json(rows[0])/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


/*______________________________________________________________*/
export const createSizes = async (req, res) => {
    try {
        const { id_size, size } = req.body

        const [rows] = await pool.query('INSERT INTO sizes(id_size, size) VALUES (?, ?)', [id_size, size])

        res.send({
            id: rows.insertId,
            id_size,
            size
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const deleteSizes = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM sizes WHERE id_size = ?', [req.params.id])
        console.log(result);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Size not found'
        })
        res.send('Size deleted')
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const updateSizes = async (req, res) => {
    try {
        /*Actualizar datos */
        const { id } = req.params
        const { size } = req.body

        const [result] = await pool.query('UPDATE sizes SET size = IFNULL(?, size) WHERE id_size= ?', [size, id])

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: ('size not found')
        })

        /*Ver los datos actualizados */
        const [rows] = await pool.query('SELECT * FROM sizes WHERE id_size = ?', [id])/*Va a pasar el id actualizado */
        res.json(rows[0])/*[0] para quitar el arreglo y solo obtener el objeto con la información */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}



/*Talla de los productos*/
export const getProductsxsize = async (req, res) => /*res.send ('obteniendo clientes')*/ {
    try {
        const [rows] = await pool.query('SELECT*FROM productsxsize')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: ''
        })

    }
}

/*______________________________________________________________*/
export const getProductsxsizeId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT*FROM productsxsize WHERE id_product=?', [req.params.id])
        console.log(rows)

        if (rows.length <= 0) return res.status(404).json({
            message: 'productsxsize not found'
        })
        res.json(rows[0])/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const createProductsxsize = async (req, res) => {
    try {
        const { id_product, size, quantify } = req.body

        const [rows] = await pool.query('INSERT INTO productsxsize (id_product, size, quantify) VALUES (?, ?, ?)', [id_product, size, quantify])

        res.send({
            id: rows.insertId,
            id_product,
            size,
            quantify
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const deleteProductsxsize = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM productsxsize WHERE id_product = ?', [req.params.id])
        console.log(result);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'productsxsize not found'
        })
        res.send('productsxsize deleted')
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const updateProductsxsize = async (req, res) => {
    try {
        /*Actualizar datos */
        const { id } = req.params
        const { size, quantify } = req.body

        const [result] = await pool.query('UPDATE productsxsize SET size = IFNULL(?, size), quantify = IFNULL(?, quantify) WHERE id_product= ?', [size, quantify, id])

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: ('productsxsize not found')
        })

        /*Ver los datos actualizados */
        const [rows] = await pool.query('SELECT * FROM productsxsize WHERE id_product = ?', [id])/*Va a pasar el id actualizado */
        res.json(rows[0])/*[0] para quitar el arreglo y solo obtener el objeto con la información */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}



/*Colores de los productos*/
export const getProductsxcolors = async (req, res) => /*res.send ('obteniendo clientes')*/ {
    try {
        const [rows] = await pool.query('SELECT*FROM productsxcolors')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })

    }
}

export const getProductsxcolorsId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT*FROM productsxcolors WHERE id_product=?', [req.params.id])
        console.log(rows)

        if (rows.length <= 0) return res.status(404).json({
            message: 'productsxcolors not found'
        })
        res.json(rows[0])/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const createProductsxcolors = async (req, res) => {
    try {
        const { id_product, color, quantify } = req.body

        const [rows] = await pool.query('INSERT INTO productsxcolors (id_product, color, quantify) VALUES (?, ?, ?)', [id_product, color, quantify])

        res.send({
            id: rows.insertId,
            id_product,
            color,
            quantify
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const deleteProductsxcolors = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM productsxcolors WHERE id_product = ?', [req.params.id])
        console.log(result);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'productsxcolors not found'
        })
        res.send('productsxcolors deleted')
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const updateProductsxcolors = async (req, res) => {
    try {
        /*Actualizar datos */
        const { id } = req.params
        const { color, quantify } = req.body

        const [result] = await pool.query('UPDATE productsxcolors SET color = IFNULL(?, color), quantify = IFNULL(?, quantify) WHERE id_product= ?', [color, quantify, id])

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: ('productsxcolors not found')
        })

        /*Ver los datos actualizados */
        const [rows] = await pool.query('SELECT * FROM productsxcolors WHERE id_product = ?', [id])/*Va a pasar el id actualizado */
        res.json(rows[0])/*[0] para quitar el arreglo y solo obtener el objeto con la información */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}




/*Fecha de orden*/
export const getOrderHeader = async (req, res) => /*res.send ('obteniendo clientes')*/ {
    try {
        const [rows] = await pool.query('SELECT*FROM order_header')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })

    }
}

/*______________________________________________________________*/
export const getOrderHeaderId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT*FROM order_header WHERE id_order=?', [req.params.id])
        console.log(rows)

        if (rows.length <= 0) return res.status(404).json({
            message: 'Order header not found'
        })
        res.json(rows[0])/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
//_____________________________________________________________
const getProductsDetails = async (orderDetails) => {
    try {
        let productsDetails = [];
        for (const item of orderDetails) {
            const [product] = await pool.query('SELECT p.title, p.descrip, p.price, p.url, od.quantify, od.date_, od.total FROM products p INNER JOIN orders_detail od ON p.id_product = od.product WHERE p.id_product = ? ORDER BY date_ desc', [item.product]);
            if (product.length > 0) {
                productsDetails.push({
                    ...product[0]
                });
            }
        }
        return productsDetails;

    } catch (error) {
        console.log('error al buscar detalles', error);
    }
}

const getUserInfoFromToken = async (token) => {
    try {
        const jwtSignature = "createShop";
        const decoded = jwt.verify(token, jwtSignature);
        const usuario = String(decoded.usuario);
        const [rows] = await pool.query('SELECT id_user,name, email FROM users WHERE email=? LIMIT 1', [usuario])
        if (rows.length > 0) {
            return rows[0];
        } else {
            return { success: false, message: 'Usuario no encontrado.' };
        };
    } catch (error) {
        console.log(error);
    }
};

/*______________________________________________________________*/
export const createOrderHeader = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const user = await getUserInfoFromToken(token);
        const [insertOrderHeader] = await pool.query('INSERT INTO order_header (date_order, customer) VALUES (NOW(), ?)', [user.id_user]);
        const orderHeaderId = insertOrderHeader.insertId;
        const orderDetails = req.body.orderData;
        const userAddress = req.body.address;
        for (const item of orderDetails) {
            const query = await pool.query('INSERT INTO orders_detail (date_,order_, product, quantify, total) VALUES (NOW(), ?, ?, ?, ?)', [orderHeaderId, item.product, item.quantify, item.total]);
            console.log(query);
            await pool.query('UPDATE products p SET p.quantify = p.quantify - ? WHERE p.id_product = ?', [item.quantify, item.product]);
        };
        //ACA SE DEBE HACER EL LLAMADO AL CORREO ELECTRONICO
        const productsDetails = await getProductsDetails(orderDetails);
        envioCorreo(user, userAddress, productsDetails);
        res.send({
            id_order: orderHeaderId,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
}

/*______________________________________________________________*/
export const deleteOrderHeader = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM order_header  WHERE id_order = ?', [req.params.id])
        console.log(result);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Order header not found'
        })
        res.send('Order header deleted')
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const updateOrderHeader = async (req, res) => {
    try {
        /*Actualizar datos */
        const { id } = req.params
        const { date_order, customer } = req.body

        const [result] = await pool.query('UPDATE order_header SET date_order = IFNULL(?, date_order), customer = IFNULL(?, customer) WHERE id_order= ?', [date_order, customer, id])

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: ('Order header not found')
        })

        /*Ver los datos actualizados */
        const [rows] = await pool.query('SELECT * FROM order_header WHERE id_order = ?', [id])/*Va a pasar el id actualizado */
        res.json(rows[0])/*[0] para quitar el arreglo y solo obtener el objeto con la información */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}




/*Detalle de la orden del cliente*/
export const getOrdersDetail = async (req, res) => /*res.send ('obteniendo clientes')*/ {
    try {
        const [rows] = await pool.query('SELECT*FROM orders_detail')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })

    }
}

/*______________________________________________________________*/
export const getOrdersDetailId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT*FROM orders_detail WHERE id_detail=?', [req.params.id])
        console.log(rows)

        if (rows.length <= 0) return res.status(404).json({
            message: 'Order detail not found'
        })
        res.json(rows[0])/*Para observar en el navegador localhost */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const createOrdersDetail = async (req, res) => {
    try {
        console.log(req.body);
        const { date_, order_, product, quantify, total } = req.body;
        const [rows] = await pool.query('INSERT INTO orders_detail (date_,order_, product, quantify, total) VALUES (NOW(), ?, ?, ?, ?)', [order_, product, quantify, total])
        res.send({
            id_detail: rows.insertId,
            date_,
            order_,
            product,
            quantify,
            total
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const deleteOrdersDetail = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM orders_detail  WHERE id_detail = ?', [req.params.id])
        console.log(result);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Order detail not found'
        })
        res.send('Order detail deleted')
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

/*______________________________________________________________*/
export const updateOrdersDetail = async (req, res) => {
    try {
        /*Actualizar datos */
        const { id } = req.params
        const { date, order, product, quantify, total } = req.body

        const [result] = await pool.query('UPDATE orders_detail SET date= IFNULL(?, date), order = IFNULL(?, order), product = IFNULL(?, product), quantify = IFNULL(?, quantify), total = IFNULL(?, total) WHERE id_detail= ?', [date, order, product, quantify, total, id])

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: ('Order detail not found')
        })

        /*Ver los datos actualizados */
        const [rows] = await pool.query('SELECT * FROM orders_detail WHERE id_detail = ?', [id])/*Va a pasar el id actualizado */
        res.json(rows[0])/*[0] para quitar el arreglo y solo obtener el objeto con la información */
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}