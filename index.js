import express from "express";
import cors from "cors";
import winston from "winston";
import OrdersRouter from "./routes/order.route.js" 

import { promises as fs } from "fs";


const { readFile, writeFile } = fs;

global.filename = "orders.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(( { level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level} ${message}`
})

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "delivery-api-log" })
    ],
    format: combine(label({ label: "delivery-api" }), timestamp(), myFormat)
})

const app = express()
app.use(cors())
app.use(express.json())
app.use("/order", OrdersRouter)
app.listen(3000, async () => {
    try {
        await readFile(global.filename);
        logger.info("API started!");
    } catch (err) {
        const initialJson = {
            nextId: 1,
            orders: [],
        };
        writeFile(global.filename, JSON.stringify(initialJson))
            .then(() => {
                logger.info("API Started and file created!");
            })
            .catch((err) => {
                logger.error(err);
            });
    }
});

// app.listen(3000, async () => {
//     try {
//         await readFile(global.filename);
//         logger.info("API started!");
//     } catch (err) {
//         const initialJson = {
//             nextId: 1,
//             orders: [],
//         };
//         writeFile(global.filename, JSON.stringify(initialJson))
//         .then(() => {
//             logger.info("API Started and file created!")
//         })
//         .catch ((err) => {
//             logger.error(err);
//         })
//     }
// })