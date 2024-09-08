import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../db/sequelize/model/product.model";
import { Product } from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe("ProductRepository Test",() => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({ dialect: "sqlite", storage: ":memory:", logging: false, sync: {force: true} });

        sequelize.addModels([ProductModel])      
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a new Product", async () => {
        const productRepo = new ProductRepository()
        const product = new Product("123","prod01",321)

        await productRepo.create(product)

        const productModel = await ProductModel.findOne({where: {id: "123"}})

        expect(productModel).toBeDefined()
        expect(productModel.toJSON()).toStrictEqual({
            id: "123",
            name: "prod01",
            price: 321
        })
    })

    it("should update a product", async () => {
        const productRepo = new ProductRepository()
        const product = new Product("123","prod01",321)

        await productRepo.create(product)

        product.changePrice(999)
        product.changeName("prod99")

        

        await productRepo.update(product)

        const productModel = await ProductModel.findOne({where: {id: "123"}})

        expect(productModel).toBeDefined()
        expect(productModel.toJSON()).toStrictEqual({
            id: "123",
            name: "prod99",
            price: 999
        })
    })

    it("should find a product", async () => {
        const productRepo = new ProductRepository()
        const product = new Product("123","prod01",321)

        await productRepo.create(product)

        const foundProduct = await productRepo.find("123")
        const productModel = await ProductModel.findOne({where: {id:"123"}})

        expect(foundProduct).toBeDefined()
        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        })
    })

    it("should find all products", async () => {
        const productRepo = new ProductRepository()
        const product1 = new Product("123","prod01",321)
        const product2 = new Product("456","prod02",678)

        const products = [product1, product2]

        products.forEach(async (product) => {
            await productRepo.create(product)
        })

        
        const foundProducts = await productRepo.findAll()
        

        expect(foundProducts).toEqual(products)
        expect(products.length).toEqual(foundProducts.length)
    })
})