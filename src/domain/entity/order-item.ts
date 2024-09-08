export class OrderItem {
    private _id: string;
    private _name: string
    private _quantity: number;
    private _price: number;
    private _productId: string;
    private _total: number;

    constructor(id: string, name: string,productId: string, quantity: number, price: number) {
        this._id = id
        this._name = name
        this._quantity = quantity
        this._price = price
        this._productId = productId
        this._total = this.orderItemTotal()
    }

    get id(){
        return this._id
    }
    get price(): number {
        return this._price
    }

    get quantity(): number {
        return this._quantity
    }

    get name(){
        return this._name
    }

    get productId(){
        return this._productId
    }

    get total(): number{
        return this._total
    }

    changeQuantity(quantity: number){
        this._quantity = quantity
        this._total = this.orderItemTotal()
    }

    orderItemTotal(): number{
        return this._price * this._quantity
    }
}