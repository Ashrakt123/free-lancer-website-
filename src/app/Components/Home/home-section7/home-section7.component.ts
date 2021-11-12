import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-section7',
  templateUrl: './home-section7.component.html',
  styleUrls: ['./home-section7.component.css']
})
export class HomeSection7Component implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  // isLoggedin: boolean = false;
  // isLoggedIn() {
  // if (JSON.parse(localStorage.getItem('token')!).auth_token == null) {
  //     this.isLoggedin = false;
  //     return this.router.navigate(['/login']);
  //   }
  //   else {
  //   return this.router.navigate(['']);
  //   }
  // }

}
