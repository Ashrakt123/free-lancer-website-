import { Component, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/service/reviews.service';

@Component({
  selector: 'app-home-section6',
  templateUrl: './home-section6.component.html',
  styleUrls: ['./home-section6.component.css']
})
export class HomeSection6Component implements OnInit {

  Reviews:any = [];
  constructor(private ReviewsService : ReviewsService) { }

  ngOnInit(): void {
    this.getReviews();
  }
  getReviews() {
    this.ReviewsService.getAllReviews().subscribe((res: any) => {
      this.Reviews = res;
      // console.log(res);
    });
  }

}
