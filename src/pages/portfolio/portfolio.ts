import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Chart } from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage {

  userDonations: Array<any> = [];
  sum: number;
  numberCharities: number;
  showSelected1: boolean;
  first1: boolean;
  first2: boolean;
  showSelected2: boolean;
  doughnutChart: any;
  public charityarray: Array<string> = [];
  public amountarray: Array<number> = [];

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

        for (var r = 0; r < allDonationAmounts.length; r++) {
          this.sum += allDonationAmounts[r];
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

  //charityarray
  getAmount(){
    //get all donation history with charity id
    this.http.get("http://localhost:3000/donations?&jwt=" + localStorage.getItem("Token") ,{
          })
          .subscribe(
            result => {
              console.log(result);
              var resultCharities = result.json();
              //create a new map 
              let donationMap : Map<string, number> = new Map<string, number>();
              var newcharityarray: Array<string> = [];
              var newamountarray: Array<number> = [];

              for (var a = 0; a < resultCharities.length; a++){
                //if charityname does not exist in map
                //create new key, put donation amount to new value
                 //if charityname exist
                //add to the existing donation amount
                if (donationMap.has(resultCharities[a].charityName)){
                  donationMap.set(resultCharities[a].charityName, donationMap.get(resultCharities[a].charityName) + resultCharities[a].amount);
                }else{
                  donationMap.set(resultCharities[a].charityName, resultCharities[a].amount);
                  //newcharityarray.push(resultCharities[a].charityName);
                  this.charityarray.push(resultCharities[a].charityName);
                }
                
              }
              // console.log(donationMap);
              // console.log(this.charityarray);
              // console.log(newcharityarray);
              this.numberCharities = this.charityarray.length;
              for(var b = 0; b < this.charityarray.length; b++){
                //newamountarray.push(donationMap.get(newcharityarray[b]));
                this.amountarray.push(donationMap.get(this.charityarray[b]));
              }
              //this.amountarray = newamountarray;
              //this.charityarray = newcharityarray;
              // console.log(this.amountarray);

              // return {"charityName": newcharityarray,
              //         "donationAmount": newamountarray};

              
              
 
            },
            error => {
              console.log(error);
            }
          );
  }

  loadChart(amountarray:Array<number>,charityarray:Array<string>){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      
      type: 'doughnut',
      data: {
          labels: charityarray,
          datasets: [{
              label: 'Amount of donations',
              data: amountarray,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
                ]
          }]
        }
  
    });
  }

  //amountarray


  ionViewDidLoad() {
    console.log("ionViewDidLoad PortfolioPage")
    this.showDonations();
    this.getAmount();
    
  }

}

