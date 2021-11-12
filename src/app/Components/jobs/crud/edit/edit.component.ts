import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/service/project.service';
import { CatagoriesService } from 'src/app/service/catagories.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor( 
    private route: ActivatedRoute,
    private ProjectService:ProjectService,
    private router: Router,
    public catlist:CatagoriesService
    ){ }

  //  project:Project = new Project ();
     data: any;
     project:any=[];
     allcatagories:any=[];

  ngOnInit(): void {
    this. ProjectService
      .getProject(this.route.snapshot.params.id)
      .subscribe((res) => {
        this.data = res;
        this.project= this.data;
        console.log( this.project);
      });
      this.getAllCatagories();
  }
  updateProject() {
    this.ProjectService
      .updateProject(this.route.snapshot.params.id, this.project)
      .subscribe((res) => {
        return this.router.navigate(['listproject']);
      });
  }
  getAllCatagories(){
    return this.catlist.getAllCatagories().subscribe(res =>{
       console.log(res);
       this.allcatagories=res;
     }
     )
   }
  

}
