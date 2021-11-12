import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/_models/user';
import { Project } from 'src/app/_models/project';
import { Purposal } from 'src/app/_models/purposal';
import { ProjectService } from 'src/app/service/project.service';
import { PurposalService } from 'src/app/service/purposal.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-submit-purposal',
  templateUrl: './submit-purposal.component.html',
  styleUrls: ['./submit-purposal.component.css']
})
export class SubmitPurposalComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private ProjectService: ProjectService,
    private router: Router,
    private userservice: UserService,
    private PurposalService: PurposalService,
  ) { }
  purposal = new Purposal();
  project: any = [];
  rate: number = 0;
  // project:any = new Project()
  //  user = new User();
  data: any;

  userData: any;
  onlineUser: User = new User();
  ngOnInit(): void {

    this.view();
    this.onlineUser.id = localStorage.getItem('id');
    this.getUser(this.onlineUser.id);

    this.addingpurposal();

  }
  getUser(id: any) {
    return this.userservice.getUser(id).subscribe((res) => {
      this.userData = res;
      this.onlineUser = this.userData;
      console.log(this.onlineUser.type);

    });
  }

  view() {
    this.ProjectService.getProject(this.route.snapshot.params.id).subscribe(res => {
      this.project = res;
      this.rate = this.project.rate;
      // console.log(this.project);


    });

  }


  addingpurposal() {
    this.purposal.project_id = this.project.id
    this.purposal.owner_id = this.project.owner_id
    this.purposal.developer_id = this.onlineUser.id
    return this.PurposalService.addPurposal(this.purposal).subscribe( res => {


      //  console.log(this.purposal.project_id);
      this.router.navigate(['viewproject/' + this.project.id]);

    })
  }

// getproject(){
//   this.ProjectService.getProject(this.route.snapshot.params.id).subscribe(res => {
//     this.project = res;
//     this.rate = this.project.rate;

//     // if(this.project.status==''){
//     // this.project.status='pending';
//     // console.log(this.project.status);

//     // this.ProjectService.updateProject(
//     //   this.route.snapshot.params.id,
//     //   this.project
//     // ).subscribe((res) => {});
//     // }

//   });

// }

}
