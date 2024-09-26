import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-photo',
  templateUrl: './new-photo.component.html',
  styleUrls: ['./new-photo.component.scss'],
})
export class NewPhotoComponent implements OnInit {
  visible: boolean = false;

  postForm: FormGroup;

  @Input() albumId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  showDialog() {
    this.visible = true;
  }

  submitForm() {
    let photo = {
      title: this.postForm.value.title,
      albumId: this.albumId,
    };

    this.dataService.createPhoto(photo).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Foto Agregada',
          detail: 'La foto se ha agregado correctamente',
        });
        this.visible = false;
        this.postForm.reset();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al Agregar',
          detail: 'Ocurrió un error al agregar la foto. Inténtalo de nuevo.',
        });
        console.error('Error al agregar la foto:', error);
      }
    );
  }
}
