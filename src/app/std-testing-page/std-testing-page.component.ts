import { Component } from '@angular/core';
import { WebsiteService } from '../services/website.service';

@Component({
  selector: 'app-std-testing-page',
  templateUrl: './std-testing-page.component.html',
  styleUrls: ['./std-testing-page.component.css']
})
export class StdTestingPageComponent {
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
    const message = `Halo, Saya Mau Booking Layanan STD Testing`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }
}
