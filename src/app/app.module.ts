import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DroidControlService } from './droid-control.service';

import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';

import { AppComponent } from './app.component';
import { DriveBb8Component } from './drive-bb8/drive-bb8.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DriveBb8Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    FormsModule
  ],
  providers: [DroidControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
