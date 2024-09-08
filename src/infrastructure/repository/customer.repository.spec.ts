import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../domain/entity/customer";
import { Address } from "../../domain/entity/value-object/address";
import { CustomerRepository } from "./customer.repository";
import { CustomerModel } from "../db/sequelize/model/customer.model";

describe("CustomerRepository Unit Tests", () => {
    let sequelize: Sequelize
    let sut: CustomerRepository;

    beforeEach(async () => {
        sequelize = new Sequelize({ dialect: "sqlite", storage: ":memory:", logging: false, sync: {force: true} });

        sut = new CustomerRepository()
        sequelize.addModels([CustomerModel])      
        await sequelize.sync()
    });
    afterEach(async () => {
        await sequelize.close()
    })
  it("should create a customer", async () => {
    // Arrange
    const customer = new Customer('1', 'John Doe', 'john.doe@example.com');
    const address = new Address("Street 1",123,"55544499","Los Angeles");

    customer.setAddress(address);

    // Act
    sut.create(customer);
    const foundCustomer = await CustomerModel.findOne({where: {id: "1"}})

    // Assert
    expect(true).toBeTruthy();
    expect(foundCustomer).toStrictEqual({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        street: "Street 1",
        number: 123,
        zipcode: "55544499",
        city: "Los Angeles",
        isActive: false,
        rewardPoints: 0
    })
  })  
})