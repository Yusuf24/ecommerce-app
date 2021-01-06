import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public db:AngularFireDatabase) {}

  getCategories() {
    return this.db.list('categories')
           .snapshotChanges()
           .pipe(
             map(change=>change.map(c=>({
               key:c.payload.key, ...c.payload.val() as {}
             }))
           ))
  }
}
