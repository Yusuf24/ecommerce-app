import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { CategoryService } from 'src/app/service/category/category.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit,OnDestroy {

  categories: any[];
  products: any[];
  sub: Subscription;

  constructor(private productService: ProductService, public categoryService: CategoryService) { }

  ngOnInit() {
    this.sub = this.categoryService.getCategories()
      .pipe(
        mergeMap(categories => this.productService.getAll().pipe(
          map(products => [categories, products])
        ))).subscribe(([categories, products]) => {
          this.categories = categories;
          this.products = products;
          console.log(categories);
          console.log(products);
        });
  }

  getProductCategory(key){

    return this.products.filter(p => p.category==key)
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
  }

}