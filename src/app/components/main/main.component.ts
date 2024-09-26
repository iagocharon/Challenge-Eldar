import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  mainMenu!: MenuItem[];

  sidebarVisible: boolean = false;

  constructor(
    private tokenService: TokenService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mainMenu = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home',
      },
      {
        label: 'Posteos',
        icon: 'pi pi-fw pi-list',
        routerLink: '/posts',
      },
      {
        label: 'Álbumes',
        icon: 'pi pi-fw pi-images',
        routerLink: '/albums',
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users',
        routerLink: '/users',
      },
      {
        label: 'To-Do',
        icon: 'pi pi-fw pi-list-check',
        routerLink: '/todos',
      },
    ];
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de que querés cerrar sesión?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Sesión Cerrada',
          detail: 'Estás siendo redirigido al inicio de sesión',
        });
        this.logout();
      },
      reject: () => {},
    });
  }

  logout() {
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
