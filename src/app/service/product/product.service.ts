import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public db: AngularFireDatabase, public fireservices: AngularFirestore) { }

  getAll()
  {
   return this.db.list('/products')
                 .snapshotChanges()
                 .pipe(
                  map(changes =>
                    changes.map(c => (
                      { 
                        key: c.payload.key, ...c.payload.val() as {}
                      }
                      ))
                 )
                 )
  }
  get(productId) { 
    return this.db.object('/products/'+productId)
            .snapshotChanges()
            .pipe(
              map(p=>{
                let obj:any=p.payload.val();
                let productTemp:Product={
                  key:obj.key,
                  category:obj.category,
                  price:obj.price,
                  title:obj.title,
                  imageUrl:obj.imageUrl
                }
                return productTemp
              })
            )
  
  }

   create(product:Product)
   {
     return this.db.list('/products/').push({
      title:product.title,
      category:product.category,
      price:product.price,
      imageUrl:product.imageUrl
     })
   }

   update(productId, product) { 
    return this.db.object('/products/' + productId).update(product);
  }
   delete(id)
   {
     return this.db.object('/products/'+ id).remove();
   }

}