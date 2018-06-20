import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, List, AlertController } from 'ionic-angular';
import { CharitydetailPage } from '../charitydetail/charitydetail';
import { Http } from '@angular/http';
import { CharityfilterPage } from '../charityfilter/charityfilter';
import { PaymentMethodsPage } from '../payment-methods/payment-methods';

@IonicPage()
@Component({
  selector: 'page-charitylist',
  templateUrl: 'charitylist.html',
})
export class CharitylistPage {

    public charities: Array<Object> = [];
    public charity: any;
    public favouriteCharity: any;
    public buttonColor: string = 'primary';

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
      public modalCtrl: ModalController,
      public alertCtrl: AlertController) {
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

       navigateToPayment(id: number){
        this.navCtrl.push(PaymentMethodsPage, {
          charitydetail:id
        });
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


      addToFavourite(charityid: number) {
      
       //three functions: check, add, delete 
       //check if charity is favourited 
       //if not, post call to add to favourite
           //change button color and text 
       //if yes, delete call to delete from favourite 
           //change button color and text 
           
           this.http.get("http://localhost:3000/checkfavourite?charityId="+ charityid + "&jwt=" + localStorage.getItem("Token") ,{

          })
          .subscribe(
           result => {
             console.log(result);
             var checkResult = result.json().favorite;
             if (checkResult == false){
              this.addFavourite(charityid);
              this.buttonColor = 'green';
             }else{
              this.deleteFavourite(charityid);
              this.buttonColor = 'primary';
            }

           },
           error => {
             console.log(error);
           }
         );

           //show alert
          let alert = this.alertCtrl.create({
            title: 'Favorite Added',
            buttons: [{
              text: 'OK',
            }]
          });
          // now present the alert on top of all other content
          alert.present();

      }

    
    checkFavourite(charityid:number){
      this.http.get("http://localhost:3000/checkfavourite?charityId="+ charityid + "&jwt=" + localStorage.getItem("Token") ,{

          })
          .subscribe(
           result => {
             console.log(result);
             var checkResult = result.json();
             return checkResult;

           },
           error => {
             console.log(error);
           }
         );
    }

    addFavourite(charityid:number){
       this.http.post("http://localhost:3000/favourite?charityId="+ charityid + "&jwt=" + localStorage.getItem("Token") ,{

       })
       .subscribe(
        result => {
          console.log(result);
           // create an alert instance
        },
        error => {
          console.log(error);
        }
      );
    };

    deleteFavourite(charityid: number) {
      this.http.delete("http://localhost:3000/deletefavourite?charityId=" + charityid + "&jwt=" + localStorage.getItem("Token"), {
      })
        .subscribe(
          result => {
            console.log(result);
          },
          error => {
            console.log(error);
          }
        );
    }

    ionViewDidLoad(){
      console.log('ionViewDidLoad CharitylistPage');
      this.getCharities();
      }

    }
  
