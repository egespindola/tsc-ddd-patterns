import { Product } from "../entity/product"
import ProductService from "./product.service"

describe("Product Unit Tests", () => {
    it("should increate the price of all products", () => {
        // Arrange
        const product1 = new Product("1", "Product 1", 10)
        const product2 = new Product("2", "Product 2", 20)
        const products = [product1, product2]

        // Act
        ProductService.increasePrice(products, 10)

        // Assert
        expect(product1.price).toBe(11)
        expect(product2.price).toBe(22)
    })
})