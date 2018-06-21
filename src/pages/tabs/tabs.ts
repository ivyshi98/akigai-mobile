import { Component } from '@angular/core';
import { IonicPage, NavParams, MenuController } from 'ionic-angular';
import { CharitylistPage } from '../charitylist/charitylist';
import { PortfolioPage } from '../portfolio/portfolio';
import { FeedPage } from '../feed/feed';
 
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
 
  
  PortfolioRoot: any = PortfolioPage;
  CharitylistRoot: any = CharitylistPage;
  FeedRoot: any = FeedPage;
  
  myIndex: number;

 
 
  constructor(navParams: NavParams, public menuCtrl: MenuController) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }
}
