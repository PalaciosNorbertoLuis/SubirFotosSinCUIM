import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultsService {
   URI = 'https://localhost:44347/api';
   httpOptions = {
     headers : new HttpHeaders({
       'Content-Type':'application/json'
     })
   };  
  
  constructor(private http:HttpClient) { }
  
  getConsult (idArma: number){
    return this.http.get(`${this.URI}/Consult/${idArma}`);
  }

  getFilter (reference: number){
    return this.http.get(`${this.URI}/Filter/${reference}`); 
     
  }

  getObservation (reference: number){
    return this.http.get(`${this.URI}/Observation/${reference}`); 
     
  }

  getReference (reference: number){
    return this.http.get(`${this.URI}/Reference/${reference}`); 
     
  }

  getDirectoryArm(reference: number){
    return this.http.get(`${this.URI}/DirectoryArm/${reference}`);
  }

  postDirectoryArm(images:any, referencia:any):Observable<any>{
    return this.http.post<any>(`${this.URI}/DirectoryArm/${referencia}`,images , this.httpOptions);
  }
}
