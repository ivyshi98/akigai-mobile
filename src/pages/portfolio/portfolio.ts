import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Users } from '../../models/users';
import {HomePage } from '../../pages/home/home';

import { Chart } from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage {

  userDonations: Array<any> = [];
  sum: number;

  showPortfolio: boolean;
  showProfile: boolean;
  showEditProfile: boolean;
  userInfo: Users = new Users;
  public editedUsername: string;
  public editedPassword: string;
  public editedEmail: string;
  public editedFirstname: string;
  public editedLastname: string;
  public menu: string;
  public showBadge1: boolean;

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
    this.showProfile = false;
    this.showPortfolio = false;
    this.showEditProfile = false;
    this.menu = "portfolio";
    this.showDonations();
    this.getAmount();
    
    this.portfolio();
    this.showUserInfo();
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

  showUserInfo(){
    this.http.get("http://localhost:3000/User?jwt=" + localStorage.getItem("Token"),{
      })
      .subscribe(
        result => {
          this.userInfo = result.json().user;
          console.log (this.userInfo);
        },
        error => {
          console.log(error);
        }
      );
    }

  editProfile() {
    this.showEditProfile = true;
    this.showPortfolio = false;
    this.showProfile = false;
  }
  
  profile() {
    this.showUserInfo();
    this.showProfile = true;
    this.showPortfolio = false;
    this.showEditProfile = false;
  }

  portfolio() {
    this.showPortfolio = true;
    this.showProfile = false;
    this.showEditProfile = false;
    // this.loadChart(this.amountarray,this.charityarray);
    this.getAmount();
  }

  submit() {
    this.changeUserInfo();
    this.profile();
  }

  changeUserInfo() {
    this.http.patch("http://localhost:3000/updateUser?jwt=" + localStorage.getItem("Token"), {
      username: this.editedUsername,
      password: this.editedPassword,
      firstname: this.editedFirstname,
      lastname: this.editedLastname,
      email: this.editedEmail
    })

    .subscribe(
      result => {
        console.log(result);

        var Usertoken = result.json();
        localStorage.setItem("Token", Usertoken.token);
      },
      error => {
        console.log(error);
      }
    );
  }

  //charityarray
  getAmount(){
    //get all donation history with charity id
    this.http.get("http://localhost:3000/donations?&jwt=" + localStorage.getItem("Token") ,{
          })
          .subscribe(
            result => {
              this.charityarray = [];
              this.amountarray = [];

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

              
            this.loadChart(this.amountarray,this.charityarray);
 
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
    // this.loadChart(this.amountarray, this.charityarray);
  }

  refresh() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }


}

