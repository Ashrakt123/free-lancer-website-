import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/_models/user';
import { CatagoriesService } from 'src/app/service/catagories.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './file.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  Project: Project = new Project();
  allcatagories: any = [];
  user = new User();
  data: any;
  submitted = false;

  constructor(
    private ProjectService: ProjectService,
    private formBuilder: FormBuilder,
    private router: Router,
    public catlist: CatagoriesService,
    private userservice: UserService
  ) {
    this.form = this.formBuilder.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      budget: [null,Validators.required],
      location: ['',Validators.required],
      categeory: [null,Validators.required],
      file:[null]
    });
  }

  multiple: boolean = true;
  userData: any;
  onlineUser: User = new User();

  ngOnInit(): void {
    this.onlineUser.id = localStorage.getItem('id');
    this.getUser(this.onlineUser.id);

    /*this.Project.developer_id=0;
    this.Project.owner_id=0;
    this.Project.rate=0;
    this.Project.status=" ";
    this.Project.final_price=0;*/

    this.getAllCatagories();
  }

  get formControl() {
    return this.form.controls;
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({
      file: file,
    });
    this.form.get('file')?.updateValueAndValidity();
    console.log(file);
  }

  onSubmit() {
    console.log(this.form.value);
    var formData: any = new FormData();
    this.submitted = true;
    if (this.form.valid) {

    formData.append('title', this.form.get('title')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('budget', this.form.get('budget')?.value);
    formData.append('location', this.form.get('location')?.value);
    formData.append('categeory', this.form.get('categeory')?.value);
    formData.append('file', this.form.get('file')?.value);

    this.ProjectService.addPortproject(formData, this.onlineUser.id).subscribe((res) => {
      console.log(res);
      this.router.navigate(['listproject']);
    });
  }else{
    console.log("Enter Valid Data");
  }
  }


  getUser(id: any) {
    return this.userservice.getUser(id).subscribe((res) => {
      this.userData = res;
      this.onlineUser = this.userData;
      console.log(this.onlineUser.type);
    });
  }






  // addproject() {
  //   this.Project.owner_id = this.onlineUser.id;
  //   return this.ProjectService.addPortproject(this.Project).subscribe((res) => {
  //     console.log(this.Project.category_id);
  //     this.router.navigate(['listproject']);
  //   });
  // }

  getAllCatagories() {
    return this.catlist.getAllCatagories().subscribe((res) => {
      console.log(res);
      this.allcatagories = res;
    });
  }
}
