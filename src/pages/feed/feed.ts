import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  constructor(public menuCtrl:MenuController, public navCtrl: NavController, public navParams: NavParams) {
  }
 
  openMenu(){
    this.menuCtrl.open()
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

}
