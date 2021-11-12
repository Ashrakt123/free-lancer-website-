import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/_models/task';
import { UserService } from 'src/app/service/user.service';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/service/project.service';
import { User } from 'src/app/_models/user';
import { PurposalService } from 'src/app/service/purposal.service';
import { Purposal } from 'src/app/_models/purposal';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css'],
})
export class ViewTasksComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private taskService: TaskService,
    private router: Router,
    private ProjectService: ProjectService,
    private purposalservice: PurposalService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  project: any = [];
  data: any;
  user = new User();
  url: any;
  userData: any;
  onlineUser: User = new User();
  task: Task = new Task();

  ngOnInit(): void {
    this.onlineUser.id = localStorage.getItem('id');
    this.getUser(this.onlineUser.id);
    this.getTask();
  }

  getTask() {
    this.taskService.getTask(this.route.snapshot.params.id).subscribe((res) => {
      this.data = res;
      this.task = this.data;
    });
  }

  getUser(id: any) {
    return this.userService.getUser(id).subscribe((res) => {
      this.userData = res;
      this.onlineUser = this.userData;
      console.log(this.onlineUser.type);
    });
  }

  download() {
    const blob = this.ProjectService.download(this.project.file).subscribe(
      (blob) => {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          window.URL.createObjectURL(blob)
        );
      }
    );
  }
}
