import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { UserService } from 'src/app/service/user.service';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

// import { Portfolio } from 'src/app/_models/Portfolio';
// import { ToastrService } from 'ngx-toastr';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.css'],
})
export class AddPortfolioComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  userId : any ;

  constructor(
    private portfolioService: PortfolioService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
    // private toaster: ToastrService,
    // private http: HttpClient
  )
  {
    this.form = this.formBuilder.group({
      name: ['' , Validators.required],
      description: ['', Validators.required],
      image: [null],
      link: [''],
      skills: [[]],
    });
  }

  title: string = 'hello';
  data: any;

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
  }

  get formControl() {
    return this.form.controls;
  }




  uploadImage(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({
      image: file,
    });
    this.form.get('image')?.updateValueAndValidity();
  }

  onSubmit() {
    console.log(this.form.value);
    var formData: any = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('link', this.form.get('link')?.value);
    formData.append('skills', this.form.get('skills')?.value);
    formData.append('image', this.form.get('image')?.value);
    this.portfolioService.addPortfolio(formData, this.userId).subscribe((res) => {
      console.log(res);
      this.router.navigate(['listportfolio']);
    });
  }

}
