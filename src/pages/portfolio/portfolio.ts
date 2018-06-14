import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;


  //1. initialize values when there is no data

  //2. when data is passed in, change labels and data of the graph dynamically

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PortfolioPage")
}
}
