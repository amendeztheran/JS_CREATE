/*Tiene todas las configuraciones de express y llama a las rutas */
import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.routes.js';
import usersRoutes from './routes/users.routes.js';
import productsRoutes from './routes/products.routes.js';
import searchRoutes from './routes/search.routes.js';
import featuredProductsRoutes from './routes/featured.routes.js';
import emailRoutes from './routes/email.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); /*Email */

/* Rutas */
app.use(indexRoutes);
app.use('/api', usersRoutes);
app.use('/api', productsRoutes);
app.use('/api', featuredProductsRoutes);
app.use('/api', searchRoutes);
app.use('/api', emailRoutes); // Email

/* Not found Route */
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

export default app;