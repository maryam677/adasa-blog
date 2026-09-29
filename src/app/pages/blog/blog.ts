import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];

  selectedCategory: string = 'الكل';
  viewMode: string = 'grid';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.http.get<any>('/data/posts.json').subscribe((data) => {
      this.posts = data.posts;
      this.filteredPosts = data.posts;

      this.cdr.detectChanges();
    });
  }

  filterCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredPosts = [];

    if (category === 'الكل') {
      this.filteredPosts = this.posts;
    } else {
      for (let post of this.posts) {
        if (post.category === category) {
          this.filteredPosts.push(post);
        }
      }
    }
  }

  search(event: any): void {
    let value = event.target.value.toLowerCase();

    this.filteredPosts = [];

    for (let post of this.posts) {
      if (post.title.toLowerCase().includes(value)) {
        this.filteredPosts.push(post);
      }
    }
  }

  changeView(view: string): void {
    this.viewMode = view;
  }
}
