import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import { faCity, faCoffee, faComment, faDownload, faHome, faLaptopHouse, faSlidersH, faUniversity, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/_models/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  faCoffee = faCoffee;
  fadownload= faDownload;
  faslide= faSlidersH;
  faHome=faHome;
  faUniversity =faUniversity;
  faCity=faCity;
  faChartBar=faChartBar;
  faUser=faUser;
  faLaptopHouse=faLaptopHouse;
  faComment=faComment;
  val:number=2;
  checkUser:any;
  // allUsers:any=[];
  user = new User();
  data:any;
  constructor(private userService:UserService,private router:Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.userService.getUser(this.route.snapshot.params.id).subscribe(res =>{
      this.data = res;
      this.user = this.data;
      // console.log(this.user);
    })
    if(this.user.type=="client"){
      this.checkUser=true;
    }else{
      this.checkUser=false;
    }
    
  // }
  // getAllUsers(){
  //   return this.userService.getAllUsers().subscribe(res => {
  //   })
  }
  // deleteUser(e:any,id:any){
  //   e.preventDefault();
  //   return this.userService.deleteUser(id).subscribe(res => {
  //     this.getAllUsers();
  // }
}
