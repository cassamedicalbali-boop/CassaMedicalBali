import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiodataComponent } from './biodata.component';

const routes: Routes = [{ path: '', component: BiodataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiodataRoutingModule { }
