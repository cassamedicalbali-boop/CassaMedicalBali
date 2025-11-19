import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jodit } from 'jodit';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit, OnDestroy {

  article: any = null;
  loading = true;

  selectedFile: File | null = null;
  @ViewChild('editor', { static: true }) editorElement!: ElementRef;
  jodit!: Jodit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    // Initialize Jodit editor
    this.jodit = Jodit.make(this.editorElement.nativeElement, {
      height: 400,
      toolbarSticky: true,
      uploader: { insertImageAsBase64URI: true },
      placeholder: 'Start typing here...'
    });

    // Listen to editor changes
    this.jodit.events.on('change', (value: string) => {
      this.article.description = value;
    });

    // Load article data
    this.loadArticle();
  }

  loadArticle() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) return;

    this.articleService.getArticleById(id).subscribe({
      next: (data) => {
        this.article = data;

        // Convert description array into string if needed
        const descriptionText = Array.isArray(data.description)
          ? data.description.join("\n")
          : data.description || "";

        // Set Jodit content after article is loaded
        if (this.jodit) {
          this.jodit.value = descriptionText;
        }

        // Convert ISO date string to YYYY-MM-DD for input[type=date]
        if (this.article.date) {
          this.article.date = this.article.date.split('T')[0];
        }

        this.loading = false;
        console.log("Article loaded successfully:", data);
      },
      error: (err) => {
        console.error("Error fetching article:", err);
        this.loading = false;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  updateArticle() {
    if (!this.article) return;

    const formData = new FormData();
    formData.append("title", this.article.title);

    // Use current editor content
    const editorContent = this.jodit ? this.jodit.value : "";
    formData.append(
      "description",
      JSON.stringify(editorContent.split("\n").filter(x => x.trim() !== ""))
    );

    // Append date in ISO format if needed
    if (this.article.date) {
      formData.append("date", this.article.date);
    }

    if (this.selectedFile) {
      formData.append("image", this.selectedFile);
    }

    this.articleService.updateArticle(this.article._id, formData).subscribe({
      next: () => {
        alert("Article updated successfully!");
        this.router.navigate(["/admin/articles"]);
      },
      error: (err) => {
        console.error("Update error:", err);
        alert("Failed to update article.");
      }
    });
  }

  ngOnDestroy(): void {
    if (this.jodit) {
      this.jodit.destruct();
    }
  }
}
