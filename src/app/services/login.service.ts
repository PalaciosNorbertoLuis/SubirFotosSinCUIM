import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonResponse } from "./common-response";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public usuario:string = sessionStorage.getItem('usuario')!;
  private endPoint: string = "https://localhost:44347/api/";
  loginStatus = new BehaviorSubject<boolean>(this.hasToken());
  constructor(private http: HttpClient, private router: Router) { }
token:string;

 /**
   * 
   * @param formData as the login form data
   */
  login(formData:any):Observable<HttpResponse<CommonResponse>>{
    return this.http.post<any>(this.endPoint+"Login",formData,  { observe: 'response' })
    .pipe(
      tap((resp: HttpResponse<CommonResponse>) => {

        if(resp.body?.token){
          this.loginStatus.next(true);
          this.token = resp.body?.token;
          this.usuario = resp.body?.nombreCompleto;
          sessionStorage.setItem('token', this.token)
          sessionStorage.setItem('usuario', this.usuario)
        }
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
    this.loginStatus.next(false);
    sessionStorage.clear();
    this.router.navigate(['/Login']);
  }

/**
*
* @returns {Observable<T>}
*/
 isLoggedIn() : Observable<boolean> {
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
    if (window.sessionStorage.length != 0){
      return true;
    }
    else{
      return false;
    }
  }
}