import { Component, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/service/reviews.service';
import { Review } from 'src/app/_models/review';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/service/user.service';

import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  myGroup: any;
  Review = new Review();
  rate: number = 0;
  onlineUser: User = new User();
  userData: any;
  task: any = [] ;

  changeRate(evant: any) {
    this.rate = evant.value;
    this.Review.rate = this.rate;
    console.log(this.rate);
  }
  constructor(
    private ReviewService: ReviewsService,
    private router: Router,
    private route: ActivatedRoute,
    private taskService:TaskService
  ) {}

  ngOnInit(): void {
    // this.onlineUser.id = localStorage.getItem('id');
    // this.getUser(this.onlineUser.id);
    this.Review.project_id = this.route.snapshot.params.project_id;
    this.Review.rater_id = localStorage.getItem('id');
    this.Review.ratee_id = this.route.snapshot.params.developer_id;
  }

  addReview() {
    return this.ReviewService.addReview(this.Review).subscribe((res) => {
      console.log(this.Review.rate);
      this.Review.rate = this.rate;
      this.router.navigate(['listproject']);
    });
  }

  makeAccepted() {
    this.taskService.makeAccepted(this.route.snapshot.params.project_id ).subscribe((res) => {
    });
  }

  // getUser(id: any) {
  //   return this.userservice.getUser(id).subscribe((res) => {
  //     this.userData = res;
  //     this.onlineUser = this.userData;

  //   });
  // }

  getTask(){
    this.taskService.getTask(this.route.snapshot.params.project_id).subscribe((res) => {
      this.task = res;
    });

  }
}
