import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
})
export class NewTodoComponent implements OnInit {
  visible: boolean = false;

  todoForm: FormGroup;

  @Input() users!: User[];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      user: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  showDialog() {
    this.visible = true;
  }

  submitForm() {
    let todo = {
      title: this.todoForm.value.title,
      userId: this.todoForm.value.user.id,
      completed: false,
    };

    this.dataService.createTodo(todo).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'To-Do Creado',
          detail: 'El To-Do se ha creado correctamente',
        });
        this.visible = false;
        this.todoForm.reset();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al Crear',
          detail: 'Ocurrió un error al crear el to-do. Inténtalo de nuevo.',
        });
        console.error('Error al crear el to-do:', error);
      }
    );
  }
}
