import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories, User } from './user.model'; // optional

import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<User>;
  categories$: Observable<Categories>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private db: AngularFireDatabase,
    private route: ActivatedRoute
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }
  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['/']);
   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
   localStorage.setItem('returnUrl', returnUrl);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
   this.db.object('users' + user.uid).update({
    
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    displayName: user.displayName
  });
   }
   
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
