import { Component, AfterViewInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { WebsiteService } from '../services/website.service';

declare var Splide: any;
declare var bootstrap: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements AfterViewInit {
  private splide: any;
  articles: any[] = [];
  currentPage = 1;
  totalPages = 0;
  pageSize = 6;
  website: any;
  Array: any;

  constructor(
    private articleService: ArticleService,
    private websiteservice: WebsiteService
  ) {}

  ngOnInit(): void {
    this.load6Articles();
    this.fetchWebsite();
  }

  ngAfterViewInit(): void {
    new Splide('#carousel-slider', {
      arrows: true,
      type: 'fade',
      rewind: true,
      perPage: 1,
      autoplay: false,
      interval: 3000,
      pauseOnHover: false,
      pauseOnFocus: false,
    }).mount();

    this.splide = new Splide('#article-slider', {
      perPage: 3,
      gap: '1rem',
      pagination: false,
      arrows: false,

      padding: {
        left: 0,
        right: '50%',
      },

      breakpoints: {
        768: {
          perPage: 2,
          gap: '1rem',
        },
        576: {
          perPage: 1,
          gap: '1rem',
        },
      },
    });

    this.splide.mount();

    new Splide('#testimonial-slider', {
      perPage: 3,
      gap: '2rem',
      pagination: false,
      arrows: true,
      breakpoints: {
        768: { perPage: 2 },
        576: { perPage: 1 },
      },
    }).mount();
  }

  goPrev() {
    this.splide.go('<');
  }

  goNext() {
    this.splide.go('>');
  }

  truncateHTML(html: string, maxLength: number): string {
    if (!html) return '';

    // Strip HTML tags temporarily to count characters
    const div = document.createElement('div');
    div.innerHTML = html;
    let text = div.textContent || div.innerText || '';

    if (text.length > maxLength) {
      text = text.substr(0, maxLength) + '...';
    }

    // Keep original HTML structure but truncate text nodes
    div.textContent = text;
    return div.innerHTML;
  }

  load6Articles(): void {
    this.articleService.getLatestSixArticles().subscribe((data) => {
      this.articles = data;

      console.log('Articles:', this.articles);

      setTimeout(() => {
        if (this.splide) this.splide.refresh();
      }, 200);
    });
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
  
  sendWhatsappMessageBelly() {
    const message = `Halo, Saya Mau Booking Terapi Belly Package`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageHangover() {
    const message = `Halo, Saya Mau Booking Terapi Hangover Package`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }
  
  sendWhatsappMessageImmune() {
    const message = `Halo, Saya Mau Booking Terapi IV Immune Booster Package`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageJetLag() {
    const message = `Halo, Saya Mau Booking Terapi Jet Lag Package`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageDengue() {
    const message = `Halo, Saya Mau Booking Terapi Dengue Package`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageFlu() {
    const message = `Halo, Saya Mau Booking Terapi Flu Package`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageDoctor() {
    const message = `Halo, Saya Mau Booking Layanan Doctor Consultation`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageCall() {
    const message = `Halo, Saya Mau Booking Layanan On Call Service`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageTreatment() {
    const message = `Halo, Saya Mau Booking Layanan Wound Treatment`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageLaboratory() {
    const message = `Halo, Saya Mau Booking Layanan Laboratory Testing`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageStd() {
    const message = `Halo, Saya Mau Booking Layanan STD Testing`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

}
