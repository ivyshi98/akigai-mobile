import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import { Posts } from '../../models/posts';
import { MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  public token: string;


  public postsProperties: Array<object> = [];

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  viewPage() {
    this.http.get("http://localhost:3000/posts?jwt=" + this.navParams.get("token"), {
      })
      .subscribe(
        result => {
          console.log(result);
          this.postsProperties = result.json();
        },
        error => {
          console.log(error);
        }
      );
    };


 
  openMenu(){
    this.menuCtrl.open()
  }
  

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FeedPage');
    //this.viewPage();
    this.token = localStorage.getItem("Token");
    console.log("profile token: ", this.token);
  }

  
  
}