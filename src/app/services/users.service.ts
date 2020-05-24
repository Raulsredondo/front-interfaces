import { Injectable } from '@angular/core';
import {User} from '../models/User';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser'
const API_URI = 'http://localhost:8082/api/users'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  users: any;

//
 // getUsers(){
  //  return this.http.get(`${API_URI}/users`);
  //}



getUsers(): Observable<User[]> {
  return this.http.get<User[]>(API_URI)
    .pipe(
      tap(_ => this.log('fetched Users')),
      catchError(this.handleError('getUsers', []))
    );
}
getUser(id: number): Observable<User> {
  const url = `${API_URI}/${id}`;
  return this.http.get<User>(url).pipe(
    tap(_ => console.log(`fetched User id=${id}`)),
    catchError(this.handleError<User>(`getUser id=${id}`))
  );
}

addUser(data:User): Observable<User> {
  return this.http.post<User>(API_URI, data, httpOptions)
    .pipe(
      tap((pr :User) => console.log(`add Products w/ id=${pr.id}`)),
      catchError(this.handleError<any>('addUser'))
    );
}

updateUser(id: any, product: User): Observable<any> {
  const url = `${API_URI}/${id}`;
  return this.http.put(url, product, httpOptions).pipe(
    tap(_ => console.log(`updated User id=${id}`)),
    catchError(this.handleError<any>('updateUser'))
  );
}

deleteUser(id: any): Observable<User> {
  const url = `${API_URI}/${id}`;
  return this.http.delete<User>(url, httpOptions).pipe(
    tap(_ => console.log(`deleted User id=${id}`)),
    catchError(this.handleError<User>('deleteUser'))
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