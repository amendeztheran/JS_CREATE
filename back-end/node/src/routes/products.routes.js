import {Router} from "express"
import {getBrand, getBrandId, createBrand, deleteBrand, updateBrand, getProductsByCategoryAndBrand, getProductsWithColorsandSizes} from '../controllers/products.controllers.js'
import {getCategory, getCategoryId, createCategory, deleteCategory, updateCategory} from '../controllers/products.controllers.js'
import {getColors, getColorsId, createColors, deleteColors, updateColors} from '../controllers/products.controllers.js'
import {getSizes, getSizesId, createSizes, deleteSizes, updateSizes} from '../controllers/products.controllers.js'
import {getProducts, getProductsId, createProducts, deleteProducts, updateProducts} from '../controllers/products.controllers.js'
import {getProductsxsize, getProductsxsizeId, createProductsxsize, deleteProductsxsize, updateProductsxsize} from '../controllers/products.controllers.js'
import {getProductsxcolors, getProductsxcolorsId, createProductsxcolors, deleteProductsxcolors, updateProductsxcolors} from '../controllers/products.controllers.js'
import {getOrderHeader, getOrderHeaderId, createOrderHeader, deleteOrderHeader, updateOrderHeader} from '../controllers/products.controllers.js'
import {getOrdersDetail, getOrdersDetailId, createOrdersDetail, deleteOrdersDetail, updateOrdersDetail} from '../controllers/products.controllers.js'


const router = Router()

/*Productos */
router.get('/products', getProducts)
router.get('/products/:id', getProductsId)
router.post('/products', createProducts)
router.delete('/products/:id' , deleteProducts)
router.patch('/products/:id' , updateProducts)


/*Marcas*/
router.get('/brand', getBrand)
router.get('/brand/:id', getBrandId)
router.post('/brand', createBrand)
router.delete('/brand/:id' , deleteBrand)
router.patch('/brand/:id' , updateBrand)


/*Categoria*/
router.get('/category/:category',getProductsByCategoryAndBrand)
router.get('/productbyid/:id',getProductsWithColorsandSizes)
router.get('/category', getCategory)
router.get('/category/:id', getCategoryId)
router.post('/category', createCategory)
router.delete('/category/:id' , deleteCategory)
router.patch('/category/:id' , updateCategory)



/*Colores*/
router.get('/colors', getColors)
router.get('/colors/:id', getColorsId)
router.post('/colors', createColors)
router.delete('/colors/:id' , deleteColors)
router.patch('/colors/:id' , updateColors)


/*Tallas */
router.get('/sizes', getSizes)
router.get('/sizes/:id', getSizesId)
router.post('/sizes', createSizes)
router.delete('/sizes/:id' , deleteSizes)
router.patch('/sizes/:id' , updateSizes)


/*Talla de los productos */
router.get('/productsxsize', getProductsxsize)
router.get('/productsxsize/:id', getProductsxsizeId)
router.post('/productsxsize', createProductsxsize)
router.delete('/productsxsize/:id' , deleteProductsxsize)
router.patch('/productsxsize/:id' , updateProductsxsize)


/*Colores de los productos */
router.get('/productsxcolors', getProductsxcolors)
router.get('/productsxcolors/:id', getProductsxcolorsId)
router.post('/productsxcolors', createProductsxcolors)
router.delete('/productsxcolors/:id' , deleteProductsxcolors)
router.patch('/productsxcolors/:id' , updateProductsxcolors)


/*Fecha de orden */
router.get('/orderheader', getOrderHeader)
router.get('/orderheader/:id', getOrderHeaderId)
router.post('/orderheader', createOrderHeader)
router.delete('/orderheader/:id' , deleteOrderHeader)
router.patch('/orderheader/:id' , updateOrderHeader)


/*Detalle de la orden del cliente*/
router.get('/ordersdetail', getOrdersDetail)
router.get('/ordersdetail/:id', getOrdersDetailId)
router.post('/ordersdetail', createOrdersDetail)
router.delete('/ordersdetail/:id' , deleteOrdersDetail)
router.patch('/ordersdetail/:id' , updateOrdersDetail)


export default router