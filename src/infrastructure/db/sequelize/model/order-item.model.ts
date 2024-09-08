import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import OrderModel from "./order.model";

@Table({tableName:"order_items",timestamps: false})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string; 

    @ForeignKey(() => ProductModel)
    @Column({allowNull: false, type: "varchar"})
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;
    
    @Column({allowNull: false, type: "varchar"})
    declare name: string;
    
    @Column({allowNull: false, type: "float"})
    declare price: number;
    
    @Column({allowNull: false, type: "integer"})
    declare quantity: number;
    
    @ForeignKey(() => OrderModel)
    @Column({allowNull: false, type: "varchar"})
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;
    
}

  