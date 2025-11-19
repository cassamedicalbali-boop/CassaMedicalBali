import { Component } from '@angular/core';
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.component.html',
  styleUrls: ['./biodata.component.css'],
})
export class BiodataComponent {
  website: any;
  selectedFile: File | null = null;

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
  saveBiodata(): void {
    if (!this.website) return;

    const formData = new FormData();
    formData.append('aboutus', this.website.aboutus || '');
    formData.append('whatsappLink', this.website.whatsappLink || '');
    formData.append('whatsappNumber', this.website.whatsappNumber || '');
    formData.append('alamat', this.website.alamat || '');
    formData.append('linkmap', this.website.linkmap || '');
    formData.append('instagramName1', this.website.instagramName1 || '');
    formData.append('instagramLink1', this.website.instagramLink1 || '');
    formData.append('instagramName2', this.website.instagramName2 || '');
    formData.append('instagramLink2', this.website.instagramLink2 || '');
    formData.append('operationalTime', this.website.operationalTime || '');
    formData.append('email', this.website.email || '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Log FormData contents for debugging
    console.log('Saving website biodata...');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.websiteservice.updateWebsiteData(formData).subscribe({
      next: (res) => {
        console.log('Biodata saved successfully! Response:', res);
        alert('Biodata saved successfully!');
        this.website = res;
      },
      error: (err) => {
        console.error('Failed to save biodata:', err);
        alert('Failed to save biodata.');
      },
    });
  }

  onFileSelected(event: any) {
    if (!this.website) return; // Ensure website exists
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.website.imageUrl = URL.createObjectURL(file); // Preview immediately
    }
  }
}
