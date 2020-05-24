import { Injectable } from '@angular/core';
import {Photo} from '../models/Photo';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser'
const API_URI = 'http://localhost:8082/api/photos/'
const httpOptions = {
  headers: new HttpHeaders({'Accept': 'application/json','Content-Type':'multipart/form-data; boundary=----WebKitFormBoundary6MA4YWxkTrZu0gW'})
};
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  addPhoto(data:Photo): Observable<any> {
    console.log('DATA :'+JSON.stringify(data))
    return this.http.post(API_URI + 'addaux',data)
      .pipe(
        tap((pr :any) => console.log(`addPhoto w/ id=${pr.id}`)),
        catchError(this.handleError<any>('addPhoto'))
      );
  }
  deletePhoto(id: any): Observable<Photo> {
    const url = `${API_URI}${id}`;
    return this.http.delete<Photo>(url).pipe(
      tap(_ => console.log(`deleted Photo id=${id}`)),
      catchError(this.handleError<Photo>('deletePhoto'))
    );
  }

  getPhoto(id: number): Observable<Photo> {
    const url = `${API_URI}${id}`;
    return this.http.get<Photo>(url).pipe(
      tap(_ => console.log(`fetched Photo id=${id}`)),
      catchError(this.handleError<Photo>(`getPhoto id=${id}`))
    );
  }
  
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); // log to console instead
    this.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}

private log(message: string) {
  console.log(message);
}
}
