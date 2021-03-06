import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    this.loginService.login();
  }

  logout(){
    this.loginService.logout();
  }

  isLoggedIn(): boolean{
    return this.loginService.isLoggedIn();
  }

  getUserName(){
    return this.loginService.getIdentityClaims()['given_name'];
  }
}
