import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
 
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
 
  FeedRoot: any = 'FeedPage';
  CharitylistRoot: any = 'CharitylistPage';
  PortfolioRoot: any = 'PortfolioPage';
  myIndex: number;

 
 
  constructor(navParams: NavParams, public menuCtrl: MenuController) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }
}