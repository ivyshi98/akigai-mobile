import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LottieAnimationViewModule } from 'ng-lottie';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { HttpModule } from '@angular/http';
import { ProfilePage } from '../pages/profile/profile';
import { MenuPageModule } from '../pages/menu/menu.module';
import { FeedPageModule } from '../pages/feed/feed.module';
import { CharitylistPageModule } from '../pages/charitylist/charitylist.module';
import { PortfolioPageModule } from '../pages/portfolio/portfolio.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { CharitydetailPage } from '../pages/charitydetail/charitydetail';
import { CharityfilterPage } from '../pages/charityfilter/charityfilter';
import { PaymentMethodsPage } from '../pages/payment-methods/payment-methods';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    ProfilePage,
    CharitydetailPage,
    CharityfilterPage,
    PaymentMethodsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FeedPageModule,
    CharitylistPageModule,
    PortfolioPageModule,
    MenuPageModule,
    TabsPageModule,
    LottieAnimationViewModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    ProfilePage,
    CharitydetailPage,
    CharityfilterPage,
    PaymentMethodsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
