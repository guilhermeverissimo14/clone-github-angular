import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: string = '';
  user: any;
  repos: any[] = [];
  visibleRepoCount: number = 5;
  constructor(private route: ActivatedRoute, private profileService: GithubService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.loadUser();
      this.loadRepos();
    });
    this.loadUser();
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

  //função para garantir que a url é segura
  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  // Aumenta o número de repositórios visíveis em 5
  showMoreRepos() {
    this.visibleRepoCount += 5;
  }

}
