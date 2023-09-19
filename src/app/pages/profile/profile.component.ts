import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: string = '';
  user: any;
  repos: any[] = [];
  constructor(private route: ActivatedRoute, private profileService: GithubService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.loadUser();
      this.loadRepos();
    });
  }

  loadUser() {
    this.profileService.getUser(this.username).subscribe((data) => {
      this.user = data;
    });
  }

  loadRepos() {
    this.profileService.getRepos(this.username).subscribe((data) => {
      this.repos = data;
      this.repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    });
  }

}
