import { Component } from '@angular/core';
import { WebsiteService } from '../services/website.service';

@Component({
  selector: 'app-immune-package-page',
  templateUrl: './immune-package-page.html',
  styleUrls: ['./immune-package-page.css']
})
export class ImmunePackagePage {
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

  sendWhatsappMessage() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for medical assistance. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessage1() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for IV Immune Booster Premium Package. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }
  sendWhatsappMessage2() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for IV Immune Booster Ultimate Package. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }
}
