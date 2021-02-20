import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { Observable, } from 'rxjs';
import { Product } from '../product/product.model';
import { ShoppingCart } from './shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(public db: AngularFireDatabase) { }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.AddToCartId();
    return this.db.object('/cart/' + cartId);
  }

  async getShoppingCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.AddToCartId();
    return this.db.object('/cart/' + cartId).valueChanges()
    .pipe(map(x => new ShoppingCart(x['items'])));
  }

  private create() {
    return this.db.list('/cart').push({
      dateCreated: new Date().getTime()
    });

  }

  private async AddToCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key)

    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/cart/' + cartId + '/items/' + productId);
  }


  AddProductCart(product: Product ) {
    this.updateItem(product, 1);
  }

 removeFromCart(product: Product){
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.AddToCartId();
    this.db.object('/cart/' + cartId + '/items').remove();
  }

  private async updateItem(product: Product, change: number){
    let cartId = await this.AddToCartId();
    console.log('addCourse', product);
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      if (item.payload.exists()) {
        item$.update({ product: product, quantity: (item.payload.exportVal().quantity || 0) + change });
      } else {
        item$.set({ product: product, quantity: 1 });
      }
    });
  }
}