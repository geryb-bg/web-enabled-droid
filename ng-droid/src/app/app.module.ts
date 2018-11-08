import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { CustomMaterialModule } from './custom-material/custom-material.module';
import { DroidControlService } from './droid-control.service';

import { AppComponent } from './app.component';
import { DriveBb8Component } from './drive-bb8/drive-bb8.component';

@NgModule({
  declarations: [
    AppComponent,
    DriveBb8Component
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [DroidControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
