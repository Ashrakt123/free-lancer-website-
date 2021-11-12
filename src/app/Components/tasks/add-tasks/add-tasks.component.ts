import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { UserService } from 'src/app/service/user.service';
import { Task } from 'src/app/_models/task';
import { User } from 'src/app/_models/user';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/service/project.service';
import { PurposalService } from 'src/app/service/purposal.service';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css'],
})
export class AddTasksComponent implements OnInit {
  project: any = [];
  task: Task = new Task();
  form: FormGroup;
  submitted = false;
  taskData: any;
  user = new User();
  title: string = 'hello';
  data: any;
  userData: any;
  onlineUser: User = new User();

  purposal: any = [];
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    private ProjectService: ProjectService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private purposalService: PurposalService,

  ) {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      task: [null],
      project_id: [null],
      developer_id: [null],
      owner_id: [null],
      submitted:[null],
      accepted:[null]
    });
  }

  ngOnInit(): void {
    this.onlineUser.id = localStorage.getItem('id');
    this.getUser(this.onlineUser.id);
    this.getProposal();
  }

  get formControl() {
    return this.form.controls;
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({
      task: file,
    });
    this.form.get('file')?.updateValueAndValidity();
    console.log(file);
  }

  getProposal() {
    this.purposalService
      .getPurposal(this.route.snapshot.params.id)
      .subscribe((res) => {
        this.purposal = res;
      });
  }

  onSubmit() {

    const formData: any = new FormData();
    this.submitted = true;

    if (this.form.valid) {
      formData.append('description', this.form.get('description')?.value);
      formData.append('task', this.form.get('task')?.value);
      formData.append('project_id', this.purposal.project_id);
      formData.append('developer_id', this.onlineUser.id);
      formData.append('owner_id', this.purposal.owner_id);
      formData.append('submitted', 1);
      
      this.taskService
        .addTask(formData, this.onlineUser.id)
        .subscribe((response) => {});
        console.table(this.form.value);
        this.router.navigate(['/dashboard']);
      }else {
      console.log('enter valid data');

    }

  }
  
  getUser(id: any) {
    return this.userService.getUser(id).subscribe((res) => {
      this.userData = res;
      this.onlineUser = this.userData;
      console.log(this.onlineUser.type);
    });
  }



}
