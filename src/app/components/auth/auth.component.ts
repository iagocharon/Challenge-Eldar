import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.tokenService.logout();
  }

  login() {
    let login = this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );

    if (login) {
      this.messageService.add({
        severity: 'success',
        summary: 'Inicio de Sesión Correcto',
        detail: '¡Bienvenido!',
      });
      this.router.navigate(['/']);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Inicio de Sesión Incorrecto',
        detail: 'Revisá tus credenciales',
      });
    }
  }
}
