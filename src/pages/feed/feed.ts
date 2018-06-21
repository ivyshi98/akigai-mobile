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


  public postProperties: Array<object> = [];
  public postNumber: number;
  // public likeSelected: boolean;
  // public likeCount: number;

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    // this.likeSelected = false;
    // this.likeCount = 0;
  }

  viewPage() {
    this.http.get("http://localhost:3000/posts?jwt=" + localStorage.getItem("Token"), {
      })
      .subscribe(
        result => {
          console.log(result);
          this.postProperties = result.json();
          this.postNumber = result.json().length;
        },
        error => {
          console.log(error);
        }
      );
    };

  openMenu(){
    this.menuCtrl.open()
  }
  
  // noPosts() {
  //   var query = ('div.box');
  //   if (this.postNumber == 0) {
  //     query.hide();
  //   }
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
    this.token = localStorage.getItem("Token");
    console.log("profile token: ", this.token);
    this.viewPage();
  }

  refresh() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  // like() {
  //   if (this.likeSelected==false) {
  //     this.likeCount = this.likeCount + 1;
  //   }

  //   this.likeSelected = false;
  //   this.likeCount = this.likeCount - 1;
  // }

  
  
}
