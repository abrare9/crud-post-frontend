import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Post } from '../models/post.model';
import { inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { map } from 'rxjs/operators';

export const PostResolver: ResolveFn<Post[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  postsService: PostService = inject(PostService)
): Observable<Post[]> => postsService.getAllPosts()
  .pipe(
    map(posts => posts.filter(post => post !== null))
  );
