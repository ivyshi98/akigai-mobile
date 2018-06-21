import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { MenuPage } from '../menu/menu';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: string;
  public password: string;

  public login: FormGroup;
  public submitted: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public formBuilder: FormBuilder) {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.login.valid) {
      this.navToFeed();
    }
  }

  navToFeed() {
    this.http.post("http://localhost:3000/login", {
      username: this.login.get('username').value,
      password: this.login.get('password').value
    })
      .subscribe(
        result => {
          var Usertoken = result.json();
          localStorage.setItem("Token", Usertoken.token);
          this.navCtrl.setRoot(MenuPage);
          this.navCtrl.popToRoot();
        },
        error => {
          console.log(error);
        }
      );
  }

  navHome() {
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
