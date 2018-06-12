import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { FeedPage } from '../feed/feed';


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

  public username: string;
  public password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  navToFeed(){
    this.http.post("http://localhost:3000/login", {
        username: this.username,
        password: this.password
      })
      .subscribe(
        result => {
          console.log(result.json().token);
  
          this.navCtrl.push(FeedPage,{
            token: result.json().token
          });
        },
        error => {
          console.log(error);
        }
      );
    }

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
