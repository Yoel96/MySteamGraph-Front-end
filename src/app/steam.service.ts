import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SteamService {

  url:string ="https://localhost:7119/api"
 

  constructor(private http: HttpClient) { }

  getuserProfile(): Observable<any>{

    return this.http.get(this.url+"/Steam/profile/");

  }

  getUserGames(): Observable<any>{

    return this.http.get(this.url+"/Steam/games/");

  }

  getCompletedGames():Observable<any>{

    return this.http.get(this.url+"/CompletedGames/");

  }

  addCompletedGame(gameData:any): Observable<any>{

    return this.http.post(this.url+"/CompletedGames/", gameData)

  }

  removeCompletedGame(gameId:any) : Observable<any>{

    return this.http.delete(this.url+"/CompletedGames/"+gameId )

  }

}
