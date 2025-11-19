import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { EditArticleRoutingModule } from './edit-article-routing.module';
import { EditArticleComponent } from './edit-article.component';


@NgModule({
  declarations: [
    EditArticleComponent
  ],
  imports: [
    CommonModule,
    EditArticleRoutingModule,
    FormsModule
  ]
})
export class EditArticleModule { }
