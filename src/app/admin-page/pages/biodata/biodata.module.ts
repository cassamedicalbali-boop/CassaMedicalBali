import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { BiodataRoutingModule } from './biodata-routing.module';
import { BiodataComponent } from './biodata.component';


@NgModule({
  declarations: [
    BiodataComponent
  ],
  imports: [
    CommonModule,
    BiodataRoutingModule,
    FormsModule
  ]
})
export class BiodataModule { }
