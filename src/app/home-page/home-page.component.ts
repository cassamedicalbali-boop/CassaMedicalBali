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
        848:{
          perPage: 2,
          gap: '1rem',
        },
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
        848: { perPage: 2 },
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
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for medical assistance. Can you assist me with available time slot, please? Thank you.`;
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
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for Bali Belly Treatment. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageHangover() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for Hangover Package. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }
  
  sendWhatsappMessageImmune() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for Immune Booster. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageJetLag() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for Jet Lag Package. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageDengue() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for Dengue Package. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageFlu() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for Flu Package. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageDoctor() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for Doctor Consultation. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageCall() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for On Call Service. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageTreatment() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for Wound Treatment. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageLaboratory() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for Laboratory Testing. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

  sendWhatsappMessageStd() {
    const message = `Hello Cassa Medical Clinic, I would like to make an appointment for STD testing. Can you assist me with available time slot, please? Thank you.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(this.website.whatsappNumber)}&text=${message}`;
  
    window.open(whatsappUrl, '_blank');
  }

}
