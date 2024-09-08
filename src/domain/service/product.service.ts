import { Product } from "../entity/product";

export default class ProductService {
    static increasePrice(products:Product[], percentage: number):void {
        products.forEach(product => {
            const increase = (product.price * (percentage / 100))+product.price;
            product.changePrice(increase);
        });
    }
}