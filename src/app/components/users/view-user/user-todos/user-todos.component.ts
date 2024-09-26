import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Todo } from 'src/app/models/todo.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-todos',
  templateUrl: './user-todos.component.html',
  styleUrls: ['./user-todos.component.scss'],
})
export class UserTodosComponent implements OnInit {
  todos: Todo[] = [];
  @Input() users: User[] = [];
  @Input() user!: User;
  @Input() isAdmin!: boolean;

  mobile: boolean = window.innerWidth < 768;

  constructor(
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.dataService.getTodosByUserId(this.user.id).subscribe((data) => {
      this.todos = data as Todo[];
    });
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
}
