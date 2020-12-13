import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../service/auth/auth.service';
import { User } from '../service/auth/user.model'; // optional
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import '@firebase/auth'
import firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.scss']
})
export class BootstrapNavbarComponent  {
  user$: Observable<User>;

  constructor( public auth:AuthService, public afAuth: AngularFireAuth, private router: Router) {
    this.user$ = afAuth.authState;
    }

    logout() {
      this.afAuth.signOut();
      this.router.navigate(['/']);
    }
}

