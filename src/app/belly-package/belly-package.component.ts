import { Component } from '@angular/core';
import { WebsiteService } from '../services/website.service';

@Component({
  selector: 'app-belly-package',
  templateUrl: './belly-package.component.html',
  styleUrls: ['./belly-package.component.css']
})
export class BellyPackageComponent{
  
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
    const message = `Halo, Saya Mau Booking Paket Bali Belly Premium`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }
  sendWhatsappMessage2() {
    const message = `Halo, Saya Mau Booking Paket Bali Belly Ultimate`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }
}
