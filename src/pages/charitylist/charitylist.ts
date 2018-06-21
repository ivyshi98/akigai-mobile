import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, List, AlertController } from 'ionic-angular';
import { CharitydetailPage } from '../charitydetail/charitydetail';
import { Http } from '@angular/http';
import { CharityfilterPage } from '../charityfilter/charityfilter';
import { PaymentMethodsPage } from '../payment-methods/payment-methods';
import { getBaseUrl} from '../../getBaseUrl';

@IonicPage()
@Component({
  selector: 'page-charitylist',
  templateUrl: 'charitylist.html',
})
export class CharitylistPage {

    public charities: Array<Object> = [];
    public charity: any;
    public favouriteCharity: any;
    public charityById = {};


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
      public alertCtrl: AlertController,
      public getBaseUrl: getBaseUrl) {
      //create instances of charity 
       
    }
    
   


    // getCharities() {
    //   this.http.get(this.getBaseUrl.getBaseUrl() + "/allCharities?jwt=" + localStorage.getItem("Token"), {
    //     })
    //     .subscribe(
    //       result => {
    //         this.charities = result.json();
    //         console.log(this.charities);
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     );
    //   };

      allCharities(){
        var favouriteCharityIds = new Set();

      this.http.get(this.getBaseUrl.getBaseUrl() + "/favourite?jwt=" + localStorage.getItem("Token"), {})
        .subscribe(
          result => {
            let favouriteCharities = result.json();

            for (let charity of favouriteCharities) {
              favouriteCharityIds.add(charity.id);
            }

            this.http.get(this.getBaseUrl.getBaseUrl() + "/allCharities?jwt=" + localStorage.getItem("Token"), {})
              .subscribe((result) => {
                let charities = result.json();

                for (let charity of charities) {
                  if (favouriteCharityIds.has(charity.id)) {
                    charity.favourited = true;
                  } else {
                    charity.favourited = false;
                  }

                  this.charityById[charity.id] = charity;
                }

                this.charities = charities;
              })
          },
          error => {
            console.log(error);
          }
        );
      }

      favouriteCharities(){
        this.http.get(this.getBaseUrl.getBaseUrl() + "/favourite?jwt=" + localStorage.getItem("Token"), {
        })
        .subscribe(
          result => {
            let charities = result.json();
            for (let charity of charities) {
              charity.favourited = true;
            }
            this.charities = charities;
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
           
           this.http.get(this.getBaseUrl.getBaseUrl() + "/checkfavourite?charityId="+ charityid + "&jwt=" + localStorage.getItem("Token") ,{

          })
          .subscribe(
           result => {
             console.log(result);
             var checkResult = result.json().favorite;
             if (checkResult == false){
              
              //document.getElementById(`favorite-button-${charityid}`).innerText = 'Favourite';
              let alert = this.alertCtrl.create({
                title: 'Add to Favourite',
                message: 'Do you want to add this charity to favourite?',
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'Confirm',
                    handler: () => {
                      console.log('Add clicked');
                      this.charityById[charityid].favourited = true;
                      this.addFavourite(charityid);
                    }
                  }
                ]
              });
              alert.present();
              
              
              //this.buttonColor = 'green';
              // let alert = this.alertCtrl.create({
              //   title: 'Favorite Added',
              //   buttons: [{
              //     text: 'OK',
              //   }]
              // });
              // now present the alert on top of all other content
              // alert.present();
             }else{
              
              //document.getElementById(`favorite-button-${charityid}`).innerText = 'Favourited';
              let alert = this.alertCtrl.create({
                title: 'Delete from Favourite',
                message: 'This charity has been added. Do you want to delete from favourite?',
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'Confirm',
                    handler: () => {
              
                      console.log('Delete clicked');
                      this.charityById[charityid].favourited = false;
                      this.deleteFavourite(charityid);
                    }
                  }
                ]
              });
              alert.present();
    
             
              //this.buttonColor = 'primary';
              // let alert = this.alertCtrl.create({
              //   title: 'Favorite Deleted',
              //   buttons: [{
              //     text: 'OK',
              //   }]
              // });
              // now present the alert on top of all other content
              // alert.present();
            }

           },
           error => {
             console.log(error);
           }
         );
      }

   

    deleteConfirm(){
      let alert = this.alertCtrl.create({
        title: 'Delete from Favourite',
        message: 'This charity has been added. Do you want to delete from favourite?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              console.log('Delete clicked');
            }
          }
        ]
      });
      alert.present();
    }
    
    checkFavourite(charityid:number){
      this.http.get(this.getBaseUrl.getBaseUrl() + "/checkfavourite?charityId="+ charityid + "&jwt=" + localStorage.getItem("Token") ,{

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
       this.http.post(this.getBaseUrl.getBaseUrl() + "/favourite?charityId="+ charityid + "&jwt=" + localStorage.getItem("Token") ,{

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
      this.http.delete(this.getBaseUrl.getBaseUrl() + "/deletefavourite?charityId=" + charityid + "&jwt=" + localStorage.getItem("Token"), {
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
      this.allCharities();
    }
}