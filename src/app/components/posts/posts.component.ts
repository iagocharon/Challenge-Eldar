import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts!: Post[];
  filteredPosts!: Post[];
  searchQuery: string = '';
  filteredSuggestions: Post[] = [];

  users!: User[];
  selectedUser!: User | null;

  mobile: boolean = window.innerWidth < 768;
  isAdmin!: boolean;

  constructor(
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.checkAdmin();
    this.getPosts();
    this.getUsers();
  }

  checkAdmin() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  getPosts() {
    this.dataService.getPosts().subscribe((data) => {
      this.posts = data as Post[];
      this.filteredPosts = this.posts;
    });
  }

  getUsers() {
    this.dataService.getUsers().subscribe((data) => {
      this.users = data as User[];
    });
  }

  filterPosts() {
    if (this.searchQuery) {
      this.filteredPosts = this.posts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredPosts = this.posts;
    }
  }

  searchPostSuggestions(event: any) {
    const query = event.query.toLowerCase();
    this.filteredSuggestions = this.posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
  }

  filterPostsBySelected(event: any) {
    let post = event.value as Post;
    console.log(post);
    this.filteredPosts = [post];
    console.log(post);
  }

  filterPostsByUser() {
    if (this.selectedUser) {
      this.filteredPosts = this.posts.filter(
        (post) => post.userId === this.selectedUser!.id
      );
    } else {
      this.filteredPosts = this.posts;
    }
  }

  getUserNameById(userId: number): string | undefined {
    const user = this.users.find((user) => user.id === userId);
    return user ? user.name : undefined;
  }

  deletePost(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres borrar el posteo con ID ${id}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.dataService.deletePost(id).subscribe(
          (data) => {
            this.getPosts();
            this.messageService.add({
              severity: 'success',
              summary: 'Posteo Borrado',
              detail: 'El posteo se ha borrado correctamente',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error al Borrar',
              detail:
                'Ocurrió un error al borrar la publicación. Inténtalo de nuevo.',
            });
            console.error('Error al borrar la publicación:', error);
          }
        );
      },
      reject: () => {},
    });
  }

  cleanFilters() {
    this.searchQuery = '';
    this.selectedUser = null;
    this.filteredPosts = this.posts;
  }
}
