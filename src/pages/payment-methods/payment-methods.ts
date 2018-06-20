import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { PortfolioPage } from '../portfolio/portfolio';
import { MenuPage } from '../menu/menu';
// import { param } from "@loopback/rest";
// import { verify } from "jsonwebtoken";

declare var Stripe;

@Component({
  selector: 'page-payment-methods',
  templateUrl: 'payment-methods.html',
})
export class PaymentMethodsPage {

  stripe = Stripe('pk_test_9xDCoJstNY3XTH470KJmBNzU');
  card: any;
  name: string;
  address_line1: string;
  address_city: string;
  address_country: string;
  address_zip: string;
  amount: number;

  charitydetail: number;
  date: Date;
  curency: string;
  oneTime: boolean;
  monthly: boolean;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
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
            }
          });
      }
    });
  }

  stripeTokenHandler(token) {
    this.http
      .post("http://localhost:3000/payment?jwt=" + localStorage.getItem("Token"), {
        cardholder: this.name,
        paymenttoken: token.id,
        amount: this.amount,
        curency: this.curency,
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
        cardholder: this.name,
        paymenttoken: source.id,
        amount: this.amount,
        curency: this.curency,
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

  pushAmountToDonation() {
    this.http
      .post("http://localhost:3000/donations?jwt=" + localStorage.getItem("Token"), {
        amount: this.amount
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
    this.http.post("http://localhost:3000/createDonation?charityId=" + this.charitydetail + "&jwt=" + localStorage.getItem("Token"), {
      amount: this.amount,
      date: "15 May",
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

