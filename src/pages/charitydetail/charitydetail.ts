import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http'
import { PaymentMethodsPage } from '../payment-methods/payment-methods';
import { CharitylistPage } from '../charitylist/charitylist';


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
  

  public charity:any;
  public charitydetail:any;
  public nextId:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http) {
    this.charitydetail = this.navParams.get("charitydetail");
  }

  
  navigateToNext(currentCharityId:number){
    // this.navCtrl.setRoot(CharitylistPage);
    this.navCtrl.push(CharitydetailPage,{
      charitydetail:currentCharityId+1,
    }).then(() => this.navCtrl.remove(1));
    //this.navCtrl.setRoot(CharitylistPage);
  }

  navigateToPrevious(currentCharityId:number){
    //this.navCtrl.setRoot(CharitylistPage);
    if (currentCharityId >1 ){
      
      this.navCtrl.push(CharitydetailPage,{
        //if statement for id > 1
        charitydetail:currentCharityId-1,
      }).then(() => this.navCtrl.remove(1));
    }else if (currentCharityId == 1){
      this.navCtrl.push(CharitydetailPage,{
        //if statement for id > 1
        charitydetail:currentCharityId,
      }).then(() => this.navCtrl.remove(1));
    }
  }

  getCharityDetail(charityid:number) {
    this.http.get("http://localhost:3000/charity/" 
    + charityid, {
      })
      .subscribe(
        result => {
          this.charity = result.json();         
        },
        error => {
          console.log(error);
        }
      );
    };

  
  backToCharitylist(){
  }

  navigateToPayment(id: number){
    this.navCtrl.push(PaymentMethodsPage);
    //charityId: id;
  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad CharitydetailPage");
    this.getCharityDetail(this.charitydetail);
  }
}