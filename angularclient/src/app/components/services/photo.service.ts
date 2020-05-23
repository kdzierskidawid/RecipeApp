import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private readonly mapURL: string;

  constructor(private http: HttpClient) {
    this.mapURL = 'http://localhost:8089/photos/';
  }

  public getPhoto(id: string): Observable<any> {
    return this.http.get(this.mapURL + 'jpg/' + id, {responseType: 'text'});
  }

  public save(name: string, map: File) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('mapImage', map);
    return this.http.post<any>(this.mapURL + 'upload', formData);
  }
}
