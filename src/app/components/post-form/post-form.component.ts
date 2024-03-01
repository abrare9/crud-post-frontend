import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../models/post.model';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  post: Post = { title: '', content: '' };
  title: string;
  formGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<PostFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private snackBar: MatSnackBar
) {
    this.title = data.title; // Assign the title from the data passed to the component
  }

  ngOnInit() {
    this.createForm();
  }
  savePost(): void {
    this.postService.createPost(this.post).subscribe(
      {
        next: newPost => {
          this.dialogRef.close(newPost);
        },
        error: error => {
          console.error('Error saving post:', error);
        },
        complete: () => {
          const config = new MatSnackBarConfig();
          config.duration = 3000;
          this.snackBar.open('Le post a été créé avec succès', 'Fermer', config);
        }
      }
    );
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'title': [null, Validators.required],
      'content': [null, [Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
    });
  }
  onSubmit(post : Post) {
    this.post = post;
    this.savePost();
  }

}
