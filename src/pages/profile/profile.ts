import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Users } from '../../models/users';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  userInfo: Users = new Users;

constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
}

showUserInfo(){
  this.http.get("http://localhost:3000/User?jwt=" + localStorage.getItem("Token"),{
    })
    .subscribe(
      result => {
        this.userInfo = result.json().user;
        console.log (this.userInfo);
      },
      error => {
        console.log(error);
      }
    );
  }

ionViewDidLoad(){
  console.log("ionViewDidLoad ProfilePage")
  this.showUserInfo()
  }
}