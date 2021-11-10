import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonResponse } from "./common-response";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private endPoint: string = "https://localhost:44347/api/";
  loginStatus = new BehaviorSubject<boolean>(this.hasToken());
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }
  private cookieExpireTime: Date;
 /**
   * 
   * @param formData as the login form data
   */
  login(formData:any):Observable<HttpResponse<CommonResponse>>{
    return this.http.post<any>(this.endPoint+"Login",formData,  { observe: 'response' })
    .pipe(
      tap((resp: HttpResponse<CommonResponse>) => {
        //console.log("Respuesta login "+resp.body?.token);

        if(resp.body?.token){
          const myDate:Date = new Date();
          myDate.setHours(myDate.getHours() + 1)
          //console.log(myDate.valueOf());
          this.cookieService.set("currentUser", resp.body?.token, myDate);
          this.loginStatus.next(true);
        }
        return resp;  
      }),
      
      catchError(this.handleError)
    );
  }
  

  /**
   * 
   * @param formData as the login form data
   */
  signup(formData:any):Observable<HttpResponse<any>>{
    return this.http.post<any>(this.endPoint+"register",formData,  { observe: 'response' })
    .pipe(
      tap((resp: HttpResponse<any>) => {
        return resp;  
      }),
      catchError(this.handleError)
    );
  }
  /**
   * 
   * @param error error 
   */
  
  
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  logout(){
    //console.log('logout');
    this.loginStatus.next(false);
    this.cookieService.deleteAll();
    this.router.navigate(['/Login']);
  }

/**
*
* @returns {Observable<T>}
*/
 isLoggedIn() : Observable<boolean> {
   //console.log("isLoggedIn"+ this.loginStatus.value)
if (this.loginStatus.value){
  this.router.navigate(['/']);
}

  return this.loginStatus.asObservable();
 }
   /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
  private hasToken() : boolean {
    return this.cookieService.check('currentUser');
  }
}