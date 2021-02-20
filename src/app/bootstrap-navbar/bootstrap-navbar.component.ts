import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../service/auth/auth.service';
import { User } from '../service/auth/user.model'; // optional
import { Observable, } from 'rxjs';
import '@firebase/auth'
import { Router } from '@angular/router';
import { ShoppingCartService } from '../service/shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../service/shopping-cart/shopping-cart';

@Component({
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.scss']
})
export class BootstrapNavbarComponent implements OnInit  {
  user$: Observable<User>;
  cart$: Observable<ShoppingCart>;

  constructor( public auth:AuthService, public afAuth: AngularFireAuth, private router: Router, private shoppingCartService: ShoppingCartService) {
    }

    logout() {
      this.afAuth.signOut();
      this.router.navigate(['/']);
    }

    async ngOnInit(){
      this.user$ = this.afAuth.authState;
      
     this.cart$ = await this.shoppingCartService.getShoppingCart();

    }
}

