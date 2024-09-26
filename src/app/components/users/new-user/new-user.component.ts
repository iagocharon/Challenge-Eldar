import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent {
  visible: boolean = false;

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      suite: [''],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      companyName: ['', Validators.required],
      catchPhrase: ['', Validators.required],
      bs: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  showDialog() {
    this.visible = true;
  }

  submitForm() {
    let user = {
      name: this.userForm.value.name,
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      address: {
        street: this.userForm.value.street,
        suite: this.userForm.value.suite,
        city: this.userForm.value.city,
        zipcode: this.userForm.value.zipcode,
        geo: {
          lat: this.userForm.value.lat,
          lng: this.userForm.value.lng,
        },
      },
      phone: this.userForm.value.phone,
      website: this.userForm.value.website,
      company: {
        name: this.userForm.value.companyName,
        catchPhrase: this.userForm.value.catchPhrase,
        bs: this.userForm.value.bs,
      },
    };

    this.dataService.createUser(user).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario Creado',
          detail: 'El usuario se ha creado correctamente',
        });
        this.visible = false;
        this.userForm.reset();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al Crear',
          detail: 'Ocurrió un error al crear el usuario. Inténtalo de nuevo.',
        });
        console.error('Error al crear el usuario:', error);
      }
    );
  }
}
