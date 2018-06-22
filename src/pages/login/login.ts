import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { MenuPage } from '../menu/menu';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { getBaseUrl } from '../../getBaseUrl';


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
    public getBaseUrl: getBaseUrl,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    this.submitted = true;
    this.checkLogin();

    if (this.login.valid) {
      this.navToFeed();
    }
  }

  checkLogin() {
    this.http.post(this.getBaseUrl.getBaseUrl() + "/checkUser", {
      username: this.login.get('username').value,
      password: this.login.get('password').value
    })

    .subscribe(
      result => {
        var credentials = result.json();
        console.log(credentials);
        if (credentials.notExist == true) {
          let alert = this.alertCtrl.create({
            title: 'Sorry, invalid credentials',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
            ]
          });
          alert.present();
        }

        if (credentials.invalid == true) {
          let alert = this.alertCtrl.create({
            title: 'Password or username is incorrect',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
            ]
          });
          alert.present();
        }
      },

      error => {
        console.log(error);
      }
    )
  }

  navToFeed() {
    this.http.post(this.getBaseUrl.getBaseUrl() + "/login", {
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
