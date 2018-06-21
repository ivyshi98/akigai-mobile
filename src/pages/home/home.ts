import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationPage } from '../registration/registration';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    if (localStorage.getItem("Token")) {
      this.navCtrl.setRoot(MenuPage);
    }
  }

  navLogin() {
    this.navCtrl.push(LoginPage);
  }

  navRegistration() {
    this.navCtrl.push(RegistrationPage);
  }
}
