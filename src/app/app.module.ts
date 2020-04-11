import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputFieldModule } from './input-field/input-field.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InputFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
