import { OrderItem } from "./order-item";

export class Order{
    private _id: string;
    private _customerId: string;
    private _items: Array<OrderItem>
    private _total: number

    constructor(id: string, customerId: string, items:OrderItem[]) {
        this._id = id
        this._customerId = customerId
        this._items = items
        this._total = this.calculateTotal()
        this.validate()
    }

    get total(){
        return this._total
    }

    get id(){
        return this._id
    }

    get customerId(){
        return this._customerId
    }
    get items() {
        return this._items
    }

    removeItem(item: OrderItem) {
        this._items.slice(this._items.indexOf(item), 1)
        this._total = this.calculateTotal()
    }

    addItem(item: OrderItem) {
        this._items.push(item)
        this._total = this.calculateTotal()
    }

    changeCustomer(customerId: string) {
        this._customerId = customerId
    }


    calculateTotal():number {
        // const fnCalc = (sum: number, item: OrderItem) => sum + (item.price * item.quantity);
        const fnCalc = (sum: number, item: OrderItem) => sum + item.orderItemTotal();
        return this._items.reduce(fnCalc, 0)
    }

    validate() {
        if(this._id === undefined || this._id === "" || this._id === null) {
            throw new Error("ID is required")
        }
        if(this._customerId === undefined || this._customerId === "" || this._customerId === null) {
            throw new Error("Customer id is required")
        }
        if(this._items === undefined || this._items === null || this._items.length === 0) {
            throw new Error("At least one item must be specified")
        }
        if(this._total === undefined || this._total === null || this._total === 0){
            throw new Error("Total amount must be specified")
        }
    }
}