import { Product } from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import { ProductModel } from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        try{
            const {id, name, price} = entity
            await ProductModel.create({id,name,price})
        }catch(e){
            console.error("Error creating product: ", e)
            throw new Error("Failed to create product")
        }
    }

    async update(entity: Product): Promise<void> {
        try{ 
            
            const {id} = entity   
            await ProductModel.update({
                name: entity.name,
                price: entity.price
            }, {where: {id}})

        }catch(e){
            console.error("Error updating product: ", e)
            throw new Error("Failed to update product")
        }
    }

    async findAll(): Promise<Product[]> {
        const prods = await ProductModel.findAll()

        return prods.map((prod) => new Product(prod.id, prod.name, prod.price))
    }

    async find(id: string): Promise<Product> {
    const prod = await ProductModel.findOne({where: {id}}) 

    return new Product(prod.id, prod.name, prod.price)
    }
}