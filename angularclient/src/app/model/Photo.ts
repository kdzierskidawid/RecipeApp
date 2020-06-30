import {Binary} from '@angular/compiler';

export class Photo {
  id: string;
  photo: string;
  name: string;
  largeImage: string;

  constructor(photo: string, name: any, largeImage: string) {
    this.photo = photo;
    this.name = name;
    this.largeImage = largeImage;
  }
}
