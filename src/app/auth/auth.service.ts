import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  // constructor(
  //   private http: HttpClient
  // ) { }

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  // TODO: Replace Logic in login() with call to database
  login(): Observable<boolean> {
    
    //return this.http.post(auth)

    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}