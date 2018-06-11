import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { FeedPage } from '../feed/feed';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
      public username:string;
      public password:string;
      public firstname:string;
      public lastname:string;
      public email:string;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  navProfile(){
    this.http.post("http://localhost:3000/registration",{
        username: this.username,
        password: this.password,
        firstname:this.firstname,
        lastname:this.lastname,
        email:this.email
      })
      .subscribe(
        result => {
          console.log(result);
  
          this.navCtrl.push(FeedPage,{
            username: this.username,
            password: this.password,
            firstname:this.firstname,
            lastname:this.lastname,
            email:this.email
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

}
