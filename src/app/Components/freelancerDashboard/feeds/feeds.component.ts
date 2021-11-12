import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';
import { Project } from 'src/app/_models/project';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  constructor(private projectService :ProjectService ,private UserService:UserService, private rout:Router) { }

  recentProjects : any;
  developerCategory : any  ;
  userId : any ;

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.UserService.getUserCategory(this.userId).subscribe(res=>{
      // console.log(JSON.stringify(res));
      this.developerCategory = res ;
      // console.log(JSON.stringify(this.developerCategory[0].category_id));

      this.getRecentProject(JSON.stringify(this.developerCategory[0].category_id));

    })
  }


  getRecentProject(cateogry_id:any){
    this.projectService.getRecentProject(cateogry_id).subscribe(res => {
      console.log(res);
      this.recentProjects = res;
    });
  }

  viewProject(id:any){
    this.rout.navigate(['viewproject/'+id]);
  }

}
