import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';
import { DroidControlService } from './droid-control.service';

import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';

import { AppComponent } from './app.component';
import { DriveBb8Component } from './drive-bb8/drive-bb8.component';


@NgModule({
  declarations: [
    AppComponent,
    DriveBb8Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    WebBluetoothModule.forRoot({
      enableTracing: true
    })
  ],
  providers: [DroidControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
