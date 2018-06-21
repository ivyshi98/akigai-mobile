import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { PortfolioPage } from '../portfolio/portfolio';

import { DatePipe } from '@angular/common'
// import { param } from "@loopback/rest";
// import { verify } from "jsonwebtoken";

import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';


declare var Stripe;

@Component({
  selector: 'page-payment-methods',
  templateUrl: 'payment-methods.html',
})
export class PaymentMethodsPage {

  date: Date = new Date();

  stripe = Stripe('pk_test_9xDCoJstNY3XTH470KJmBNzU');
  card: any;

  oneTime: boolean;
  monthly: boolean;
  frequency: string;
  amount: number;
  card_holder: string;
  address_line1: string;
  address_city: string;
  address_country: string;
  address_zip: string;
  currency: string;

  charitydetail: number;

  currency: string;
  oneTime: boolean;
  monthly: boolean;
  date: Date;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public datepipe: DatePipe,
    private alertCtrl: AlertController) {
    this.charitydetail = this.navParams.get("charitydetail");
  }

  ionViewWillEnter() {
    if (this.card) {
      this.card.clear();
    }
  }

  ionViewDidLoad() {
    this.setupStripe();
  }

  validatePayment() {
    var frequency = this.frequency;
    var amount = this.amount;
    var name = this.card_holder;
    var address = this.address_line1;
    var city = this.address_city;
    var country = this.address_country;
    var zip = this.address_zip;
    var currency = this.currency;

    if (frequency == null) {
      alert("Please select your donation frequency");
      return false;
    }

    if (amount == null) {
      alert("Must input a donation amount");
      return false;
    }

    if (name == null) {
      alert("Must provide name on card");
      return false;
    }

    if (address == null) {
      alert("Must provide a billing address");
      return false;
    }

    if (city == null) {
      alert("Must provide a city");
      return false;
    }

    if (country == null) {
      alert("Must provide a country");
      return false;
    }

    if (zip == null) {
      alert("Must provide a postal code");
      return false;
    }

    if (currency == null) {
      alert("Please select a currency");
      return false;
    }

    this.createDonation();
  }

  oneTimeTrue() {
    this.oneTime = true;
    this.monthly = false;
  }

  monthlyTrue() {
    this.oneTime = false;
    this.monthly = true;
  }

  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });

    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      // this.stripe.createToken(this.card) this.stripe.createSource(this.card)
      if (this.oneTime) {
        this.stripe.createToken(this.card)
          .then(result => {
            if (result.error) {
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
              console.log(result.token);
              this.stripeTokenHandler(result.token);
              this.navCtrl.parent.select(2)
                .then(() => {
                  this.navCtrl.parent.previousTab().goToRoot();
                });
              this.donationSuccessful();
              this.createDonation();
            }
          })
      } else {
        // var ownerInfo = {
        //   owner: {
        //     name: this.name,
        //     address: {
        //       line1: this.address_line1,
        //       city: this.address_city,
        //       postal_code: this.address_zip,
        //       country: this.address_country,
        //     },
        //     //email: 'jenny.rosen@example.com'
        //   },
        // };

        this.stripe.createSource(this.card)
          .then(result => {
            if (result.error) {
              // Inform the user if there was an error
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
              // Send the source to your server
              this.stripeSourceHandler(result.source);
              this.navCtrl.parent.select(2)
                .then(() => {
                  this.navCtrl.parent.previousTab().goToRoot();
                });
              this.donationSuccessful();
              this.createDonation();
            }
          });
      }
    });
  }

  stripeTokenHandler(token) {
    this.http
      .post("http://localhost:3000/payment?jwt=" + localStorage.getItem("Token"), {
        cardholder: this.card_holder,
        paymenttoken: token.id,
        amount: this.amount,
        currency: this.currency,
        date: new Date().toDateString(),
        time: new Date().toTimeString()
      })

      .subscribe(
        result => {
          console.log(result);
        },

        error => {
          console.log(error);
        });
  }

  stripeSourceHandler(source) {
    this.http
      .post("http://localhost:3000/payment?jwt=" + localStorage.getItem("Token"), {
        cardholder: this.card_holder,
        paymenttoken: source.id,
        amount: this.amount,
        currency: this.currency,
        date: new Date().toDateString(),
        time: new Date().toTimeString()
      })

      .subscribe(
        result => {
          console.log(result);
        },

        error => {
          console.log(error);
        });
  }

  donationSuccessful() {
    let alert = this.alertCtrl.create({
      title: 'Donation Successful',
      subTitle: 'Thank you for donating!',
      buttons: ['Ok']
    });
    console.log('Donate clicked');

    alert.present();
  }


  //create a donation
  createDonation() {

    let latest_date = this.datepipe.transform(this.date, 'MM-dd-yyyy');
    this.http.post("http://localhost:3000/createDonation?charityId="+ this.charitydetail + "&jwt=" + localStorage.getItem("Token"),{
       amount: this.amount,
       date: latest_date,

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
}


