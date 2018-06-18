import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage {

  userDonations: Array<any> = [];
  sum: number;
  showSelected1: boolean;
  first1: boolean;
  first2: boolean;
  showSelected2: boolean;

  @ViewChild('doughnutCanvas') doughnutCanvas;


  //1. initialize values when there is no data

  //2. when data is passed in, change labels and data of the graph dynamically

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.showSelected1 = false;
    this.first1 = true;
    this.showSelected2 = false;
    this.first2 = true;
  }

  showDonations() {
    this.http.get("http://localhost:3000/donations?jwt=" + localStorage.getItem("Token"),{
    })
    .subscribe(
      result => {
        this.userDonations = result.json();
        this.sum = 0;
        var allDonationAmounts: Array<number> = [];
       
        for (var i = 0; i < this.userDonations.length; i++) {
          var donationAmount = this.userDonations[i].amount; 
          allDonationAmounts.push(donationAmount);
        }

        for (var i = 0; i < allDonationAmounts.length; i++) {
          this.sum += allDonationAmounts[i];
        }

        console.log(this.sum);
        return this.sum;

      },
      error => {
        console.log(error);
      }
    );
  }

  toggleContent1() {
    if (this.first1) {
      this.showSelected1 = true;
      this.first1 = !this.first1;
    }
    else {
      this.showSelected1 = false;
      this.first1 = !(this.first1);
    }
  }

  toggleContent2() {
    if (this.first2) {
      this.showSelected2 = true;
      this.first2 = !this.first2;
    }
    else {
      this.showSelected2 = false;
      this.first2 = !(this.first2);
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PortfolioPage")
    this.showDonations();
}

}

