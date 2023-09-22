import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { differenceInDays } from "date-fns";

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
  constructor(private route: ActivatedRoute, private profileService: GithubService, private sanitizer: DomSanitizer, public router:Router) { }

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
      console.log(this.repos);
      this.repos.sort((a, b) => b.stargazers_count - a.stargazers_count);


      for (const repo of this.repos) {
        const updatedAtString = repo.updated_at;
        const updatedAt = new Date(updatedAtString);
        const currentDate = new Date();
        const daysAgo = differenceInDays(currentDate, updatedAt);
        repo.daysAgo = daysAgo;
        console.log(daysAgo);
      }
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

  back(){
    this.router.navigate(['/']);
  }
}
