import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

   productList: any;

   constructor(private productService: ProductService) {}
   ngOnInit() {
    this.productService.getAll().subscribe(data => {

      this.productList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          title: e.payload.doc.data()['title'],
          price: e.payload.doc.data()['price'],
          category: e.payload.doc.data()['category'],
          imageUrl: e.payload.doc.data()['imageUrl'],
        };
      })
      console.log(this.productList);

    });
  }

  
  }