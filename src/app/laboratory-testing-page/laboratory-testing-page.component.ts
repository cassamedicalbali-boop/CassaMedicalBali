import { Component } from '@angular/core';
import { WebsiteService } from '../services/website.service';

@Component({
  selector: 'app-laboratory-testing-page',
  templateUrl: './laboratory-testing-page.component.html',
  styleUrls: ['./laboratory-testing-page.component.css']
})
export class LaboratoryTestingPageComponent {
   website: any;

   constructor(
      private websiteservice: WebsiteService
    ) {}

/*************  ✨ Windsurf Command ⭐  *************/
/*******  f4a44dde-895d-4238-9539-d287a105b603  *******/
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
    const message = `Halo, Saya Mau Booking Layanan Laboratory Testing`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }
}
