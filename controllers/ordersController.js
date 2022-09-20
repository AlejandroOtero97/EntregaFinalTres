import { carts, orders, mail, message } from './../daos/index.js';
import { mailReceiver, twilioNumber, whatsappReceiver } from './../configs/config.js';


export const generateOrder = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const cart = await carts.getProductsFromCart(userId);
        if(!cart) { throw new Error('Carrito no encontrado!'); }
        const products = [];
        let total = 0;
        cart.forEach(product => {
            products.push({ productId: product._id, quantity: product.quantity });
            total += product.quantity * product.price; });
        const order = { userId: userId, products: products, total: total, accepted: false }
        await orders.save(order);
        await carts.deleteProductsFromCart(userId);
        res.status(200).json({ message: 'Orden generada!' });
    } catch (error) {
        next(error);
    }
}

export const getOrder = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const order = await orders.getOrderByUserId(userId);
        if(!order) { throw new Error('Oreden no encontrada!'); }
        res.status(200).send(order);
    } catch (error) {
        next(error);
    }
}

export const acceptOrder = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const order = await orders.acceptOrder(userId);
        if(!order) { throw new Error('Orden no encontrada!'); }
        mail.sendMailInAccept(order.userId, order.products, order.total, mailReceiver);
        message.sendWhatsappAcceptingOrder(whatsappReceiver, twilioNumber, order);
        message.sendWhatsapp(order.userId.phone, twilioNumber, "Orden aceptada!");
        res.status(200).send(order);
    } catch (error) {
        next(error);
    }
}