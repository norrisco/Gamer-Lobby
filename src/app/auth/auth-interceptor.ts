import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements  HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //get auth_token from LocalStorage
        const authToken = localStorage.getItem('auth_token');
        //Add auth token to request headers
        if (authToken){
            const cloned = req.clone({
                headers: req.headers.set("auth_token", authToken)
            });

            return next.handle(cloned);
        }
        else{
            return next.handle(req);
        }
    }
    
}
