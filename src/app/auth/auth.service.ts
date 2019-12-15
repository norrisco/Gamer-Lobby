import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Router } from "@angular/router";
import * as moment from "moment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  endpoint: string = 'http://localhost:4000/api/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private token: string;

  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router){}

  login(username:string, password:string ) {
    return this.http.post(`${this.endpoint}/login`, {"username": username, "password": password})
    .pipe(
      tap(res => this.setSession(res)),
      catchError(this.errorMgmt)
    );  
  }
      
private setSession(authResult) {
  const expiresAt = moment().add(authResult.expiresIn,'minutes');

  localStorage.setItem('auth_token', authResult.token);
  localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
}         

public logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("expires_at");
    this.router.navigateByUrl("/login");
}

public isLoggedIn() {
    return moment(Date.now(), "x").isBefore(this.getExpiration());
}

isLoggedOut() {
    return !this.isLoggedIn();
}

getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt, "x");
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