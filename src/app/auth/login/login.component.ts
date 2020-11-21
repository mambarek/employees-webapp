import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "../../modal/modal.component";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: {userName: string, password: string};

  constructor(private loginService: LoginService) {
    this.loginData = {userName: "", password: ""};
  }

  ngOnInit(): void {
  }

  loginUser() {
    console.log("loginUser", this.loginData);
    this.loginService.loginUser(this.loginData);
  }
}
