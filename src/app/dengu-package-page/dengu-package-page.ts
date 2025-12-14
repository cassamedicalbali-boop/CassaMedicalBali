import { Component } from '@angular/core';
import { WebsiteService } from '../services/website.service';

@Component({
  selector: 'app-dengu-package-page',
  templateUrl: './dengu-package-page.html',
  styleUrls: ['./dengu-package-page.css']
})
export class DenguPackagePage {
  website: any;

   constructor(
      private websiteservice: WebsiteService
    ) {}

  ngOnInit(): void {
    this.fetchWebsite();
  }
  
   fetchWebsite(): void {
    this.websiteservice.getWebsiteData().subscribe((data) => {
      this.website = data;
      console.log('Website:', this.website);
    });
  }

  sendWhatsappMessage1() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for On Dengue Premium Package. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }
  sendWhatsappMessage2() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for On Dengue Ultimate Package. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }
   sendWhatsappMessage3() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for On DENGUE DIAGNOSTIC TEST (DAY 1-3 of FEVER) Package. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }
   sendWhatsappMessage4() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for On DENGUE MONITORING TEST (DAY 4-7 of FEVER) Package. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }
}
