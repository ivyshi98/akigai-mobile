import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FeedPage } from '../pages/feed/feed';
import { CharitylistPage } from '../pages/charitylist/charitylist';

// interface PageInterface{
//   title: string;
//   name: string;
//   component: any;
//   icon?:string;
// }
@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  rootPage:any = HomePage;

  //  @ViewChild(Nav) private nav: Nav;

  //  public navigationPages: PageInterface[]=[
  //   {title: 'Feed', name: 'FeedPage', component:FeedPage, icon:'person'},
  //   {title: 'Explore Charities', name:'CharitylsitPage', component:CharitylistPage, icon:'document'}
    
  //  ];

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  // openPage(page:PageInterface){
  //   this.nav.setRoot(page.component);

  // }

}

