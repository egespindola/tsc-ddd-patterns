import { Order } from "./order";
import {OrderItem} from "./order-item"

describe("customer unit tests", () => {
    let sut: Order
    let orderItens: OrderItem[] = []

    beforeEach(() => {
        const orderItemA = new OrderItem("1","xpto","2",2,10.99)
        const orderItemB = new OrderItem("2","qwerty","2",3,6.99)
        orderItens.push(orderItemA,orderItemB)
    })

    describe("Errors", () => {
        it("should throw an error when ID is empty", () => {
            expect(() => {
                 new Order("","1",orderItens)
            }).toThrow(Error)
        })
        it("should throw an error when customerID is empty", () => {
            expect(() => {
                 new Order("1","",orderItens)
            }).toThrow(Error)
        })
        it("should throw an error when items are empty", () => {
            expect(() => {
                new Order("1","1",[])
            }).toThrow(Error)
            
        })
        
    })

    it("should create a new Order", () => {
        const order = new Order("1","1",orderItens)
        expect(order).toBeDefined()
    });
    it("should calculate total correctly", () => {
        const orderItemA: OrderItem = new OrderItem("1","xpto","1",1,10)
        const orderItemB: OrderItem = new OrderItem("2","xyz","1",2,5)
        const orderItems = [orderItemA, orderItemB]
        const order = new Order("1","1",orderItems)

        console.log({order})
        expect(order.total).toBe(20)
    })
    
    
})