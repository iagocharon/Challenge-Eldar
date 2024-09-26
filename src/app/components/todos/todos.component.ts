import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Todo } from 'src/app/models/todo.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos!: Todo[];
  filteredTodos!: Todo[];
  searchQuery: string = '';
  filteredSuggestions: Todo[] = [];

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
    this.getTodos();
    this.getUsers();
  }

  checkAdmin() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  getTodos() {
    this.dataService.getTodos().subscribe((data) => {
      this.todos = data as Todo[];
      this.filteredTodos = this.todos;
    });
  }

  getUsers() {
    this.dataService.getUsers().subscribe((data) => {
      this.users = data as User[];
    });
  }

  filterTodos() {
    if (this.searchQuery) {
      this.filteredTodos = this.todos.filter((todo) =>
        todo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredTodos = this.todos;
    }
  }

  searchTodoSuggestions(event: any) {
    const query = event.query.toLowerCase();
    this.filteredSuggestions = this.todos.filter((todo) =>
      todo.title.toLowerCase().includes(query)
    );
  }

  filterTodosBySelected(event: any) {
    let todo = event.value as Todo;
    this.filteredTodos = [todo];
  }

  filterTodosByUser() {
    if (this.selectedUser) {
      this.filteredTodos = this.todos.filter(
        (todo) => todo.userId === this.selectedUser!.id
      );
    } else {
      this.filteredTodos = this.todos;
    }
  }

  getUserNameById(userId: number): string | undefined {
    const user = this.users.find((user) => user.id === userId);
    return user ? user.name : undefined;
  }

  deleteTodo(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres borrar el to-do con ID ${id}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.dataService.deleteTodo(id).subscribe(
          () => {
            this.getTodos();
            this.messageService.add({
              severity: 'success',
              summary: 'To-do Borrado',
              detail: 'El to-do se ha borrado correctamente',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error al Borrar',
              detail:
                'Ocurrió un error al borrar el to-do. Inténtalo de nuevo.',
            });
            console.error('Error al borrar el to-do:', error);
          }
        );
      },
      reject: () => {},
    });
  }

  onChange(todo: Todo) {
    this.dataService.updateTodo(todo).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'To-do Actualizado',
          detail: 'El to-do se ha actualizado correctamente',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al Actualizar',
          detail:
            'Ocurrió un error al actualizar el to-do. Inténtalo de nuevo.',
        });
        console.error('Error al actualizar el to-do:', error);
      }
    );
  }

  cleanFilters() {
    this.searchQuery = '';
    this.selectedUser = null;
    this.filteredTodos = this.todos;
  }
}
