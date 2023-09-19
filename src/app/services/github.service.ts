import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<string[]> {
    return this.http.get<any[]>('https://api.github.com/users')
      .pipe(
        map(response => response.map(item => item.login))
      );
  }
}

