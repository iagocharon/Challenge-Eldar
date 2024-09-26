import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {
  posts!: Post[];
  @Input() users!: User[];
  @Input() user!: User;
  @Input() isAdmin!: boolean;

  mobile: boolean = window.innerWidth < 768;

  constructor(
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.dataService.getPostsByUserId(this.user.id).subscribe((data) => {
      this.posts = data as Post[];
    });
  }

  deletePost(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres borrar el posteo con ID ${id}?`,
      icon: 'pi pi-exclamation-triangle',
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
                'Ocurrió un error al borrar el posteo. Inténtalo de nuevo.',
            });
            console.error('Error al borrar el posteo:', error);
          }
        );
      },
      reject: () => {},
    });
  }
}
