import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";
import {v4 as uuid} from "uuid"

export default class OrderService {
    static total(orders: Array<Order>):number{
        return orders.reduce((total, order) => total + order.total, 0);
    }

    public static placeOrder(customer: Customer, items: OrderItem[]): Order{

        if(!items.length) throw new Error("Order must have at least on item")

        const order = new Order(uuid(),customer.id,items)
        customer.addRewardPoints(order.total/2)

        return order

    }
}