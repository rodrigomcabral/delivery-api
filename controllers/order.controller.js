import OrderService from "../services/order.service.js";

async function createOrder(req, res, next) {
    try {
        let order = req.body
        if (!order.client || !order.product || order.value === null) {
            throw new Error("Client, Product and Value are mandatory to place your order!")
        }
        order = await OrderService.createOrder(order);
        res.send(order)
        logger.info(`POST /order - ${JSON.stringify(order)}`)
    } catch (err) {
        next(err);
    }
}

async function getOrders(req, res, next) {
    try {
        res.send(await OrderService.getOrders())
        logger.info(`GET /order`)
    } catch (err) {
        next(err);
    }
}

async function getOrder(req, res, next) {
    try {
        if (!req.params.id) {
            throw new Error("The id must be informed!")
        }
        res.send(await OrderService.getOrder(req.params.id))
        logger.info("GET /order/:id")
    } catch (err) {
        next(err);
    }
}

async function deleteOrder(req, res, next) {
    try {
        if (!req.params.id) {
            throw new Error("The id must be informed!")
        }
        res.send(await OrderService.deleteOrder(req.params.id))
        res.end()
        logger.info(`DELETE /order/:id - ${req.params.id}`)
    } catch (err) {
        next(err);
    }
}

async function updateOrder(req, res, next) {
    try {
        const order = req.body;
        if (!order.id || !order.client || !order.product || order.value === null || order.delivery === null) {
            throw new Error("ID, Product, Client, Value and Delivery are mandatory!")
        }
        res.send(await OrderService.updateOrder(order))
        logger.info(`PUT /order - ${JSON.stringify(order)}`)
    } catch (err) {
        next(err)
    }
}

async function updateDelivery(req, res, next) {
    try {
        const order = req.body
        if (!order.id || order.delivery === null) {
            throw new Error("ID and Delivery are mandatory!")
        }
        res.send(await OrderService.updateDelivery(order))
        logger.info(`PATCH /order/updateDelivery - ${JSON.stringify(order)}`)
    } catch(err) {
        next(err)
    }
}

async function totalClient(req, res, next) {
    try {
        const clientName = req.body.client
        if (!clientName) {
            throw new Error("The Client field is mandatory!")
        }
        res.send({ totalClient: await OrderService.getTotalClient(clientName)})
        logger.info(`POST /order/totalClient - ${clientName}`)
    } catch(err) {
        next(err)
    }
}

async function totalProduct(req, res, next) {
    try {
        const productName = req.body.product
        if (!productName) {
            throw new Error("The Product field is mandatory!")
        }
        res.send({ totalProduct: await OrderService.getTotalProduct(productName)})
        logger.info(`POST /order/totalProduct + ${productName})`)
    } catch(err) {
        next(err)
    }
}
async function moreOrders(req, res, next) {
    try {
        res.send(await OrderService.getMoreOrders())
        logger.info("GET /moreOrders")
    } catch(err) {
        next(err)
    }
}

export default { 
    createOrder, 
    getOrders,
    getOrder, 
    deleteOrder, 
    updateOrder, 
    updateDelivery, 
    totalClient, 
    totalProduct,
    moreOrders
}