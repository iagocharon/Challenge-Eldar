import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.scss'],
})
export class NewAlbumComponent {
  visible: boolean = false;

  albumForm: FormGroup;

  @Input() users!: User[];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) {
    this.albumForm = this.formBuilder.group({
      title: ['', Validators.required],
      user: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  showDialog() {
    this.visible = true;
  }

  submitForm() {
    let album = {
      title: this.albumForm.value.title,
      userId: this.albumForm.value.user.id,
    };

    this.dataService.createAlbum(album).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Álbum Creado',
          detail: 'El álbum se ha creado correctamente',
        });
        this.visible = false;
        this.albumForm.reset();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al Crear',
          detail: 'Ocurrió un error al crear el álbum. Inténtalo de nuevo.',
        });
        console.error('Error al crear el álbum:', error);
      }
    );
  }
}
