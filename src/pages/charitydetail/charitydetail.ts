import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http'
import { PaymentMethodsPage } from '../payment-methods/payment-methods';
import { getBaseUrl } from '../../getBaseUrl';

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
  public http: Http, public getBaseUrl: getBaseUrl) {
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
    this.http.get(this.getBaseUrl.getBaseUrl() + "/charity/" 
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