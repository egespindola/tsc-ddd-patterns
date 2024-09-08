import { Address } from "./value-object/address";
import { Customer } from "./customer";

describe("customer unit tests", () => {
    let sut: Customer

    beforeEach(() => {
        sut = new Customer("123", "John Doe", "johndoe@example.com")
    })

    describe("errors", () => {
        it("should throw an error when name is empty", () => {
            expect(() => {
                const customer = new Customer("123", "", "johndoe@example.com")
            }).toThrow(Error);
        })

        it("should throw an error when ID is empty", () => {
            expect(() => {
                const customer = new Customer("", "John Doe", "johndoe@example.com")
            }).toThrow("ID cannot be empty");
        })
        it("should throw an error when name in changeName is empty", () => {
            expect(() => sut.changeName("")).toThrow(Error);
        })
        it("should throw an error when activate but address is empty", () => {
            expect(() => sut.activate()).toThrow("Address is required to activate the customer");
        })
    })
    it("should create a new Customer", () => {
        const customer = new Customer('1', 'John Doe', 'john.doe@example.com');
        expect(() => customer.validate()).not.toThrow();
        expect(customer.isActive()).toBe(false);
    });
    it("should change name", () => {
        sut.changeName("Jane Doe");
        expect(sut.name).toBe("Jane Doe");
    });
    it("should set address", () => {
        const address = new Address("Street 1", 1, "12345", "City");
        sut.setAddress(address);
        expect(sut.address).toBe(address);
    })
    it("should activate the customer", () => {
        const address = new Address("Street 1", 1, "12345", "City");
        sut.setAddress(address);
        sut.activate();
        expect(sut.isActive()).toBeTruthy();
    })
    it("should deactivate the customer", () => {
        const address = new Address("Street 1", 1, "12345", "City");
        sut.setAddress(address);
        sut.activate();
        sut.deactivate();
        expect(sut.isActive()).toBeFalsy();
    })

    

})