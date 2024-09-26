import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  visible: boolean = false;

  userForm: FormGroup;

  @Input() user!: User;

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

  ngOnInit(): void {
    this.userForm.controls['name'].setValue(this.user.name);
    this.userForm.controls['username'].setValue(this.user.username);
    this.userForm.controls['email'].setValue(this.user.email);
    this.userForm.controls['street'].setValue(this.user.address.street);
    this.userForm.controls['suite'].setValue(this.user.address.suite);
    this.userForm.controls['city'].setValue(this.user.address.city);
    this.userForm.controls['zipcode'].setValue(this.user.address.zipcode);
    this.userForm.controls['lat'].setValue(this.user.address.geo.lat);
    this.userForm.controls['lng'].setValue(this.user.address.geo.lng);
    this.userForm.controls['phone'].setValue(this.user.phone);
    this.userForm.controls['website'].setValue(this.user.website);
    this.userForm.controls['companyName'].setValue(this.user.company.name);
    this.userForm.controls['catchPhrase'].setValue(
      this.user.company.catchPhrase
    );
    this.userForm.controls['bs'].setValue(this.user.company.bs);
  }

  showDialog() {
    this.visible = true;
  }

  submitForm() {
    let user = {
      id: this.user.id,
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

    this.dataService.updateUser(user).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario Actualizado',
          detail: 'El usuario se ha actualizado correctamente',
        });
        this.visible = false;
        this.userForm.reset();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al Actualizar',
          detail:
            'Ocurrió un error al actualizar el usuario. Inténtalo de nuevo.',
        });
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
}
