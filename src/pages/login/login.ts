import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // navToProfile() {
  //   this.navCtrl.push(ProfilePage, {
  //     username: this.username
  //   });
  // }

  navHome() {
    this.navCtrl.push(HomePage);
  }

  // navToTabs() {
  //   this.navCtrl.setRoot(TabsPage);
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
