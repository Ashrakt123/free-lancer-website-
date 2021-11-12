import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { Portfolio } from 'src/app/_models/Portfolio';
import { UserService } from 'src/app/service/user.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-view-portfolio',
  templateUrl: './view-portfolio.component.html',
  styleUrls: ['./view-portfolio.component.css']
})
export class ViewPortfolioComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private portfolioService: PortfolioService,
    private router:Router
  ) { 
  this.userId = localStorage.getItem('id');
  }
  items: MenuItem[] = [];


  portfolio:Portfolio = new Portfolio();
  data:any;
  user : any ;
  userId : any ;
  
  ngOnInit(): void {
    this.getUser(this.userId);

    this.portfolioService
      .getPortfolio(this.route.snapshot.params.id)
      .subscribe((res) => {
        this.data = res;
        this.portfolio = this.data;
        console.log(this.portfolio);
      });

      this.items = [
        {label: 'Edit', icon: 'pi pi-refresh', routerLink: [`/editportfolio/${this.route.snapshot.params.id}`]},
        {separator:true},
        {label: 'Delete', icon: 'pi pi-times', command: () => {
            this.deletePortfolio(this.portfolio.id );
        }},
    ];


  }

  getUser(id: any) {
    return this.userService.getUser(id).subscribe((res) => {
      this.user = res;
    });
  }

  activeEdit(){
    if(this.user.type == 'developer'){
      return true ;
    } else {
      return false ;
    }
}

deletePortfolio( id: any) {
  return this.portfolioService.deletePortfolio(id).subscribe((res) => {
    this.router.navigate(['listportfolio']);
  });
}

  
}
