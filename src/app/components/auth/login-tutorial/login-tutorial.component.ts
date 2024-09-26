import { Component } from '@angular/core';

@Component({
  selector: 'app-login-tutorial',
  templateUrl: './login-tutorial.component.html',
  styleUrls: ['./login-tutorial.component.scss'],
})
export class LoginTutorialComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
