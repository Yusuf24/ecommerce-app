import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  categoryService: any;

  constructor(public productService:ProductService) {}

  products: any[];
  
  ngOnInit() {
    this.productService.getAll().subscribe(p => this.products = p)

    }

    addProduct(){
    }

    Edit(row){
      console.log(row.key);
    }

}
