import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatToolbarModule, MatSliderModule, MatTabsModule, MatDividerModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatToolbarModule, MatSliderModule, MatTabsModule, MatDividerModule, MatCheckboxModule],
  exports: [MatButtonModule, MatCardModule, MatToolbarModule, MatSliderModule, MatTabsModule, MatDividerModule, MatCheckboxModule]
})
export class CustomMaterialModule { }