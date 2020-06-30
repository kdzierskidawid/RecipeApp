import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Recipe} from '../model/Recipe';
import {Photo} from '../model/Photo';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photo: Photo;
  private readonly photoURL: string;

  constructor(private http: HttpClient) {
    this.photoURL = 'http://localhost:8089/photos/';
  }

  public getPhoto(id: string): Observable<any> {
    return this.http.get(this.photoURL + 'jpg/' + id, {responseType: 'text'});
  }

  public save(name: string, map: File) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('mapImage', map);

    return this.http.post<any>(this.photoURL + 'upload', formData);
  }

  public getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photoURL + 'all', {responseType: 'json'});
  }

  public ifExists(name: string): Observable<Photo> {
    return this.http.get<Photo>(this.photoURL + 'exists/' + name, {responseType: 'json'});
  }

/*  public getPhotobyName(name: string): Observable<any> {
    return this.http.get(this.photoURL + 'jpeg/' + name, {responseType: 'text'});
  }*/

  public savePhoto(photo: Photo) {
    return this.http.post<Photo>(this.photoURL + 'add', photo);
  }

  public getImageByRecipeId(name: string): Observable<Photo> {
    return this.http.get<Photo>(this.photoURL + 'image/' + name,{responseType: 'json'});
  }

  public getLargeImageByRecipeId(name: string): Observable<Photo> {
    return this.http.get<Photo>(this.photoURL + 'largeimage/' + name,{responseType: 'json'});
  }

  public delete(photo: Photo) {
    const httpOptions = {body: photo, responseType: 'text' as 'json'};
    return this.http.delete(this.photoURL + 'delete', httpOptions);
  }
}
