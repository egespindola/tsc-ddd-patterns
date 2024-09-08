import { Sequelize } from "sequelize-typescript";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import { Order } from "../../domain/entity/order";
import { Customer } from "../../domain/entity/customer";
import { OrderItem } from "../../domain/entity/order-item";
import { CustomerRepository } from './customer.repository';
import { Address } from '../../domain/entity/value-object/address';
import ProductRepository from './product.repository';
import { Product } from '../../domain/entity/product';
import { OrderRepository } from './order.repository';
import { ProductModel } from '../db/sequelize/model/product.model';
import { CustomerModel } from '../db/sequelize/model/customer.model';

describe("OrderRepository Unit Tests", () => {
    let sequelize: Sequelize
    let sut: OrderRepository;
    let genericOrder: Order
    let genericOrderItem: OrderItem
    let genericProduct: Product
    let genericCustomer: Customer


    beforeEach(async () => {
        sequelize = new Sequelize({ dialect: "sqlite", storage: ":memory:", logging: false, sync: {force: true} });

        sut = new OrderRepository()
        genericCustomer = new Customer("c999","John Doe","")
        genericProduct = new Product("p1","xpto",100)
        genericOrderItem = new OrderItem("oi1","oi-xpto",genericProduct.id,2,genericProduct.price)
        genericOrder = new Order("o123",genericCustomer.id,[genericOrderItem])

        sequelize.addModels([
            CustomerModel,
            OrderModel, 
            OrderItemModel, 
            ProductModel
        ])     
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a new order", async () => {

        const customerRepository = new CustomerRepository()
        const customer = new Customer("c1","John Doe", "johndoe@example.com")
        const address = new Address("Zwei strasse",616,"55500","München")
        customer.setAddress(address)
        await customerRepository.create(customer)

        const productRepo = new ProductRepository()
        const product1 = new Product("p1","xpto",100)
        const product2 = new Product("p2","qwerty",50)
        await productRepo.create(product1)
        await productRepo.create(product2)

        const orderItem1 = new OrderItem("ot1",product1.name,product1.id,1,product1.price)
        const orderItem2 = new OrderItem("ot2",product2.name,product2.id,2,product2.price)

        const order = new Order("o1",customer.id,[orderItem1,orderItem2])

        await sut.create(order)

        const orderModel = await OrderModel.findOne({where: {id: order.id}, include:["items"]})

        
        expect(orderModel).toBeTruthy()
        expect(orderModel!.customer_id).toBe("c1")
        expect(orderModel!.total).toBe(200)
        expect(orderModel.toJSON()).toStrictEqual({
          id: order.id,
          customer_id: order.customerId,
          total: order.total,
          items: [
            {
              id: orderItem1.id,
              product_id: orderItem1.productId,
              order_id: order.id,
              name: orderItem1.name,
              price: orderItem1.price,
              quantity: orderItem1.quantity
            },
            {
              id: orderItem2.id,
              product_id: orderItem2.productId,
              order_id: order.id,
              name: orderItem2.name,
              price: orderItem2.price,
              quantity: orderItem2.quantity
            }
          ]  
        })
    })
    it("should find an order by id", async () => {
        const prodRepo = new ProductRepository()
        const custRepo = new CustomerRepository()
        const address = new Address("Zwei strasse",616,"55500","München")
        genericCustomer.setAddress(address)

        await prodRepo.create(genericProduct)
        await custRepo.create(genericCustomer)

        await sut.create(genericOrder)

        const order = await sut.find(genericOrder.id)

        expect(order).toBeTruthy()
        expect(order).toStrictEqual(genericOrder)
    })

    it("should find all orders", async () => {
      const prodRepo = new ProductRepository()
      const custRepo = new CustomerRepository()
      const address = new Address("Zwei strasse",616,"55500","München")
      genericCustomer.setAddress(address)
      
      const orderitem2 = new OrderItem("oi2","oi-xpto",genericProduct.id,2,genericProduct.price)
      const order2 = new Order("oc124",genericCustomer.id,[orderitem2])
      
      
      await prodRepo.create(genericProduct)
      await custRepo.create(genericCustomer)
      await sut.create(genericOrder)
      await sut.create(order2)
      
      const orders = await sut.findAll()
      
      expect(orders).toBeDefined()
      expect(orders.length).toBe(2)
      expect(orders).toStrictEqual([genericOrder,order2])
    })

    it("should update an order", async () => {
        const prodRepo = new ProductRepository()
        const custRepo = new CustomerRepository()
        const address = new Address("Lorem Ipsum Avenye",616333,"336699","LA")
        genericCustomer.setAddress(address)
        
        
        await custRepo.create(genericCustomer)
        await prodRepo.create(genericProduct)

        await sut.create(genericOrder)

        // genericOrder.items[0].changeQuantity(10)
        const customer2 = new Customer("c2","Jane Doe","")
        customer2.setAddress(address)
        await custRepo.create(customer2)
        genericOrder.changeCustomer(customer2.id)
      
        await sut.update(genericOrder)
        
        const orderModel = await OrderModel.findOne({where: {id: genericOrder.id}, include:["items"]})
        
        

        expect(orderModel).toBeTruthy()
        expect(orderModel!.customer_id).toBe("c2")
        expect(orderModel!.total).toBe(200)
        expect(orderModel!.items.length).toBe(1)
        expect(orderModel!.items[0].quantity).toBe(2)
        expect(orderModel!.items[0].price).toBe(100)
        expect(orderModel!.items[0].name).toBe("oi-xpto")
    })
})