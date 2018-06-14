import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, List } from 'ionic-angular';
import { CharitydetailPage } from '../charitydetail/charitydetail';
import { Http } from '@angular/http';
import { CharityfilterPage } from '../charityfilter/charityfilter';

@IonicPage()
@Component({
  selector: 'page-charitylist',
  templateUrl: 'charitylist.html',
})
export class CharitylistPage {

    public charities: Array<Object> = [];
    public charity: any;
    public favouriteCharity: any;

    @ViewChild('scheduleList', { read: List }) charityList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

    constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      public http: Http,
      public modalCtrl: ModalController) {
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

      allCharities(){
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
      }

      favouriteCharities(){
        this.http.get("http://localhost:3000/favourite?jwt=" + localStorage.getItem("Token"), {
        })
        .subscribe(
          result => {
            this.charities = result.json();
          },
          error => {
            console.log(error);
          }
        );
      }
     
      navigateToCharitydetail(id: number){
        this.navCtrl.push(CharitydetailPage,{
          charitydetail:id
        });
      }  

       navigateToPayment(){
        // this.navCtrl.push(PaymentPage);
    
      } 


      presentFilter() {
        let modal = this.modalCtrl.create(CharityfilterPage, this.excludeTracks);
        modal.present();
    
        modal.onWillDismiss((data: any[]) => {
          if (data) {
            this.excludeTracks = data;
            this.updateList();
          }
        });
    
      }

      updateList(){

      }

      addToFavourite(charityid:number){
       this.http.post("http://localhost:3000/favourite/" + charityid + "?jwt=" + localStorage.getItem("Token") ,{

       })
       .subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
    };



    ionViewDidLoad(){
      console.log('ionViewDidLoad CharitylistPage');
      this.getCharities();
      }
    }
  
