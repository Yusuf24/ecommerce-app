import { Component } from '@angular/core';
import { ProductService } from '../../service/product/product.service';

@Component({
  selector: 'app-product-from',
  templateUrl: './product-from.component.html',
  styleUrls: ['./product-from.component.scss']
})

export class ProductFormComponent {

product: any;
title:string;
price:number;
category:string;
imageUrl:string;
message:string;


  constructor(public productService:ProductService){
  }

ngOnInit() {
  }

  CreateRecord()
  {
    let Record = {};
    Record['title'] = this.title;
    Record['price'] = this.price;
    Record['category'] = this.category;
    Record['imageUrl'] = this.imageUrl;

    this.productService.create(Record).then(res => {

        this.title = "";
        this.price = undefined;
        this.category ="";
        this.imageUrl="";
        console.log(res);
        this.message = "Employee data save Done";
    }).catch(error => {
      console.log(error);
    });
    
  }

  EditRecord(Record)
  {
    Record.isedit = true;
    Record.editTitle = Record.title;
    Record.editPrice = Record.price;
    Record.editCategory = Record.category;
    Record.editImageUrl = Record.imageUrl;

  }

  Updatarecord(recorddata)
  {
    let record = {};
    record['title'] = recorddata.editTitle;
    record['price'] = recorddata.editPrice;
    record['imageUrl'] = recorddata.editImageUrl;
    record['category'] = recorddata.editCategory;
    this.productService.update(recorddata.id, record);
    recorddata.isedit = false;
  }

  Deleteemployee(record_id)
  {
    this.productService.delete(record_id);
  }




}
