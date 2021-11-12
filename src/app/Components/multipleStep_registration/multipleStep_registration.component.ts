import { Component, OnInit } from '@angular/core';

import { Router ,ActivatedRoute } from '@angular/router';
import { CatagoriesService } from 'src/app/service/catagories.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/_models/user';

// import { Location } from '@angular/common';


@Component({
  selector: 'app-multipleStep_registration',
  templateUrl: './multipleStep_registration.component.html',
  styleUrls: ['./multipleStep_registration.component.css']
})
export class MultipleStep_registrationComponent implements OnInit {
  values: string[] = [];

  allcatagories:any=[];
  user = new User();
  data: any;
  // passingdata:any;

  constructor(private userservice: UserService, private activatedRoute:ActivatedRoute,private router: Router , public catlist:CatagoriesService ) {

  }
  ngOnInit(): void {

    this.getAllCatagories();
    // console.log(this.location.getState());
  }

  register() {
  //  console.log(this.user.category_id);
    return this.userservice.register(this.user).subscribe(async res => {
      // console.log({res});
      this.data = res;

    localStorage.setItem('token', JSON.stringify(this.data.token));
    console.log(this.data.user.id);
    localStorage.setItem('id',JSON.stringify((this.data.user.id)));
    // localStorage.setItem('data',JSON.stringify(this.data));
    // this.userservice.isLoggedin = true;
    localStorage.setItem('type',JSON.stringify((this.data.user.type)));
    // this.router.navigateByUrl('/home', { state: this.passingdata });
      this.router.navigate(['']);
      if(await this.router.navigate([''])){
        location.reload()
      }
    })

  };



  private selectedLink: string = "Developer";

  setradio(e: string): void {

    this.selectedLink = e;

  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown
      return false;

    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false
  }

  getAllCatagories(){
    return this.catlist.getAllCatagories().subscribe(res =>{
       console.log(res);
       this.allcatagories=res;
     }
     )
   }










}


