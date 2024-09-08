export class Address {
    _street: string
    _number: number
    _zipcode: string
    _city: string

    constructor(street: string, number: number, zipcode: string, city: string) {
        this._street = street
        this._number = number
        this._zipcode = zipcode
        this._city = city

        this.validate()
    }

    get street(): string {
        return this._street
    }
    set street(value: string) {
        this._street = value
    }
    get number(): number {
        return this._number
    }
    set number(value: number) {
        this._number = value
    }
    get zipcode(): string {
        return this._zipcode
    }
    set zipcode(value: string) {
        this._zipcode = value
    }
    get city(): string {
        return this._city
    }
    set city(value: string) {
        this._city = value
    }
    toString(): string {
        return `${this.street}, ${this.number}, ${this.zipcode}, ${this.city}`
    }

    static fromJSON(json: any): Address {
        return new Address(json.street, json.number, json.zipcode, json.city)
    }

    validate(): void{
        if(!this.street || this.street.trim() === '') throw new Error('Street cannot be empty')
        if(this.number <= 0) throw new Error('Number must be a positive integer')
        if(!this.zipcode || this.zipcode.trim() === '') throw new Error('Zip cannot be empty')
        if(!this.city || this.city.trim() === '') throw new Error('City cannot be empty')
    }
}