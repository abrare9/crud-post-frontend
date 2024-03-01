import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: Post;
  @Output() postDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private postService: PostService, private snackBar: MatSnackBar) { }

  deletePost(postId: number | undefined): void {
    if (postId === undefined) {
      console.error('Post ID is undefined');
      return;
    }

    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.postDeleted.emit(postId);
        this.openSnackBar('le post est supprimé', 'Fermer');
      },
      error: (error: any) => {
        this.openSnackBar('Erreur lors de la suppression du post', 'fermer');
      },
      complete: () => {
        console.log('Delete post observable completed');
      }
    });
  }


  private openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    this.snackBar.open(message, action, config);
  }
}
