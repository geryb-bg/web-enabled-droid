import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatToolbarModule, MatSliderModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatToolbarModule, MatSliderModule],
  exports: [MatButtonModule, MatCardModule, MatToolbarModule, MatSliderModule]
})
export class CustomMaterialModule { }
