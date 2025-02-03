import orderRepository from "../repositories/order.repository.js";
import OrderRepository from "../repositories/order.repository.js"

async function createOrder(order) {
    return await OrderRepository.insertOrder(order);
}

async function getOrders() {
    return await OrderRepository.getOrders();
}

async function getOrder(id) {
    return await OrderRepository.getOrder(id)
}

async function deleteOrder(id) {
    return await OrderRepository.deleteOrder(id)
}

async function updateOrder(order) {
    return await OrderRepository.updateOrder(order);
}

async function updateDelivery(order) {
    //in here we bring the order from the repository
    const repositoryOrder = await OrderRepository.getOrder(order.id)
    //update its status wether it was delivered or nah
    repositoryOrder.delivery = order.delivery;
    //give it back to repostitory
    return await OrderRepository.updateOrder(repositoryOrder)
}

async function getTotalClient(clientName) {
    const orders = await OrderRepository.getOrders();
    const total = orders.filter((p) => p.client === clientName && p.delivery)
    //.map get the list and return a list of numbers
    .map((p) => p.value)
    //.reduce get two elements, initializing with 0, and sum both two by two    
    .reduce((prev, curr) => prev + curr, 0)
    
    return total
}

async function getTotalProduct(productName) {
    const orders = await OrderRepository.getOrders();
    const total = orders.filter((p) => p.product === productName && p.delivery)
    .map((p) => p.value)
    .reduce((prev, curr) => prev + curr, 0)
    
    return total
}

async function getMoreOrders() {
    const orders = await OrderRepository.getOrders()
    //create a temp list to process the response
    const list = [];
    //we start with the orders already delivered
    orders.filter((p) => p.delivery)
    //then we verify if each element is inside the list. If not we insert it
    .forEach((p) => {
        const index = list.findIndex((it) => it.product === p.product);
        if (index === -1) {
            list.push({ product: p.product, quantity: 1 })
        } else {
            list[index.quantity++]
        }
    })
    list.sort((a, b) => b.quantity - a.quantity)
    return list.map((p) => `${p.product} - ${p.quantity}`)
}

export default { createOrder, getOrders, getOrder, deleteOrder, updateOrder, updateDelivery, getTotalClient, getTotalProduct, getMoreOrders }