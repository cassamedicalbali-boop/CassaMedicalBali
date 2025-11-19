import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';


@NgModule({
  declarations: [
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    FormsModule
  ]
})
export class ArticlesModule { }
