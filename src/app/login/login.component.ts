import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public auth: AuthService) { }

  login(){
    this.auth.googleSignin();
  }

}
