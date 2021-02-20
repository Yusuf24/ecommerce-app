import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart$;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {

    this.cart$ = await this.shoppingCartService.getShoppingCart();
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

}
