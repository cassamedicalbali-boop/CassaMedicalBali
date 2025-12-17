import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { DetailArticlePageComponent } from './detail-article-page/detail-article-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DenguPackagePage } from './dengu-package-page/dengu-package-page';
import { FluPackagePage } from './flu-package-page/flu-package-page';
import { HangoverPackagePage } from './hangover-package-page/hangover-package-page';
import { ImmunePackagePage } from './immune-package-page/immune-package-page';
import { JetlagPackagePage } from './jetlag-package-page/jetlag-package-page';
import { BellyPackageComponent } from './belly-package/belly-package.component';
import { DoctorConsultationPageComponent } from './doctor-consultation-page/doctor-consultation-page.component';
import { CallServicePageComponent } from './call-service-page/call-service-page.component';
import { LaboratoryTestingPageComponent } from './laboratory-testing-page/laboratory-testing-page.component';
import { StdTestingPageComponent } from './std-testing-page/std-testing-page.component';
import { WoundTreatmentPageComponent } from './wound-treatment-page/wound-treatment-page.component';
import { LabTestPageComponent } from './lab-test-page/lab-test-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'service', component: ServicePageComponent },
  { path: 'about-us', component: AboutUsPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'article', component: ArticlePageComponent },
  { path: 'detail-article', component: DetailArticlePageComponent },
  { path: 'detail-article/:id', component: DetailArticlePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'admin', loadChildren: () => import('./admin-page/admin-page.module').then(m => m.AdminPageModule) },
  { path: 'dengue-package', component: DenguPackagePage },
  { path: 'flu-package', component: FluPackagePage },
  { path: 'hangover-package', component: HangoverPackagePage },
  { path: 'immune-package', component: ImmunePackagePage },
  { path: 'jetlag-package', component: JetlagPackagePage },
  { path: 'belly-package', component: BellyPackageComponent },
  { path: 'doctor-consultation', component: DoctorConsultationPageComponent },
  { path: 'call-service', component: CallServicePageComponent },
  { path: 'laboratory-testing', component: LaboratoryTestingPageComponent },
  { path: 'std-testing', component: StdTestingPageComponent },
  { path: 'wound-treatment', component: WoundTreatmentPageComponent },
  { path: 'lab-test', component: LabTestPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
