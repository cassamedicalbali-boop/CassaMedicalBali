import { Component } from '@angular/core';
import { WebsiteService } from '../services/website.service';

@Component({
  selector: 'app-call-service-page',
  templateUrl: './call-service-page.component.html',
  styleUrls: ['./call-service-page.component.css']
})
export class CallServicePageComponent {
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
    const message = `Halo, Saya Mau Booking Layanan On Call Service`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }
}
