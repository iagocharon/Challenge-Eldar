import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit {
  visible!: boolean;

  @Input() post!: Post;
  @Input() author!: string;

  @Input() users!: User[];

  comments!: Comment[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.dataService.getComments(this.post.id).subscribe((data) => {
      this.comments = data as Comment[];
    });
  }

  showDialog() {
    this.visible = true;
  }
}
