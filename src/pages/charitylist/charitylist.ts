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
  public queryText: string;

  @ViewChild('scheduleList', { read: List }) charityList: List;

  dayIndex = 0;
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

  
  //pass the user input and get charities matching the search content 
  updateSchedule(){
    this.http.get("http://localhost:3000/searchCharities"+ this.queryText, {
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

  allCharities() {
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

  favouriteCharities() {
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

  navigateToCharitydetail(id: number) {
    this.navCtrl.push(CharitydetailPage, {
      charitydetail: id
    });
  }

  navigateToPayment() {
    this.navCtrl.push(PaymentMethodsPage);

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

  updateList() {

  }


  addToFavourite(charityid: number) {
    //check if the id already exist 
    //if it does, delete the charity
    // if (this.checkExistingId(charityid) == true) {
    //   this.deleteFavourite(charityid);
    // } else {
    //   this.addFavourite(charityid);
    // }
    //if it does not exist, add to favourite
  }


  //check if this charity id already exist with the user
  //return true or false boolean 
  checkExistingId(charityid: number) {
    this.http.get("http://localhost:3000/checkFavourite?charityId=" + charityid + "&jwt=" + localStorage.getItem("Token"), {
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

  }


  addFavourite(charityid: number) {
    //show alert
    let alert = this.alertCtrl.create({
      title: 'Favorite Added',
      buttons: [{
        text: 'OK',
      }]
    });
    // now present the alert on top of all other content
    alert.present();

    this.http.post("http://localhost:3000/favourite?charityId=" + charityid + "&jwt=" + localStorage.getItem("Token"), {

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
  }

  deleteFavourite(charityid: number) {
    this.http.delete("http://localhost:3000/favourite?charityId=" + charityid + "&jwt=" + localStorage.getItem("Token"), {
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




  //   addToFavourite(charityid:number){
  //     //show alert
  //     let alert = this.alertCtrl.create({
  //       title: 'Favorite Added',
  //       buttons: [{
  //         text: 'OK',
  //       }]
  //     });
  //     // now present the alert on top of all other content
  //     alert.present();

  //     //Check if the charity is already in favourite 
  //     //Use the check favourite function to get boolean 
  //     this.http.get("http://localhost:3000/checkFavourite?charityId="+ charityid + "&jwt=" + localStorage.getItem("Token") ,{
  //     })
  //       .subscribe(
  //         result => {
  //           var booleanValue = result;
  //           //if it already exists, then delete from favourite
  //           if (true == booleanValue as boolean){
  //             this.http.delete("http://localhost:3000/favourite?charityId="+ charityid + "&jwt=" + localStorage.getItem("Token") ,{
  //             })
  //             .subscribe(
  //               result => {
  //                 console.log(result);
  //               },
  //               error => {
  //                 console.log(error);
  //               }
  //             );
  //           }
  //           //if not, then add charity to favourite
  //           if (false == booleanValue as boolean){
  //             this.http.post("http://localhost:3000/favourite?charityId="+ charityid + "&jwt=" + localStorage.getItem("Token") ,{

  //             })
  //             .subscribe(
  //              result => {
  //                console.log(result);
  //                 // create an alert instance
  //              },
  //              error => {
  //                console.log(error);
  //              }
  //            );
  //           }
  //         }
  //       )
  // };



  ionViewDidLoad() {
    console.log('ionViewDidLoad CharitylistPage');
    this.getCharities();
  }
}

