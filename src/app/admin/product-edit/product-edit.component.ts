import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  constructor(public productService:ProductService) {}

  productList: any;
  title:string;
  price:number;
  category:string;
  imageUrl:string;
  message:string;
  
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
      alert("Are you sure you would like to delete this product")
      this.productService.delete(record_id);
      
    }  

}
