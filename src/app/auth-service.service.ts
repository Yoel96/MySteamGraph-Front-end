import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url:string ="https://localhost:7119/api/Auth"


  constructor(private http: HttpClient) { }

  login(formData:any): Observable<any>{

    return this.http.post(this.url+"/login", formData)

  }

  submit(formData:any): Observable<any>{

    return this.http.post(this.url+"/signUp", formData)

  }

  refresh():Observable<any>{

    return this.http.post(this.url+"/refresh", {"refreshToken":localStorage.getItem("refreshToken")})

  }

 

}
