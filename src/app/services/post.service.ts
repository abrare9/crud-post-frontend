
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostRepository } from '../repositories/post.repository';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private postRepository: PostRepository) {}

  getAllPosts(): Observable<Post[]> {
    return this.postRepository.getAllPosts();
  }


  createPost(post: Post): Observable<Post> {
    return this.postRepository.createPost(post);
  }

  deletePost(id: number): Observable<boolean> {
    return this.postRepository.deletePost(id);
  }
}
