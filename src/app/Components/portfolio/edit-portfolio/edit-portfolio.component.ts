import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { Portfolio } from 'src/app/_models/Portfolio';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.css'],
})
export class EditPortfolioComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private router: Router
  ) {}

  title: string = 'hello';
  values: string[] = [''];
  multiple: boolean = true;

  portfolio: Portfolio = new Portfolio();
  data: any;

  ngOnInit(): void {
    this.portfolioService
      .getPortfolio(this.route.snapshot.params.id)
      .subscribe((res) => {
        this.data = res;
        this.portfolio = this.data;
      });
  }

  updatePortfolio() {
    this.portfolioService
      .updatePortfolio(this.route.snapshot.params.id, this.portfolio)
      .subscribe((res) => {
        return this.router.navigate(['listportfolio']);
      });
  }
}
