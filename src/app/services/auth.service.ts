import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  randomToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIn0.DJtArZoDSFJQYzrbkM4lWPH0ZOCWbqxOvvPC8h3mXik';

  constructor(private tokenService: TokenService) {}

  // Este login simula una autenticación con JWT con una API que maneje eso.
  // Por ahora, lo unico que hace es comparar el usuario y contraseña con un usuario y contraseña fijos para cada rol, y en cada caso setea el token, el rol y el nombre de usuario en el tokenService.
  public login(username: string, password: string): boolean {
    if (username.toLowerCase() == 'admin' && password == 'adminpassword') {
      this.tokenService.setToken(this.randomToken);
      this.tokenService.setRole('ROLE_ADMIN');
      this.tokenService.setUsername(username);
      return true;
    } else if (username.toLowerCase() == 'user' && password == 'userpassword') {
      this.tokenService.setToken(this.randomToken);
      this.tokenService.setRole('ROLE_USER');
      this.tokenService.setUsername(username);
      return true;
    }
    return false;
  }
}
