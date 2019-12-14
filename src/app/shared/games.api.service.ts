import { Injectable } from '@angular/core';
import { Games } from './games';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GamesApiService {

  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add games
  AddGames(data: Games): Observable<any> {
    let API_URL = `${this.endpoint}/add-games`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all games
  GetGames() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get games
  GetGame(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-games/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update games
  UpdateGames(id, data: Games): Observable<any> {
    let API_URL = `${this.endpoint}/update-games/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete games
  DeleteGames(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-games/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorMgmt)
    )
  }

  /* GET games whose name contains search term */
  searchGames(term: string): Observable<Games[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return null;
  }
}


  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}