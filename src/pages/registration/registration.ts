import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  public registration: FormGroup;
  public submitted: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public formBuilder: FormBuilder) {
    this.registration = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      passwordCheck: ['', Validators.required],
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.registration.valid) {
      this.register();
    }
  }

  register() {
    if (this.registration.get('password').value == this.registration.get('passwordCheck').value) {
      this.http.post("http://localhost:3000/registration", {
        username: this.registration.get('username').value,
        password: this.registration.get('password').value,
        firstname: this.registration.get('firstname').value,
        lastname: this.registration.get('lastname').value,
        email: this.registration.get('email').value
      })
        .subscribe(
          result => {
            console.log(result);

            this.navCtrl.push(LoginPage, {
              username: this.registration.get('username').value,
              password: this.registration.get('password').value,
              firstname: this.registration.get('firstname').value,
              lastname: this.registration.get('lastname').value,
              email: this.registration.get('email').value,
            });
          },
          error => {
            console.log(error);
          }
        );
    }
    console.log('Passwords do not match');
  }

  navHome() {
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

}
