import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharitylistPage } from './charitylist';

@NgModule({
  declarations: [
    CharitylistPage,
  ],
  imports: [
    IonicPageModule.forChild(CharitylistPage),
  ],
})
export class CharitylistPageModule {}
