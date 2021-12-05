import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  implements HttpInterceptor {

  totalRequests = 0;
  completedRequests = 0;

  constructor(private loader:LoadingService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token:any = sessionStorage.getItem('token');

    let request = req;

    if (token) {
      this.loader.show();
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
      this.totalRequests++;
    }

    this.completedRequests = 0;
    return next.handle(request).pipe(
      finalize(() => {
        this.completedRequests++;
        if (this.completedRequests === this.totalRequests) {
          this.completedRequests = 0;
          this.totalRequests = 0;
          this.loader.hide();
        }
      }))
      
    }
    

  }