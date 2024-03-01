import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostFormComponent} from "../post-form/post-form.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.posts = data.posts;
    });
  }

  openComponent(): void {
    const dialogRef = this.dialog.open(PostFormComponent, {
      width: '500px',
      height : '420px',
      data: {
        title: 'Créer un nouveau post'
      },
    });

    dialogRef.afterClosed().subscribe((newPost: Post) => {
      if (newPost) {
        this.posts.push(newPost);
      }
    });
  }

  deletePostFromList(postId: number): void {
    const index = this.posts.findIndex(post => post.id === postId);
    if (index !== -1) {
      this.posts.splice(index, 1);
    }
  }
}
