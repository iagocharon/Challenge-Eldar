import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './components/albums/albums.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { PostsComponent } from './components/posts/posts.component';
import { TodosComponent } from './components/todos/todos.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'albums',
        component: AlbumsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'todos',
        component: TodosComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
