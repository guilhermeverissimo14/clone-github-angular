import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  username: string = '';

  constructor(private githubService: GithubService, private router:Router) {
  }

  ngOnInit(): void {

  }

  searchUser() {
    if (this.username) {
      this.router.navigate(['/profile', this.username]);
      console.log(this.username, 'sucess');
    }else{
      console.log('not found');
    }
  }
}
