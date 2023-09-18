import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  searchControl = new FormControl();
  user: any;

  constructor(private githubService: GithubService) {
    this.setupSearch();
  }

  ngOnInit(): void {

  }

  setupSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => this.githubService.searchUsers(query))
      )
      .subscribe(user => {
        this.user = user;
      });
  }
}
