import { Customer } from "../entity/customer"
import { Order } from "../entity/order"
import { OrderItem } from "../entity/order-item"
import OrderService from "./order.service"

describe("OrderService unit tests", () => {
    it("should get the total of all orders", () => {
        const itemA = new OrderItem("1","xpto","p1",2,200)
        const itemB = new OrderItem("2","qwerty","p2",1,300)

        const orderA = new Order("1","c1",[itemA])
        const orderB = new Order("1","c1",[itemB])

        const total = OrderService.total([orderA,orderB])

        expect(total).toBe(700)
    })

    it("should place an order", () => {

        const customer = new Customer("c1","John Doe","johndoe@ex.us")
        const item = new OrderItem("oi1","xpto","p1",1,100)
        // const order = new Order("o1","c1",[item])

        const order = OrderService.placeOrder(customer, [item])

        expect(customer.rewardPoints).toBe(50)
        expect(order.total).toBe(100)


    })
})