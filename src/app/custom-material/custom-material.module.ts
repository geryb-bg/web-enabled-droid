import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatToolbarModule, MatSliderModule, MatTabsModule, MatDividerModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatToolbarModule, MatSliderModule, MatTabsModule, MatDividerModule],
  exports: [MatButtonModule, MatCardModule, MatToolbarModule, MatSliderModule, MatTabsModule, MatDividerModule]
})
export class CustomMaterialModule { }
