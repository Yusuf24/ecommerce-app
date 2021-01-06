import { Product } from '../product/product.model';

export interface ShoppingCartItem{
    product: Product;
    quantity: number;
}