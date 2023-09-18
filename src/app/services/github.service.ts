import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) {}

  public searchUsers(username: string): Observable<any> {
    return this.http.get(`https://api.github.com/users?q=${username}`);
  }

}
