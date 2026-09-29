import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  team: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.http.get<any>('/data/posts.json').subscribe((data) => {
      this.team = [];

      for (let post of data.posts) {
        let exists = false;

        for (let member of this.team) {
          if (member.name === post.author.name) {
            exists = true;
          }
        }

        if (exists === false) {
          this.team.push(post.author);
        }
      }

      this.cdr.detectChanges();
    });
  }
}
