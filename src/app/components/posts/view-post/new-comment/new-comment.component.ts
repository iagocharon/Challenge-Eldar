import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {
  visible: boolean = false;

  postForm: FormGroup;

  @Input() postId!: number;
  @Input() users!: User[];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) {
    this.postForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  showDialog() {
    this.visible = true;
  }

  submitForm() {
    let comment = {
      name: this.postForm.value.name,
      email: this.postForm.value.email,
      body: this.postForm.value.body,
      postId: this.postId,
    };
    this.dataService.createComment(comment).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Comentario Publicado',
          detail: 'El comentario se ha publicado correctamente',
        });
        this.visible = false;
        this.postForm.reset();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al Publicar',
          detail:
            'Ocurrió un error al publicar el comentario. Inténtalo de nuevo.',
        });
        console.error('Error al publicar el comentario:', error);
      }
    );
  }
}
