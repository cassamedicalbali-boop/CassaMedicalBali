import { Component } from '@angular/core';
import { WebsiteService } from '../services/website.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent {
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
}
