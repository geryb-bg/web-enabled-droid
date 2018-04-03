import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatToolbarModule, MatSliderModule, MatTabsModule, MatDividerModule, MatSlideToggleModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatToolbarModule, MatSliderModule, MatTabsModule, MatDividerModule, MatSlideToggleModule],
  exports: [MatButtonModule, MatCardModule, MatToolbarModule, MatSliderModule, MatTabsModule, MatDividerModule, MatSlideToggleModule]
})
export class CustomMaterialModule { }
