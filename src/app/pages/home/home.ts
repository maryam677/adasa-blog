import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  posts: any[] = [];
  latestPosts: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.http.get<any>('/data/posts.json').subscribe((data) => {
      this.posts = [];
      this.latestPosts = [];

      for (let i = 0; i < 3; i++) {
        if (data.posts[i]) {
          this.posts.push(data.posts[i]);
        }
      }

      for (let i = 3; i < 6; i++) {
        if (data.posts[i]) {
          this.latestPosts.push(data.posts[i]);
        }
      }

      this.cdr.detectChanges();
    });
  }
}
