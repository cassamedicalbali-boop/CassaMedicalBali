import { Component, AfterViewInit } from '@angular/core';
import { WebsiteService } from '../services/website.service';

declare var Splide: any;

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.css'],
})
export class AboutUsPageComponent implements AfterViewInit {
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

  ngAfterViewInit(): void {
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
}
