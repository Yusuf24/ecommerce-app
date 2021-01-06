import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/service/category/category.service';
import { Product } from 'src/app/service/product/product.model';
import { ProductService } from '../../service/product/product.service';

@Component({
  selector: 'app-product-from',
  templateUrl: './product-from.component.html',
  styleUrls: ['./product-from.component.scss']
})

export class ProductFormComponent implements OnInit {

  categories: any[];
  product: any=[];
  id;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService,
    ) {
     this.id= this.route.snapshot.paramMap.get('id');
     if(this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
}

save(product) {
  if (this.id) this.productService.update(this.id, product);
  else this.productService.create(product);
  this.router.navigate(['/admin/product/']);
  
  }

  delete() {
    if(!confirm ('Are you ready')) return;

    this.productService.delete(this.id);
    this.router.navigate(['admin/product'])
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(c => this.categories = c)
  }
  }
