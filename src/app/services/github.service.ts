import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) {}

  private baseUrl = 'https://api.github.com/users'

  getUsers(): Observable<string[]> {
    return this.http.get<any[]>(this.baseUrl)
      .pipe(
        map(response => response.map(item => item.login))
      );
  }
}

