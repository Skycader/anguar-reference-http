import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { StreamComponent } from './stream/stream.component';
import { SingletonComponent } from './singleton/singleton.component';
import { Singleton2Component } from './singleton2/singleton2.component'

@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    SingletonComponent,
    Singleton2Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
