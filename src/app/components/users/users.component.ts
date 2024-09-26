import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users!: User[];
  filteredUsers!: User[];
  searchQuery: string = '';
  filteredSuggestions: User[] = [];

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
    this.getUsers();
  }

  checkAdmin() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  getUsers() {
    this.dataService.getUsers().subscribe((data) => {
      this.users = data as User[];
      this.filteredUsers = this.users;
      console.log(this.users);
    });
  }

  filterUsers() {
    if (this.searchQuery) {
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;
    }
  }

  searchUserSuggestions(event: any) {
    const query = event.query.toLowerCase();
    this.filteredSuggestions = this.users.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
  }

  filterUsersBySelected(event: any) {
    let user = event.value as User;
    this.filteredUsers = [user];
  }

  cleanFilters() {
    this.searchQuery = '';
    this.filteredUsers = this.users;
  }

  deleteUser(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres borrar el usuario con ID ${id}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteUser(id).subscribe(
          (data) => {
            this.getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Usuario Borrado',
              detail: 'El usuario se ha borrado correctamente',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error al Crear',
              detail:
                'Ocurrió un error al crear el usuario. Inténtalo de nuevo.',
            });
            console.error('Error al crear el usuario:', error);
          }
        );
      },
      reject: () => {},
    });
  }
}
