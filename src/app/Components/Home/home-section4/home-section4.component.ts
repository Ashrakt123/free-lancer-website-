import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home-section4',
  templateUrl: './home-section4.component.html',
  styleUrls: ['./home-section4.component.css']
})
export class HomeSection4Component implements OnInit {

  Developers: any = [];
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getDevelopers();
  }
  getDevelopers(){
    this.userService.getDevelopers().subscribe(res => {
      this.Developers = res;
    });
  }

    addStyle(img1: any, cardBody1: any) {
      img1.classList.add("styleImg");
      cardBody1.classList.add("card-bodyStyle");

    }
    removeStyle(img1: any, cardBody1: any) {
      img1.classList.remove("styleImg");
      cardBody1.classList.remove("card-bodyStyle");

    }
  }

  



