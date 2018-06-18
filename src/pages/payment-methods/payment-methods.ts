import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { PortfolioPage } from '../portfolio/portfolio';
import { TabsPage } from '../tabs/tabs';

declare var Stripe;

@Component({
  selector: 'page-payment-methods',
  templateUrl: 'payment-methods.html',
})
export class PaymentMethodsPage {

  stripe = Stripe('pk_test_9xDCoJstNY3XTH470KJmBNzU');
  card: any;
  card_holder: string;
  amount: number;
  charitydetail: number;
  date: Date;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private alertCtrl: AlertController) {
      this.charitydetail = this.navParams.get("charitydetail");
  }

  ionViewDidLoad() {
    this.setupStripe();
  }

  stripeTokenHandler(token) {
    this.http
      .post("http://localhost:3000/payment", {
        card_holder: this.card_holder,
        payment_token: token.id,
        amount: this.amount,
        //user_id: localStorage.getItem("TOKEN")
      })

      .subscribe(
        result => {
          console.log(result);
        },

        error => {
          console.log(error);
        });
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
      this.stripe.createToken(this.card)
        .then(result => {
          if (result.error) {
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            console.log(result.token);
            this.stripeTokenHandler(result.token);
            this.navCtrl.setRoot(PortfolioPage);
            this.donationSuccessful();
          }
        })
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
    this.http.post("http://localhost:3000/createDonation?charityId="+ this.charitydetail + "&jwt=" + localStorage.getItem("Token"),{
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
