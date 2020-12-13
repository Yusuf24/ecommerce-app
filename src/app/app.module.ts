import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'product', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'login', component: LoginComponent },

      { path: 'check-out', component: CheckOutComponent },
      { path: 'order-success', component: OrderSuccessComponent },
      { path: 'my-order', component: MyOrderComponent },

      { path: 'admin/product/new', component: ProductFormComponent },
      { path: 'admin/product', component: AdminProductComponent },
      { path: 'admin/product-edit', component: ProductEditComponent },
      { path: 'admin/order', component: AdminOrderComponent },

    ]),
    NgbModule,
  ],
  providers: [
    GuardService,
    AuthService,
    CategoryService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
