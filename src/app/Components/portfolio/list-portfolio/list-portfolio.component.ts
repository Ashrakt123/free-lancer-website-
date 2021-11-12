import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/_models/Portfolio';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewPortfolioComponent } from '../view-portfolio/view-portfolio.component';

@Component({
  selector: 'app-list-portfolio',
  templateUrl: './list-portfolio.component.html',
  styleUrls: ['./list-portfolio.component.css'],
})
export class ListPortfolioComponent implements OnInit {
  constructor(
    private userService: UserService,
    private portfoilioService: PortfolioService,
    private router: Router,

  ) {}

  //data
  allPortfolios: any = [];
  data: any;
  userid : any ;

  ngOnInit(): void {
    this.userid = localStorage.getItem('id');
    this.getAllPortfolio(this.userid);
    this.getUser(this.userid) ;
  }

  //logic
  getAllPortfolio(id:any) {
    this.portfoilioService.getAllPortfolio(id).subscribe((res) => {
      console.log(res);
      this.allPortfolios = res;
    });
  }


  getUser(id: any) {
    return this.userService.getUser(id).subscribe((res) => {
      this.data = res;
      
    });
  }

view(id:any){
  this.router.navigate([`viewportfolio/${id}`]) };

}
