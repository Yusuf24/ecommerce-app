import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Product } from '../service/product/product.model';
import { ShoppingCart } from '../service/shopping-cart/shopping-cart';
import { ShoppingCartService } from '../service/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent{

  @Input ('product') product: Product;
  @Input ('shopping-cart') shoppingCart;
  
  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    this.cartService.AddProductCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity: 0
  }

}
