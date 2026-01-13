import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module')
            .then(m => m.DashboardModule)
      },
      {
        path: 'articles',
        loadChildren: () =>
          import('./pages/articles/articles.module')
            .then(m => m.ArticlesModule)
      },
      {
        path: 'biodata',
        loadChildren: () => import('./pages/biodata/biodata.module')
        .then(m => m.BiodataModule)
      },
      {
        path: 'add-article', loadChildren: () => import('./pages/add-article/add-article.module').then(m => m.AddArticleModule)
      },
      {
        path: 'edit-article', loadChildren: () => import('./pages/edit-article/edit-article.module').then(m => m.EditArticleModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
