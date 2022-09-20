import { dev } from './../args/args.js';
import path from 'path';
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import mongoose from "mongoose"

if (dev){
    const __dirname = process.cwd();
    dotenv.config({
        path: path.resolve(__dirname, 'configs/config.env')
    })
}

export const mongoUrl = "mongodb+srv://Alejandro:otero@coderhouse.av1btb7.mongodb.net/test";
export const mongoOptions = {"useNewUrlParser":true,"useUnifiedTopology":true};
export const adminMail = process.env.ADMINMAIL;
export const mailSender = process.env.MAILSENDER;
export const mailSenderPass = process.env.MAILSENDERPASS;
export const mailReceiver = process.env.MAILRECEIVER;
export const ownWeb = process.env.OWNWEB;
export const accountSid = 'AC55a59221acb23a5aa6f046740bb73317';
export const authToken = '270ff32fe16828869dc30e0c6926fa9e';
export const twilioNumber = process.env.TWILIONUMBER;
export const whatsappReceiver = process.env.WHATSAPPRECEIVER;

export const mongoStore = {
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Alejandro:otero@coderhouse.av1btb7.mongodb.net/test',
        mongoOptions: {"useNewUrlParser":true,"useUnifiedTopology":true},
    }),
    secret: "shhhhhhhhhhhhhhhhhhhh",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000,
    },
};

export const mongooseConfig = {
    collections: {
        users: {
            name: "users",
            schema: {
                email: { type: String, required: true },
                password: { type: String, required: true },
                name: { type: String, required: true },
                lastname: { type: String, required: true },
                address: { type: String, required: true },
                age: { type: Number, required: true },
                phone: { type: String, required: true },
                image: { type: String },
                avatar: { type: String }
            }
        },
        products: {
            name: "products",
            schema: {
                name: { type: String, require: true },
                price: { type: Number, require: true },
                image: { type: String, require: true },
                description: { type: String, require: true },
                stock: { type: Number, require: true }
            }
        },
        carts: {
            name: "carts",
            schema: {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
                products: {
                    type: [{
                            productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
                            quantity: { type: Number }
                    }],
                    default: [],
                }
            }
        },
        orders: {
            name: "orders",
            schema: {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
                products: {
                    type: [{
                            productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
                            quantity: { type: Number }
                    }],
                    default: []
                },
                total: { type: Number, default: 0 },
                accepted: { type: Boolean, default: false }
            }
        }
    }
}

