import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CharitydetailPage } from '../charitydetail/charitydetail';


//import { PaymentPage } from '../payment/payment';
 
/**
 * Generated class for the CharitylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charitylist',
  templateUrl: 'charitylist.html',
})
export class CharitylistPage {


  /*create a new class for chosen charity */


  
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //create instances of charity 
     
  }
   ionViewDidLoad(){
     console.log('ionViewDidLoad CharitylistPage');
   }
  navigateToProfile(){

  
  }  
   navigateToPayment(){

  } 
 
}
