import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  visible: boolean = false;

  postForm: FormGroup;

  @Input() users!: User[];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      user: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  showDialog() {
    this.visible = true;
  }

  submitForm() {
    let post = {
      title: this.postForm.value.title,
      body: this.postForm.value.body,
      userId: this.postForm.value.user.id,
    };

    this.dataService.createPost(post).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Publicación Creada',
          detail: 'La publicación se ha creado correctamente',
        });
        this.visible = false;
        this.postForm.reset();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al Crear',
          detail:
            'Ocurrió un error al crear la publicación. Inténtalo de nuevo.',
        });
        console.error('Error al crear la publicación:', error);
      }
    );
  }
}
