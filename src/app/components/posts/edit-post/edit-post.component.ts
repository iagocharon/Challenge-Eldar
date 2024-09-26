import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  visible: boolean = false;

  postForm: FormGroup;

  @Input() post!: Post;
  @Input() users!: User[];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) {
    this.postForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required],
      user: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.postForm.controls['id'].setValue(this.post.id);
    this.postForm.controls['title'].setValue(this.post.title);
    this.postForm.controls['body'].setValue(this.post.body);
    this.postForm.controls['user'].setValue(this.getUserById(this.post.userId));
  }

  showDialog() {
    this.visible = true;
  }

  submitForm() {
    let post = {
      title: this.postForm.value.title,
      body: this.postForm.value.body,
      userId: this.postForm.value.user.id,
    };

    this.dataService.updatePost(post).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Publicación Actualizada',
          detail: 'La publicación se ha actualizado correctamente',
        });
        this.visible = false;
        this.postForm.reset();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al Actualizar',
          detail:
            'Ocurrió un error al actualizar la publicación. Inténtalo de nuevo.',
        });
        console.error('Error al actualizar la publicación:', error);
      }
    );
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
