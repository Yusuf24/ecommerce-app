import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public fireservices:AngularFirestore) { }

  create(Record)
  {
    return this.fireservices.collection('products/').add(Record);
  }

  getAll()
  {
    return this.fireservices.collection('/products/').snapshotChanges();
  }

  get(recordid)
  {
    return this.fireservices.collection('products/' + recordid).snapshotChanges();
  }

  update(recordid, record)
  {
    this.fireservices.doc('/products/' + recordid).update(record);
  }

  delete(record_id)
  {
    this.fireservices.doc('/products/' + record_id).delete();
  }


}