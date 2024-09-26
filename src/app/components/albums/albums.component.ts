import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Album } from 'src/app/models/album.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  albums!: Album[];
  filteredAlbums!: Album[];
  searchQuery: string = '';
  filteredSuggestions: Album[] = [];

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
    this.getAlbums();
    this.getUsers();
  }

  checkAdmin() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  getAlbums() {
    this.dataService.getAlbums().subscribe((data: any) => {
      this.albums = data as Album[];
      this.filteredAlbums = this.albums;
    });
  }

  getUsers() {
    this.dataService.getUsers().subscribe((data) => {
      this.users = data as User[];
    });
  }

  filterAlbums() {
    if (this.searchQuery) {
      this.filteredAlbums = this.albums.filter((album) =>
        album.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredAlbums = this.albums;
    }
  }

  searchAlbumSuggestions(event: any) {
    const query = event.query.toLowerCase();
    this.filteredSuggestions = this.albums.filter((album) =>
      album.title.toLowerCase().includes(query)
    );
  }

  filterAlbumsBySelected(event: any) {
    let album = event.value as Album;
    console.log(album);
    this.filteredAlbums = [album];
    console.log(album);
  }

  filterAlbumsByUser() {
    if (this.selectedUser) {
      this.filteredAlbums = this.albums.filter(
        (album) => album.userId === this.selectedUser!.id
      );
    } else {
      this.filteredAlbums = this.albums;
    }
  }

  getUserNameById(userId: number): string | undefined {
    const user = this.users.find((user) => user.id === userId);
    return user ? user.name : undefined;
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
                'Ocurrió un error al borrar el álbum. Inténtalo de nuevo.',
            });
            console.error('Error al borrar el álbum:', error);
          }
        );
      },
      reject: () => {},
    });
  }

  cleanFilters() {
    this.searchQuery = '';
    this.selectedUser = null;
    this.filteredAlbums = this.albums;
  }
}
