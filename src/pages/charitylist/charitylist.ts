import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CharitydetailPage } from '../charitydetail/charitydetail';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-charitylist',
  templateUrl: 'charitylist.html',
})
export class CharitylistPage {

    public charities: Array<Object> = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
      //create instances of charity 
       
    }
    



    getCharities() {
      this.http.get("http://localhost:3000/allCharities?jwt=" + localStorage.getItem("Token"), {
        })
        .subscribe(
          result => {
            this.charities = result.json();
          },
          error => {
            console.log(error);
          }
        );
      };

    //  navigateToCharitydetail(){

    //  }
      navigateToCharitydetail(id: number){
        this.navCtrl.push(CharitydetailPage,{
          charitydetail:id
        });
      }  

       navigateToPayment(){
    
      } 

    ionViewDidLoad(){
      console.log('ionViewDidLoad CharitylistPage');
      this.getCharities();
      }
    }
  

 
