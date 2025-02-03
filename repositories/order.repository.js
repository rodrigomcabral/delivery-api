import { timeStamp } from "console";
import { promises as fs} from "fs";

const { readFile, writeFile } = fs;

async function getOrders() {
    const data = JSON.parse(await readFile(global.filename, "utf8"))
    return data.orders; 
}

async function getOrder(id) {
    const orders = await getOrders()
    const order = orders.find((order) => order.id === parseInt(id))
    if (order) {
        return order;
    }
    throw new Error("Order not found.")
}

async function insertOrder(order) {
    const data = JSON.parse(await readFile(global.filename))

    order = {
        id: data.nextId++,
        client: order.client,
        product: order.product,
        value: order.value,
        delivery: false,
        timeStamp: new Date()
    }
    data.orders.push(order);
    await writeFile(global.filename, JSON.stringify(data, null, 2))
    return order
}

async function deleteOrder(id) {
    const data = JSON.parse(await readFile(global.filename))
    //filter f will return all of the orders, except the one with the id passed as param
    data.orders = data.orders.filter((order) => order.id !== parseInt(id))
    await writeFile(global.filename, JSON.stringify(data, null, 2))
}

async function updateOrder(order) {
    const data = JSON.parse(await readFile(global.filename))
    const index = data.orders.findIndex((a) => a.id === order.id)
    
    if (index === -1) {
        throw new Error("Register not found!")
    }
    data.orders[index].client = order.client;
    data.orders[index].product = order.product;
    data.orders[index].value = order.value;
    data.orders[index].delivery = order.delivery;

    await writeFile(global.filename, JSON.stringify(data, null, 2))

    return data.orders[index]
    
}

export default { getOrders, getOrder, insertOrder, deleteOrder, updateOrder }


