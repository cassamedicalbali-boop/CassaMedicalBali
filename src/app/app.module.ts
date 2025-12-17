import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    ServicePageComponent,
    AboutUsPageComponent,
    ContactPageComponent,
    ArticlePageComponent,
    DetailArticlePageComponent,
    LoginPageComponent,
    DenguPackagePage,
    FluPackagePage,
    HangoverPackagePage,
    ImmunePackagePage,
    JetlagPackagePage,
    BellyPackageComponent,
    DoctorConsultationPageComponent,
    CallServicePageComponent,
    LaboratoryTestingPageComponent,
    StdTestingPageComponent,
    WoundTreatmentPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
