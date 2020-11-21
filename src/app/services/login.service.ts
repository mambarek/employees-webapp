import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  showLogin$: Subject<boolean> = new Subject();

  constructor() { }

  loginUser(loginData: {userName: string, password: string}){

  }

  logOutUser(){

  }
}
