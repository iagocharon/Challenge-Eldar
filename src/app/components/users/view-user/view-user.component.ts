import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Album } from 'src/app/models/album.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  visible!: boolean;

  @Input() user!: User;
  @Input() users!: User[];

  posts!: Post[];
  albums!: Album[];

  isAdmin!: boolean;

  constructor(
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.checkAdmin();
  }

  checkAdmin() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  showDialog() {
    this.visible = true;
  }

  getUserNameById(userId: number): string | undefined {
    const user = this.users.find((user) => user.id === userId);
    return user ? user.name : undefined;
  }
}
