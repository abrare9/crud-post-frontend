import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostRepository {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }



  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  deletePost(id: number): Observable<boolean> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
