import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AddArticleRoutingModule } from './add-article-routing.module';
import { AddArticleComponent } from './add-article.component';


@NgModule({
  declarations: [
    AddArticleComponent
  ],
  imports: [
    CommonModule,
    AddArticleRoutingModule,
    FormsModule
  ]
})
export class AddArticleModule { }
