import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { MenuController } from 'ionic-angular';
import { getBaseUrl } from '../../getBaseUrl';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  public token: string;


  public postProperties: Array<object> = [];
  public postNumber: number = 0;
  public noPosts: boolean;
  // public likeSelected: boolean;
  // public likeCount: number;

  constructor(public getBaseUrl: getBaseUrl, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    // this.likeSelected = false;
    // this.likeCount = 0;
    this.viewPage();
    this.noPosts = false;
  }

  viewPage() {
    this.http.get(this.getBaseUrl.getBaseUrl() + "/posts?jwt=" + localStorage.getItem("Token"), {
    })
      .subscribe(
        result => {
          console.log(result);
          this.postProperties = result.json();
          this.postNumber = result.json().length;
          console.log("post Number=" + this.postNumber);
          this.showNoPosts();
        },
        error => {
          console.log(error);
        }
      );
  };

  openMenu() {
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
  }


  refresh() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  showNoPosts() {
    console.log('calling showNoPosts');
    console.log(this.postNumber);
    if (this.postNumber == 0) {
      this.noPosts = true;
    }
    else {
      console.log('posts = ' + this.postNumber);
      this.noPosts = false;
    }
  }

  // like() {
  //   if (this.likeSelected==false) {
  //     this.likeCount = this.likeCount + 1;
  //   }

  //   this.likeSelected = false;
  //   this.likeCount = this.likeCount - 1;
  // }

  
  

}
