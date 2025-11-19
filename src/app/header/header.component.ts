import { Component } from '@angular/core';
import { WebsiteService } from '../services/website.service';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  website: any;

  constructor(private websiteservice: WebsiteService) {}

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
    const message = `Halo, Saya Mau Booking`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }
     closeOffcanvas(): void {
    const offcanvasElement = document.getElementById('navbarOffcanvasLg');
    if (offcanvasElement) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
