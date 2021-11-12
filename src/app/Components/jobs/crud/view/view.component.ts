import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/service/project.service';
import { ReviewsService } from 'src/app/service/reviews.service';
import { Review } from 'src/app/_models/review';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/service/user.service';
import { PurposalService } from 'src/app/service/purposal.service';
import { Purposal } from 'src/app/_models/purposal';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {MenuItem} from 'primeng/api';
import { TaskService } from 'src/app/service/task.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private ProjectService: ProjectService,
    private router: Router,
    private ReviewService: ReviewsService,
    private userservice: UserService,
    private purposalservice: PurposalService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  project: any = [];
  rate: any = 0;
  review = new Review();
  data: any;
  status: any;
  user = new User();
  purposal: any = [];
  allpurposals: any = [];
  url: any;
  //  project:Project = new Project ()
  userData: any;
  onlineUser: User = new User();
  user_of_purposal: any = [];
  hide: boolean = false;

  rate_pro: number = 0;
  items: MenuItem[] = [];
  isImage = false ;

  ngOnInit(): void {
    this.onlineUser.id = localStorage.getItem('id');
    this.getUser(this.onlineUser.id);

    this.view();
    this.showreview();


  }

  getUser(id: any) {
    return this.userservice.getUser(id).subscribe((res) => {
      this.userData = res;
      this.onlineUser = this.userData;
      console.log(this.onlineUser.type);
    });
  }

  view() {
    this.ProjectService.getProject(this.route.snapshot.params.id).subscribe(
      (res) => {
        this.project = res;
        this.rate = this.project.user_rate;
        this.status = this.project.status;

        // this.showreview

        this.url = '/api/download/' + this.project.file;
        if(this.project.file.split('.').pop() == 'jpg' || 'png' || 'jpeg'){
          this.isImage = true ;
          console.log(this.project.file.split('.').pop() , this.isImage);
        }
        this.download();
        this.get_allpurposal();

        // localStorage.setItem('project_id',JSON.stringify((this.project.id)));
      });
    this.items = [
      {label: 'Edit', icon: 'pi pi-refresh', routerLink: [`/editproject/${this.route.snapshot.params.id}`]},
      {separator:true},
      {label: 'Delete', icon: 'pi pi-times', command: () => {
         return this.ProjectService.deleteProject(this.project.id).subscribe(res => {
            this.router.navigate(['listproject']);
          });
      }},
    ];
  }

  showreview() {
    this.ReviewService.showreviews(this.route.snapshot.params.id).subscribe(
      (response) => {
        this.data = response;
        console.log(this.data);
      }
    );
  }
  canSubmit = true;
  get_allpurposal() {
    this.purposalservice.getAllPurposals(this.project.id).subscribe((purposalres) => {
      // this.purposal.project_id=this.project.id

        //   // this.purposalservice.getPurposal(this.route.snapshot.params.id).subscribe( response => {
        //   //   this.purposal=response;
        //   this.userservice.getUser(this.purposal.developer_id).subscribe(res => {
        //     this.user_of_purposal=res;

        //     console.log(res);
        //   });
        // // });
        this.allpurposals = purposalres;
        console.log(this.allpurposals);

        for (let item of this.allpurposals) {
          if (item.developer_id == this.onlineUser.id) {
            console.log(item.developer_id);
            console.log(this.onlineUser.id);
            this.canSubmit = false;

            console.log(this.canSubmit);
            this.userservice.getUser(this.purposal.developer_id).subscribe(res => {
                  this.user_of_purposal=res;

                  console.log(res);
                });
            // this.canSubmit = false ;
            break;
          }

      }
    });
    // this.allpurposals.forEach( function (element){
    //   // if (element.developer_id == this.onlineUser.id){
    //     // this.canSubmit = false ;
    //     console.log(element.developer_id);

    //   // }
    // });
  }






  accept_purposal() {
    // this.project.status = 'processing';
    this.ProjectService.getProject(this.route.snapshot.params.id).subscribe(
      (res) => {
        this.project = res;
        this.project.status = 'processing';
        console.log(this.project.status);

        this.ProjectService.updateProject(
          this.route.snapshot.params.id,
          this.project
        ).subscribe((res) => {});
      }
    );
  }

  download() {
    // this.ProjectService
    //   .download(this.url)
    //   .subscribe(blob => saveAs(blob, this.project.file))
    // const blob = this.ProjectService.download(this.url).subscribe(
    const blob = this.ProjectService.download(this.project.file).subscribe(
      (blob) => {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          window.URL.createObjectURL(blob)
        );
      }
    );
  }
  updateProject(){
  }

  activeEdit(){
    if(this.onlineUser.type == 'client' && this.project.status == 'pending' && this.onlineUser.id ==this.project.owner_id ){
      return true ;
    } else {
      return false ;
    }
}
}
