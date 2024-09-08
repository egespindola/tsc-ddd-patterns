import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order-item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export class OrderRepository implements OrderRepositoryInterface{
async create(entity: Order): Promise<void> {
    try{
        const {id, customerId: customer_id, total, items} = entity
        await OrderModel.create({id, customer_id, total,items: items.map(item => ({
            id: item.id,
            product_id: item.productId,
            order_id: id,
            name: item.name,
            price: item.price,
            quantity: item.quantity

        }))
    }, {include: {model: OrderItemModel}})
    }catch(e: any){
        const msgErr= e.message || e
        console.error("🔴Error on creating an order", msgErr)
        throw new Error("Failed to create order")
    }
}
async find(id: string): Promise<Order> {
    try{
        const orderModel = await OrderModel.findOne({where: {id}, include: ["items"]})

        if(!orderModel) throw new Error(`Order with id ${id} not found`)

        const order = new Order(orderModel.id, orderModel.customer_id, orderModel.items.map(item => ( new OrderItem(
            item.id,
            item.name,
            item.product_id,
            item.quantity,
            item.price
        )

        )))
        return order
    }catch(e:any){
        console.error("Error finding an order: ", e.message || e)
        throw new Error("Failed to find an order")
    }
}
async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({include: ["items"]})
    
    return orders.map(order => new Order(order.id, order.customer_id, order.items.map(item => (new OrderItem(item.id, item.name, item.product_id, item.quantity, item.price)))))
}
async update(entity: Order): Promise<void> {
    try{
        const {id, customerId: customer_id, total, items} = entity

        const order = await OrderModel.findOne({where: {id}, include:{model: OrderItemModel}})

        if(!order) throw new Error(`Order with id ${id} not found`)

        await OrderModel.update({customer_id, total, items: items.map(item => ({
            id: item.id,
            product_id: item.productId,
            order_id: id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }))}, {where: {id}})


    }catch(e:any){
        console.error("Error updating order: ", e.message || e)
        throw new Error("Failed to update order")
    }
}
}