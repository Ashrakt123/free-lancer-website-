import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/_models/user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userservice: UserService, private router: Router, private authService:AuthService) {

  }
  userData: any;
  onlineUser: User = new User();
  user: any = [];
token:any;
  ngOnInit() {


    this.onlineUser.id = localStorage.getItem('id');
    this.getUser(this.onlineUser.id);
    this.logout
      // get the auth token from localStorage
      this.token = localStorage.getItem('token');
      if (this.token) {
        return true;
      }else{
        return false;
      }
  }


  getUser(id: any) {
    return this.userservice.getUser(id).subscribe((res) => {
      this.userData = res;
      this.onlineUser = this.userData;

      // this.router.navigate(['']);

    });


  }
  // isLoggedin: boolean = false;

  logout() {
    this.userservice.logout().subscribe(res => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('type');
      // this.isLoggedin = false;
      this.router.navigate(['']);
      this.ngOnInit();

    });
  }



  // reloadComponent() {
  //   let currentUrl = this.router.url;
  //       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //       this.router.onSameUrlNavigation = 'reload';
  //       this.router.navigate([currentUrl]);
  //   }
  // isLoggedIn() {

  //   if (JSON.parse(localStorage.getItem('token')!).auth_token == null) {
  //     this.isLoggedin = false;
  //     return this.isLoggedin;
  //   }
  //   else {
  //     return true;
  //   }
  // }




}
