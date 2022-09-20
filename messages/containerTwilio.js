import twilio from 'twilio';
import logger from '../logger.js';

class containerTwilio {
  constructor(accountSid, authToken) {
    this.client = twilio(accountSid, authToken);
  }
  async sendWhatsapp(to, from, body) {
    try {
        return await this.client.messages.create({
            from,
            to,
            body
        });
    } catch (error) {
        logger.error(`Error al Enviar: ${error.message}`);
        throw new Error(`Error al Enviar: ${error.message}`)
    }
  }
  async sendWhatsappAcceptingOrder(to, from, order) {
    try{
      let body = `Nuevo pedido de ${order.userId.name} ${order.userId.lastname}\n`
      body += `Nombre: ${order.userId.name}\n`
      body += `Apellido: ${order.userId.lastname}\n`
      body += `Mail: ${order.userId.email}\n`
      body += `Numero: ${order.userId.phone}\n`
      body += `Edad: ${order.userId.age}\n`
      body += `Direccion: ${order.userId.address}\n`
      body += `Productos: \n`
      order.products.forEach(product => {
        body += `\n`;
        body += `Producto: ${product.name}\n`;
        body += `Precio: ${product.price}\n`;
        body += `Cantidad: ${product.quantity}\n`;
        body += `Descripcion: ${product.description}\n`;
        body += `\n`;
      })
      body += `Total: ${order.total}\n`;
      return await this.sendWhatsapp(to, from, body);
    } catch (error) {
      logger.error(`Error al Enviar: ${error.message}`);
      throw new Error(`Error al Enviar: ${error.message}`)
    }
  }
}

export default containerTwilio;