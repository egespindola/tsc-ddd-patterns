import { Customer } from "../../domain/entity/customer";
import { Address } from "../../domain/entity/value-object/address";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import { CustomerModel } from "../db/sequelize/model/customer.model";

export class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer):Promise<void>{
        try{
            const {id, name, email, address} = entity;
            await CustomerModel.create({id, name, email, street: address.street, city: address.city, zipcode: address.zipcode, number: address.number })
        }catch(e){
            console.error("Error creating customer: ", e)
            throw new Error("Failed to create customer")
        }
    }

  async update(entity: Customer): Promise<void> {}
  
  async find(id: string): Promise<Customer> {
    try{
        const custModel = await CustomerModel.findOne({where: {id}}) 
        
        if(!custModel) throw new Error(`Customer with id ${id} not found`)
    
        const customer = new Customer(custModel.id, custModel.name, custModel.email)
        customer.setAddress(new Address(custModel.street, custModel.number, custModel.zipcode, custModel.city))
    
        return customer

    }catch(e){
        console.error("Error finding a customer: ", e)
        throw new Error("Failed to find a customer")
    }
  }

  async findAll(): Promise<Customer[]> {
    return [] 
  }
}