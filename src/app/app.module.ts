import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BootstrapNavbarComponent } from './bootstrap-navbar/bootstrap-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyOrderComponent } from './my-order/my-order.component';
import { GuardService } from './service/require/guard.service';
import { AuthService } from './service/auth/auth.service';
import { ProductFormComponent } from './admin/product-from/product-from.component';
import { CategoryService } from './service/category/category.service';
import { ProductService } from './service/product/product.service';
import { ProductEditComponent } from './admin/product-edit/product-edit.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './service/shopping-cart/shopping-cart.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    BootstrapNavbarComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    UserOrdersComponent,
    AdminProductComponent,
    AdminOrderComponent,
    MyOrderComponent,
    ProductFormComponent,
    ProductEditComponent,
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductComponent },
      { path: 'product', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'login', component: LoginComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate: [GuardService] },
      { path: 'order-success', component: OrderSuccessComponent, canActivate: [GuardService] },
      { path: 'my-order', component: MyOrderComponent, canActivate: [GuardService] },

      { path: 'admin/product/new', component: ProductFormComponent, canActivate: [GuardService] },
      { path: 'admin/product/:id', component: ProductFormComponent, canActivate: [GuardService] },
      { path: 'admin/product', component: AdminProductComponent, canActivate: [GuardService] },
      { path: 'admin/order', component: AdminOrderComponent, canActivate: [GuardService] },

    ]),
    NgbModule,
    BrowserAnimationsModule,
  ],
  providers: [
    GuardService,
    AuthService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
