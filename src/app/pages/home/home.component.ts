import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  options:string[] = [];
  formGroup!: FormGroup;

  constructor(private githubService: GithubService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.initForm();
  }

  initForm(){
    this.formGroup = this.fb.group({
      'formAction':['']
    })
    this.formGroup.get('formAction')?.valueChanges.subscribe(response=>{
      this.filterData(response)
      console.log(response);
    })
  }

  filterData(enteredData:any){

  }

  getUsers(){
    this.githubService.getUsers().subscribe(response => {
      this.options = response;
      console.log('teste',response)
    })
  }
}
