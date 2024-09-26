import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Todo } from 'src/app/models/todo.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent implements OnInit {
  visible: boolean = false;

  todoForm: FormGroup;

  @Input() todo!: Todo;
  @Input() users!: User[];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) {
    this.todoForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required],
      user: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.todoForm.controls['id'].setValue(this.todo.id);
    this.todoForm.controls['title'].setValue(this.todo.title);
    this.todoForm.controls['user'].setValue(this.getUserById(this.todo.userId));
  }

  showDialog() {
    this.visible = true;
  }

  submitForm() {
    let todo = {
      title: this.todoForm.value.title,
      body: this.todoForm.value.body,
      userId: this.todoForm.value.user.id,
      completed: this.todo.completed,
    };

    this.dataService.updateTodo(todo).subscribe(
      (data: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'To-Do Actualizado',
          detail: 'El To-Do se ha actualizado correctamente',
        });
        this.visible = false;
        this.todoForm.reset();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al Crear',
          detail:
            'Ocurrió un error al actualizar el to-do. Inténtalo de nuevo.',
        });
        console.error('Error al actualizar el to-do:', error);
      }
    );
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
