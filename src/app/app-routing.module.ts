import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostResolver } from './resolvers/post.resolver';

const routes: Routes = [
  {
    path: 'posts',
    component: PostListComponent,
    resolve: { posts: PostResolver }
  },
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
