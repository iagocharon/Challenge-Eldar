import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album.model';
import { Photo } from 'src/app/models/photo.model';
import { DataService } from 'src/app/services/data.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-view-album',
  templateUrl: './view-album.component.html',
  styleUrls: ['./view-album.component.scss'],
})
export class ViewAlbumComponent implements OnInit {
  visible!: boolean;

  @Input() album!: Album;

  photos!: Photo[] | undefined;

  mobile: boolean = window.innerWidth < 768;
  isAdmin!: boolean;

  constructor(
    private dataService: DataService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.checkAdmin();
    this.getPhotos();
  }

  checkAdmin() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  showDialog() {
    this.visible = true;
  }

  getPhotos() {
    this.dataService.getPhotos(this.album.id).subscribe((data) => {
      this.photos = data as Photo[];
    });
  }
}
