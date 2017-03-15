import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component'
import {FusejsModule} from 'angular-fusejs'

@NgModule({
  imports: [
    BrowserModule,
    FusejsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
