import { Address } from "./value-object/address";

export class Customer {
    private _id: string;
    private _name: string;
    private _email?: string;
    private _address!: Address
    private _isActive: boolean = false
    private _rewardPoints: number = 0

    constructor(id: string, name: string, email: string) {
        this._id = id
        this._name = name
        this._email = email
        this.validate()
    }

    get name() { 
        return this._name
    }

    get address(){
        return this._address
    }

    get rewardPoints():number{
        return this._rewardPoints
    }

    get id():string {
        return this._id
    }

    get email(): string {
        return this._email || ''
    }


    changeName(name: string){
        this._name = name
        this.validate()
    }

    activate() {
        if(this._address == undefined || this._address == null) {
            throw new Error('Address is required to activate the customer')
        }
        this._isActive = true
    }

    deactivate() {
        this._isActive = false
    }

    isActive() {
        return this._isActive
    }

    setAddress(address: Address){
        this._address = address
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points
    }

    validate(){
        if(!this._name || this._name.trim() === '') throw new Error('Name cannot be empty')
        if(!this._id || this._id.trim() === '') throw new Error('ID cannot be empty')
    }
}