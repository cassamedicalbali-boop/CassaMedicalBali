import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Jodit } from 'jodit';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit, OnDestroy {
  @ViewChild('editor', { static: true }) editorElement!: ElementRef;
  jodit!: Jodit;
  content: string = '';

  // Form fields
  title: string = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  selectedDate: string = '';
  selectedCategory: string = '';

  filteredArticles: any[] = [];

  constructor(private articleservice: ArticleService) {}

  ngOnInit(): void {
    // Initialize Jodit editor
    this.jodit = Jodit.make(this.editorElement.nativeElement, {
      height: 400,
      toolbarSticky: true,
      uploader: { insertImageAsBase64URI: true },
      placeholder: 'Start typing here...',
    });

    // Initialize empty content
    this.jodit.value = this.content;

    // Sync editor content with component property
    this.jodit.events.on('change', (value: string) => {
      this.content = value;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;

    if (this.selectedFile) {
      this.previewUrl = URL.createObjectURL(this.selectedFile);
    } else {
      this.previewUrl = null;
    }
  }

  submitArticle() {
    if (!this.selectedFile || !this.title || !this.jodit || !this.jodit.value) {
      alert('Please fill in all fields, write content, and select an image.');
      return;
    }

    // Convert Jodit content to array
    const descriptionArray = this.jodit.value
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('image', this.selectedFile);
    formData.append('description', JSON.stringify(descriptionArray));

    // Use selected date or today
    const today = new Date().toISOString().split('T')[0];
    formData.append('date', this.selectedDate || today);

    // Optional category
    if (this.selectedCategory) {
      formData.append('category', this.selectedCategory);
    }

    this.articleservice.createArticle(formData).subscribe(
      (response) => {
        console.log('Article uploaded successfully:', response);
        alert('Article uploaded successfully!');
        const newArticle = { ...response, category: this.selectedCategory };
        this.filteredArticles = [...this.filteredArticles, newArticle];
        this.resetFormArticle();
      },
      (error) => {
        console.error('Upload failed', error);
        alert('Failed to upload article');
      }
    );
  }

  resetFormArticle() {
    this.title = '';
    this.selectedFile = null;
    this.selectedDate = '';
    this.selectedCategory = '';
    this.jodit.value = '';
  }

  ngOnDestroy(): void {
    if (this.jodit) {
      this.jodit.destruct();
    }
  }
}
