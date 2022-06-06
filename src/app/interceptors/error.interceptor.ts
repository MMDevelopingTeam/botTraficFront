import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { NotificationService } from '../services/notification.service';

@Injectable({
    providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private notificationService: NotificationService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            catchError((err) => {
                console.log(err);
                if ( [400, 401, 403, 404, 0].indexOf(err.status) !== -1 ) {
                    this.notificationService.showErr(err.error.message)
                }
                return throwError(err.status);
            })
        )
    }
    
}