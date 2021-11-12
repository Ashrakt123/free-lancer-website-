import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  toasterService: any;

  constructor(private userservice: UserService, private router: Router) { }

  email = "";
  password = "";

  data: any;

  token:any;


  ngOnInit() {


}


// userEmails = new FormGroup({
// 	Email: new FormControl('',[
//   	Validators.required,
//   	Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
// 	Password: new FormControl('',[
//   	Validators.required ,
//     Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]),
//   });

//   get Email(){
//     return this.userEmails.get('Email')
//     }

//     get Password(){
//     return this.userEmails.get('Password')
//     }


  login(){


return this.userservice.checkCookie().subscribe(res=>
  {

    this.userservice.login({email: this.email ,password:this.password}).subscribe(async res=>{

      this.data = res;

      // localStorage.setItem('data',JSON.stringify(this.data));
      localStorage.setItem('token', JSON.stringify(this.data.token));
      console.log(this.data.token);
      localStorage.setItem('id',JSON.stringify((this.data.user.id)));
      localStorage.setItem('type',JSON.stringify((this.data.user.type)));

         this.router.navigate(['']);
        if(await this.router.navigate([''])){
          location.reload()
        }


      }, err => {
        return Swal.fire('Oops...', 'User does not exist!!', 'error')
        //return alert("user does not exist");
    },
    )

    })




  }


}



