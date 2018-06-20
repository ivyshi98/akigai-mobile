import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Users } from '../../models/users';
import {HomePage } from '../../pages/home/home';

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
  showBadges: boolean;
  userInfo: Users = new Users;
  public editedUsername: string;
  public editedPassword: string;
  public editedEmail: string;
  public editedFirstname: string;
  public editedLastname: string;
  public menu: string;

  @ViewChild('doughnutCanvas') doughnutCanvas;


  //1. initialize values when there is no data

  //2. when data is passed in, change labels and data of the graph dynamically

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.showProfile = false;
    this.showPortfolio = false;
    this.showEditProfile = false;
    this.showBadges = false;
    this.showDonations();
    this.menu = "portfolio";
    this.portfolio();
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
    this.showBadges = false;
  }

  badges() {
    this.showEditProfile = false;
    this.showPortfolio = false;
    this.showProfile = false;
    this.showBadges = true;
  }

  portfolio() {
    this.showPortfolio = true;
    this.showProfile = false;
    this.showEditProfile = false;
    this.showBadges = false;
  }
  
  profile() {
    this.showUserInfo();
    this.showProfile = true;
    this.showPortfolio = false;
    this.showEditProfile = false;
    this.showBadges = false;
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

  ionViewDidLoad() {
    console.log("ionViewDidLoad PortfolioPage")
}

}

