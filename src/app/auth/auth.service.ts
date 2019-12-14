import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { Router } from "@angular/router";
import { IAdminDetails } from './admin-details';
import { ITokenPayload } from "./token-payload";
import { ITokenResponse } from "./token-response";

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
  private token: string;

  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router){}

  private saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('auth-token');
    }
    return this.token;
  }

  public login(admin: ITokenPayload): Observable<any> {
    return this.request('post', 'login', admin);
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('auth-token');
    this.router.navigateByUrl('/');
  }

  //If 'auth-token' is set, check if the token is not expired
  public isLoggedIn(): boolean {
    if (!this.getToken()) return false;
    //Get current time minus 10 hours
    const admin = this.getAdminDetails();
    if (admin){
      return admin.exp + 36000000 < Date.now() / 1000;
    }
    return false;
    
  }


  public getAdminDetails(): IAdminDetails{
    let token = '';
    token = this.getToken();
    let payload;

    if (token){
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }
    return null;

  }
  private request(method: 'post'|'get', type: 'login'|'register'|'profile', admin?: ITokenPayload): Observable<any> {
    let base;
  
    if (method === 'post') {
      base = this.http.post(`/api/${type}`, admin);
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `auth-token ${this.getToken()}` }});
    }
  
    const request = base.pipe(
      map((data: ITokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  
    return request;
  }




}