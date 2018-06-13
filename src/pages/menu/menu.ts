import { TabsPage } from './../tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
 
export interface PageInterface {


  title: string;
  pageName: string;
  component: any;
  icon: string;
  index?: number;
  tabComponent?: any;
}
 
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view
  rootPage = 'TabsPage';
 
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
 
  pages: PageInterface[] = [
    { title: 'Feed', pageName: 'TabsPage', component: TabsPage, tabComponent: 'FeedPage', index: 0, icon: 'home' },
    { title: 'Explore Charities', pageName: 'TabsPage', component: TabsPage, tabComponent: 'CharitylistPage', index: 1, icon: 'globe' },
    { title: 'Portfolio', pageName: 'TabsPage', component: TabsPage, tabComponent: 'PortfolioPage', index: 2, icon: 'folder'},
    
  ];

  AccountPages: PageInterface[] = [
    { title: 'Account', pageName: 'ProfilePage', component: ProfilePage, icon:'person'},
    { title: 'Logout', pageName: 'HomePage', component: HomePage, icon:'home'}
   
  ];
 
  constructor(public menuCtrl: MenuController, public navCtrl: NavController) { }
  
  openMenu(){
    this.menuCtrl.open()
  }

  navigateToLogin(){
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }
  openPage(page: PageInterface) {
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(LoginPage);
    }
  }
 
  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }
 
}
