// PrimeNg
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PaginatorModule } from 'primeng/paginator';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Para el binding de formularios
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { EditAlbumComponent } from './components/albums/edit-album/edit-album.component';
import { NewAlbumComponent } from './components/albums/new-album/new-album.component';
import { NewPhotoComponent } from './components/albums/view-album/new-photo/new-photo.component';
import { ViewAlbumComponent } from './components/albums/view-album/view-album.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { NewCommentComponent } from './components/posts/view-post/new-comment/new-comment.component';
import { ViewPostComponent } from './components/posts/view-post/view-post.component';
import { EditTodoComponent } from './components/todos/edit-todo/edit-todo.component';
import { NewTodoComponent } from './components/todos/new-todo/new-todo.component';
import { TodosComponent } from './components/todos/todos.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { UsersComponent } from './components/users/users.component';
import { ViewUserComponent } from './components/users/view-user/view-user.component';
import { interceptorProvider } from './services/interceptor.service';
import { UserInfoComponent } from './components/users/view-user/user-info/user-info.component';
import { UserPostsComponent } from './components/users/view-user/user-posts/user-posts.component';
import { UserAlbumsComponent } from './components/users/view-user/user-albums/user-albums.component';
import { UserTodosComponent } from './components/users/view-user/user-todos/user-todos.component';
import { LoginTutorialComponent } from './components/auth/login-tutorial/login-tutorial.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    MainComponent,
    PostsComponent,
    AlbumsComponent,
    UsersComponent,
    NewPostComponent,
    ViewPostComponent,
    EditPostComponent,
    ViewUserComponent,
    EditUserComponent,
    NewUserComponent,
    NewAlbumComponent,
    EditAlbumComponent,
    ViewAlbumComponent,
    NewCommentComponent,
    NewPhotoComponent,
    TodosComponent,
    EditTodoComponent,
    NewTodoComponent,
    UserInfoComponent,
    UserPostsComponent,
    UserAlbumsComponent,
    UserTodosComponent,
    LoginTutorialComponent,
  ],
  imports: [
    // PrimeNg
    InputTextModule,
    ButtonModule,
    CardModule,
    ToastModule,
    MenubarModule,
    MenuModule,
    PaginatorModule,
    TableModule,
    AutoCompleteModule,
    ConfirmPopupModule,
    DialogModule,
    InputTextareaModule,
    AccordionModule,
    DividerModule,
    DataViewModule,
    CarouselModule,
    GalleriaModule,
    FileUploadModule,
    SidebarModule,
    PanelMenuModule,
    CheckboxModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [interceptorProvider, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
