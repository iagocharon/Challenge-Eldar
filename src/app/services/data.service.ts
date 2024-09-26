import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  public getPost(id: number) {
    return this.httpClient.get(
      environment.apiURL + environment.postsURL + '/' + id
    );
  }

  public getPosts() {
    return this.httpClient.get(environment.apiURL + environment.postsURL);
  }

  public createPost(post: any) {
    return this.httpClient.post(
      environment.apiURL + environment.postsURL,
      post
    );
  }

  public updatePost(post: any) {
    return this.httpClient.put(
      environment.apiURL + environment.postsURL + '/' + post.id,
      post
    );
  }

  public deletePost(id: number) {
    return this.httpClient.delete(
      environment.apiURL + environment.postsURL + '/' + id
    );
  }

  public getUser(id: number) {
    return this.httpClient.get(
      environment.apiURL + environment.usersURL + '/' + id
    );
  }

  public getUsers() {
    return this.httpClient.get(environment.apiURL + environment.usersURL);
  }

  public createUser(user: any) {
    return this.httpClient.post(
      environment.apiURL + environment.usersURL,
      user
    );
  }

  public updateUser(user: any) {
    return this.httpClient.put(
      environment.apiURL + environment.usersURL + '/' + user.id,
      user
    );
  }

  public deleteUser(id: number) {
    return this.httpClient.delete(
      environment.apiURL + environment.usersURL + '/' + id
    );
  }

  public getComments(postId: number) {
    return this.httpClient.get(
      environment.apiURL + environment.commentsURL + '?postId=' + postId
    );
  }

  public getPostsByUserId(userId: number) {
    return this.httpClient.get(
      environment.apiURL + environment.postsURL + '?userId=' + userId
    );
  }

  public getAlbums() {
    return this.httpClient.get(environment.apiURL + environment.albumsURL);
  }

  public createAlbum(album: any) {
    return this.httpClient.post(
      environment.apiURL + environment.albumsURL,
      album
    );
  }

  public updateAlbum(album: any) {
    return this.httpClient.put(
      environment.apiURL + environment.albumsURL + '/' + album.id,
      album
    );
  }

  public getPhotos(id: number) {
    return this.httpClient.get(
      environment.apiURL + environment.photosURL + '?albumId=' + id
    );
  }

  public getAlbumsByUserId(userId: number) {
    return this.httpClient.get(
      environment.apiURL + environment.albumsURL + '?userId=' + userId
    );
  }

  public deleteAlbum(id: number) {
    return this.httpClient.delete(
      environment.apiURL + environment.albumsURL + '/' + id
    );
  }

  public createComment(comment: any) {
    return this.httpClient.post(
      environment.apiURL + environment.commentsURL,
      comment
    );
  }

  public createPhoto(photo: any) {
    return this.httpClient.post(
      environment.apiURL + environment.photosURL,
      photo
    );
  }

  public getTodos() {
    return this.httpClient.get(environment.apiURL + environment.todosURL);
  }

  public getTodosByUserId(userId: number) {
    return this.httpClient.get(
      environment.apiURL + environment.todosURL + '?userId=' + userId
    );
  }

  public createTodo(todo: any) {
    return this.httpClient.post(
      environment.apiURL + environment.todosURL,
      todo
    );
  }

  public updateTodo(todo: any) {
    return this.httpClient.put(
      environment.apiURL + environment.todosURL + '/' + todo.id,
      todo
    );
  }

  public deleteTodo(id: number) {
    return this.httpClient.delete(
      environment.apiURL + environment.todosURL + '/' + id
    );
  }
}
