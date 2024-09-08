import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({tableName: 'customers', timestamps: false})
export class CustomerModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull: false, type: "varchar"})
    declare name: string;
    
    @Column({type: "varchar"})
    declare email: string;
    
    @Column({allowNull: false, type: "varchar"})
    declare street: string;
    
    @Column({allowNull: false, type: "integer"})
    declare number: number;
    
    @Column({allowNull: false, type: "varchar"})
    declare zipcode: string;
    
    @Column({allowNull: false,type: "varchar"})
    declare city: string

    @Column
    declare isActive: boolean 

    @Column
    declare rewardPoints: number 
}