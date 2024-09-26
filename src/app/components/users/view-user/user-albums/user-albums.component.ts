import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Album } from 'src/app/models/album.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-albums',
  templateUrl: './user-albums.component.html',
  styleUrls: ['./user-albums.component.scss'],
})
export class UserAlbumsComponent implements OnInit {
  albums: Album[] = [];
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
    this.getAlbums();
  }

  getAlbums() {
    this.dataService.getAlbumsByUserId(this.user.id).subscribe((data: any) => {
      this.albums = data as Album[];
    });
  }

  deleteAlbum(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres borrar el álbum con ID ${id}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteAlbum(id).subscribe(
          (data) => {
            this.getAlbums();
            this.messageService.add({
              severity: 'success',
              summary: 'Álbum Borrado',
              detail: 'El álbum se ha borrado correctamente',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error al Borrar',
              detail:
                'Ocurrió un error al borrar el album. Inténtalo de nuevo.',
            });
            console.error('Error al borrar el album:', error);
          }
        );
      },
      reject: () => {},
    });
  }
}
