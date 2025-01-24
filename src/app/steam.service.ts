import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SteamService {

  url:string ="https://localhost:7119/api/Steam"
 

  constructor(private http: HttpClient) { }

  getuserProfile(): Observable<any>{

    return this.http.get(this.url+"/profile/");

  }

  getUserGames(): Observable<any>{

    return this.http.get(this.url+"/games/");

  }
}
