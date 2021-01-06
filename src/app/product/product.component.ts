import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product/product.service';
import { Product } from '../service/product/product.model';
import { subscribeOn, switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../service/shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy{

  products: any [];
  filteredProducts: Product[] = [];
  categories: string[];
  category: string;
  cart: any;
  subscription: Subscription;
  constructor(public productService: ProductService, public route: ActivatedRoute, public shoppingCartService: ShoppingCartService ) { 

    productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    }))
        .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
        this.products.filter(p => (p.payload.val().category)===this.category) :
        this.products;
      });
  }

  async ngOnInit() {
     this.subscription = (await this.shoppingCartService.getCart())
     .valueChanges().subscribe(cart=> this.cart=cart);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
