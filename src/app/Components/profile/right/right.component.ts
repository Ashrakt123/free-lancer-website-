import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ReviewsService } from 'src/app/service/reviews.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})
export class RightComponent implements OnInit {
  faComment=faComment;
  faHome=faHome;
  allUsers:any=[]
  user = new User;
  data:any;
  Reviews:any = [];
  checkUser:any;
  onlineUser: User = new User();
  constructor(private userService:UserService , private reviewService:ReviewsService,private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.userService.getUser(this.route.snapshot.params.id).subscribe(res =>{
      this.data = res;
      this.user = this.data;
      // console.log(this.user);
      if(this.user.type=="client"){
        this.checkUser=true;
      }else{
        this.checkUser=false;
      }
    });
    this.onlineUser.id = localStorage.getItem('id');
    console.log(this.user);

    this.showReview();


    }
    showReview(){
      this.reviewService.showreviews(this.onlineUser.id).subscribe(res => {
        this.Reviews = res;
        console.log(res)
      });


  }
}


