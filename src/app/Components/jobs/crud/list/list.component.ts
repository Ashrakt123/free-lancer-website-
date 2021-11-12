import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/service/project.service';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/service/user.service';
import {paymentService } from 'src/app/service/payment.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  val:number=3
  searchjob:String="";

  userData: any;
  onlineUser: User = new User();
  allprojects:any=[];
  flag=false;
  nnn=false;
  user:any;
  id:any;
  Project:Project  =new Project ();
  data:any;

  constructor(private route: ActivatedRoute,
    private ProjectService: ProjectService,
    private router: Router,
    private userservice: UserService,
    private paymentService: paymentService, ){}

    
    /* getAllProjects(){
    this.ProjectService.getAllProjects().subscribe(res => {
         this.allprojects= res;
        
       //  console.log(this.allprojects);

         for(let i=0 ; i<= this.allprojects.length ; i++)
         {     
                this.user=this.allprojects;
                localStorage.getItem('email');
                    // if
               if(this.allprojects[i].owner_id == localStorage.getItem('id') && this.allprojects[i].type == "client") 
               {
                 this.allprojects[i].flag=true; 
                 console.log(this.allprojects[i].flag);


               } else{
                 this.allprojects[i].flag=false; 
               }
                    // if
               if(this.allprojects[i].type == "client" && this.allprojects[i].status== "done" && this.allprojects[i]. owner_id== localStorage.getItem('id')) 
               {
              
                   this.allprojects[i].nnn=true; 
  
                 } else{
                   this.allprojects[i].nnn=false; 
                 }


            
              }

       });
     }*/


 
  ngOnInit(): void {
    this.onlineUser.id = localStorage.getItem('id');
    this.getUser(this.onlineUser.id);

     this.getAllProjects();

  }

 getAllProjects(){
    return this.ProjectService.getAllProjects().subscribe(res => {
      this.allprojects= res ;
      console.log(this.allprojects);

     
    });
  }
  getUser(id: any) {
    return this.userservice.getUser(id).subscribe((res) => {
      this.userData = res;
      this.onlineUser = this.userData;
      console.log(this.onlineUser.type);
    });
  }
  



}
