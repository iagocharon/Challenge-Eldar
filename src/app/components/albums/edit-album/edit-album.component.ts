import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Album } from 'src/app/models/album.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss'],
})
export class EditAlbumComponent implements OnInit {
  visible: boolean = false;

  albumForm: FormGroup;

  @Input() album!: Album;
  @Input() users!: User[];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) {
    this.albumForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      user: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.albumForm.controls['id'].setValue(this.album.id);
    this.albumForm.controls['title'].setValue(this.album.title);
    this.albumForm.controls['user'].setValue(
      this.getUserById(this.album.userId)
    );
  }

  showDialog() {
    this.visible = true;
  }

  submitForm() {
    let album = {
      id: this.albumForm.value.id,
      title: this.albumForm.value.title,
      userId: this.albumForm.value.user.id,
    };
    this.dataService.updateAlbum(album).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Álbum Actualizado',
          detail: 'El álbum se ha actualizado correctamente',
        });
        this.visible = false;
        this.albumForm.reset();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al Actualizar',
          detail:
            'Ocurrió un error al actualizar el álbum. Inténtalo de nuevo.',
        });
        console.error('Error al actualizar el álbum:', error);
      }
    );
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
