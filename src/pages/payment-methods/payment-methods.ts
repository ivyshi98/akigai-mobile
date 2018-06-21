import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { getBaseUrl } from '../../getBaseUrl';

declare var Stripe;

@Component({
  selector: 'page-payment-methods',
  templateUrl: 'payment-methods.html',
})

export class PaymentMethodsPage {

  stripe = Stripe('pk_test_9xDCoJstNY3XTH470KJmBNzU');
  card: any;

  oneTime: boolean;
  monthly: boolean;

  charitydetail: number;

  payment: FormGroup;
  public submitted: boolean = false;

  public lottieConfig: Object;
  private anim: any;

  constructor(
    public getBaseUrl: getBaseUrl,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder) {
    this.charitydetail = this.navParams.get("charitydetail");

    this.payment = this.formBuilder.group({
      frequency: ['', Validators.required],
      amount: ['', Validators.required],
      card_holder: ['', Validators.required],
      address_line1: ['', Validators.required],
      address_city: ['', Validators.required],
      address_country: ['', Validators.required],
      currency: ['', Validators.required],
    })

    // this.lottieConfig = {
    //   path: 'assets/animations/lottie/Loading.json',
    //   autoplay: true,
    //   loop: true
    // };
  }

  ionViewWillEnter() {
    if (this.card) {
      this.card.clear();
    }
  }

  ionViewDidLoad() {
    this.setupStripe();
  }

  // handleAnimation(anim: any) {
  //   this.anim = anim;
  // }

  onSubmit() {
    this.submitted = true;

    if (this.payment.valid) {
      console.log(this.payment.value);
    }
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

      let loading = this.loadingCtrl.create({ content: "Authenticating payment, please wait..." });
      loading.present();

      if (this.oneTime) {
        this.stripe.createToken(this.card)
          .then(result => {
            if (result.error) {
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
              console.log(result.token);
              this.stripeTokenHandler(result.token);
              this.navCtrl.parent.select(0)
                .then(() => {
                  this.navCtrl.parent.previousTab().goToRoot();
                });
              loading.dismissAll();
              this.donationSuccessful();
              this.createDonation();
            }
          })
      } else {
        this.stripe.createSource(this.card)
          .then(result => {
            if (result.error) {
              // Inform the user if there was an error
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
              // Send the source to your server
              this.stripeSourceHandler(result.source);
              this.navCtrl.parent.select(0)
                .then(() => {
                  this.navCtrl.parent.previousTab().goToRoot();
                });
              loading.dismissAll();
              this.donationSuccessful();
              this.createDonation();
            }
          });
      }
    });
  }

  stripeTokenHandler(token) {
    this.http
      .post(this.getBaseUrl.getBaseUrl() + "/payment?jwt=" + localStorage.getItem("Token"), {
        cardholder: this.payment.get('card_holder').value,
        paymenttoken: token.id,
        amount: this.payment.get('amount').value,
        currency: this.payment.get('currency').value,
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
      .post(this.getBaseUrl.getBaseUrl() + "/payment?jwt=" + localStorage.getItem("Token"), {
        cardholder: this.payment.get('card_holder').value,
        paymenttoken: source.id,
        amount: this.payment.get('amount').value,
        currency: this.payment.get('currency').value,
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

  //create a donation
  createDonation() {
    this.http.post(this.getBaseUrl.getBaseUrl() + "/createDonation?charityId=" + this.charitydetail + "&jwt=" + localStorage.getItem("Token"), {
      amount: this.payment.get('amount').value,
      date: new Date().toDateString(),
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

  donationSuccessful() {
    let alert = this.alertCtrl.create({
      title: 'Donation Successful',
      subTitle: 'Thank you for donating!',
      buttons: ['Ok']
    });
    console.log('Donate clicked');

    alert.present();
  }
}