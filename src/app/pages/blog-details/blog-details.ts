import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css',
})
export class BlogDetails implements OnInit {
  post: any = null;
  intro: string = '';
  sections: any[] = [];
  relatedPosts: any[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let slug = params.get('slug');

      this.loadPost(slug);
    });
  }

  loadPost(slug: string | null): void {
    this.http.get<any>('/data/posts.json').subscribe((data) => {
      this.post = null;
      this.relatedPosts = [];

      for (let item of data.posts) {
        if (item.slug === slug) {
          this.post = item;

          break;
        }
      }

      if (this.post) {
        this.createSections();

        for (let item of data.posts) {
          if (item.category === this.post.category && item.slug !== this.post.slug) {
            this.relatedPosts.push(item);
          }

          if (this.relatedPosts.length === 3) {
            break;
          }
        }
      }

      this.cdr.detectChanges();
    });
  }

  createSections(): void {
    this.sections = [];
    this.intro = '';

    if (!this.post || !this.post.content) {
      return;
    }

    let parts = this.post.content.split('##');

    this.intro = parts[0].trim();

    for (let i = 1; i < parts.length; i++) {
      let text = parts[i].trim();

      if (text !== '') {
        let lines = text.split('\n');

        let title = lines[0].trim();

        let content = '';

        for (let x = 1; x < lines.length; x++) {
          content += lines[x];

          if (x < lines.length - 1) {
            content += '\n';
          }
        }

        this.sections.push({
          title: title,
          content: content.trim(),
        });
      }
    }
  }
}
