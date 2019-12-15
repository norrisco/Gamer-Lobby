import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { tap, delay, map, catchError, shareReplay } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Router } from "@angular/router";
import { IAdminDetails } from './admin-details';
import { ITokenPayload } from "./token-payload";
import { ITokenResponse } from "./token-response";
import * as moment from "moment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // isLoggedIn = false;

  // constructor(private http: HttpClient) {

  //  }
  // // store the URL so we can redirect after logging in
  // redirectUrl: string;
  // // TODO: Replace Logic in login() with call to database
  // login(): Observable<boolean> {
    
  //   //return this.http.post(auth)

  //   return of(true).pipe(
  //     delay(1000),
  //     tap(val => this.isLoggedIn = true)
  //   );
  // }

  // logout(): void {
  //   this.isLoggedIn = false;
  // }

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
          )
        
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
    return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
    return !this.isLoggedIn();
}

getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
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



  // private saveToken(token: string): void {
  //   localStorage.setItem('auth-token', token);
  //   this.token = token;
  // }

  // private getToken(): string {
  //   if (!this.token) {
  //     this.token = localStorage.getItem('auth-token');
  //   }
  //   return this.token;
  // }

  // public login(admin: ITokenPayload): Observable<any> {
  //   return this.request('post', 'login', admin);
  // }

  // public logout(): void {
  //   this.token = '';
  //   window.localStorage.removeItem('auth-token');
  //   this.router.navigateByUrl('/');
  // }

  // //If 'auth-token' is set, check if the token is not expired
  // public isLoggedIn(): boolean {
  //   if (!this.getToken()) return false;
  //   //Get current time minus 10 hours
  //   const admin = this.getAdminDetails();
  //   if (admin){
  //     return admin.exp + 36000000 < Date.now() / 1000;
  //   }
  //   return false;
    
  // }


  // public getAdminDetails(): IAdminDetails{
  //   let token = '';
  //   token = this.getToken();
  //   let payload;

  //   if (token){
  //     payload = token.split(".")[1];
  //     payload = window.atob(payload);
  //     return JSON.parse(payload);
  //   }
  //   return null;

  // }
  // private request(method: 'post', type: 'login'|'register', admin?: ITokenPayload): Observable<any> {
  //   let base;

  //   if (method === 'post') {
  //     let API_URL = `${this.endpoint}/${type}`;
  //     base = this.http.post(API_URL, admin, { headers: this.headers });
  //   } else {
  //     base = this.http.get(`/api/auth`, { headers: { Authorization: `auth-token ${this.getToken()}` }});
  //   }
    
  //   const request = base.pipe(
  //     map((data: ITokenResponse) => {
  //       if (data.token) {
  //         this.saveToken(data.token);
  //       }
  //       return data;
  //     })
  //   );
  
  //   return request;
  // }




}