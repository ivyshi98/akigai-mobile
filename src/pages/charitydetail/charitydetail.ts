import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the CharitydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charitydetail',
  templateUrl: 'charitydetail.html',
})
export class CharitydetailPage {



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad(){
    console.log("ionViewDidLoad CharitydetailPage");
   
  }
  
  backToCharitylist(){
  }

  navigateToPayment(){

  }
}