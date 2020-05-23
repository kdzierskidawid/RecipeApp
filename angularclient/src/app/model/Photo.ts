import {Binary} from '@angular/compiler';

export class Photo {
  id: string;
  title: string;
  mapImage: string;

  constructor(title: string, mapImage: any) {
    this.title = title;
    this.mapImage = mapImage;
  }
}
