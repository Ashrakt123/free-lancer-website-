import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/_models/user';
import { Email } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';



@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {


  title = 'Please tell us about yourself.';

    email: Email = new Email;

    form: any;

  user = new User();
  data: any;
    // constructor(private userservice: UserService, private router: Router) {
    // }
  // // ngOnInit(): void {

  // }
    constructor(private router: Router, private formDataService: FormDataService) {
    }


    // register() {
    //   // console.log(this.user);
    //   // localStorage.setItem('token', this.data);
    //   // this.router.navigate(['/SignUp/work']);
    //   // console.log(this.user);
    //   // return this.userservice.register(this.user).subscribe(res => {
    //   //   console.log(res);
    //   //   this.data = res;
    //   //   localStorage.setItem('token', JSON.stringify(this.data.token));
    //   //   this.router.navigate(['/SignUp', 'email']);
    //   // })
    // }
    ngOnInit() {

        this.email = this.formDataService.getEmail();
        console.log('Email feature loaded!');
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.formDataService.setEmail(this.email);
        return true;
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the work page
            this.router.navigate(['/SignUp' ,'work']);
        }
    }



}

