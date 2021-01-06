import { Component, Input, OnInit } from '@angular/core';
import { isTemplateExpression } from 'typescript';
import { Product } from '../service/product/product.model';
import { ShoppingCartService } from '../service/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent{
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