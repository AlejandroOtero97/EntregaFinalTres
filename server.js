import express from 'express';
import initializeServer from './server/initializeServer.js';
import sessionHandler from './session/session.js';

import { port } from './args/args.js';
import { passportInitialize, passportSession } from './passport/passport.js';
import { errorHandling } from './middlewares/errorHandling.js';

//Rutas Imports
import multer from './multer.js';
import { logInfo } from './middlewares/logMiddlewares.js';
import { postRegister, postLogin, getLogout, getInfo } from './controllers/userController.js';
import { auth, isAdmin } from './middlewares/authMiddlewares.js';
import { getAll, getById, postSave, putUpdate, deleteById, deleteAll } from './controllers/productsController.js';
import { generateOrder, getOrder, acceptOrder } from './controllers/ordersController.js';
import { postProductToCart, getProductsFromCart, deleteProductFromCart } from './controllers/cartsController.js';

const app = express();

app.use(express.static('./public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(sessionHandler);
app.use(passportInitialize);
app.use(passportSession);

//Rutas usuarios
app.get('/usuarios/info', logInfo, getInfo)
app.post('/usuarios/register', logInfo, multer.single('image'), postRegister);
app.post('/usuarios/login', logInfo, postLogin);
app.get('/usuarios/logout', logInfo, getLogout);

//Rutas productos
app.get('/productos/', auth, logInfo, getAll);
app.get('/productos/:id', auth, logInfo, getById);
app.post('/productos/', isAdmin, logInfo, postSave);
app.put('/productos/:id', isAdmin, logInfo, putUpdate);
app.delete('/productos/:id', isAdmin, logInfo, deleteById);
app.delete('/productos/', isAdmin, logInfo, deleteAll);

//Rutas carritos
app.post('/carritos/', auth, logInfo, postProductToCart);
app.get('/carritos/', auth, logInfo, getProductsFromCart)
app.delete('/carritos/', auth, logInfo, deleteProductFromCart);

//Rutas ordenes
app.post('/ordenes/', auth, generateOrder);
app.get('/ordenes/', auth, getOrder);
app.post('/ordenes/accept' , auth, acceptOrder);


app.use(errorHandling);

initializeServer(app, port);