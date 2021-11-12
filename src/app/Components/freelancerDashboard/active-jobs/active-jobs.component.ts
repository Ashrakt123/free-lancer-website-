import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { PurposalService } from 'src/app/service/purposal.service';
import { Project } from 'src/app/_models/project';
import { Purposal } from 'src/app/_models/purposal';
@Component({
  selector: 'app-active-jobs',
  templateUrl: './active-jobs.component.html',
  styleUrls: ['./active-jobs.component.css'],
})
export class ActiveJobsComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
   private route: Router,
    private proposalService: PurposalService,
    private routee: ActivatedRoute,) {}
  ActivProjects: any = [];
  data: any;
  userId: any;
  empty: boolean = true;
  proposal: any = [];
  my:any
  purposal: any = [];
  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.getActiveProjects(this.userId);
  }
  async getActiveProjects(id: any) {
    const active = await this.projectService.getActiveProjects(id).toPromise();
    let res = active;
    this.data = res;
    this.ActivProjects = this.data;
    if (this.ActivProjects.length != 0) this.empty = false;
    this.getProposal();
  }viewProject(proposalId:any) {
    console.log(proposalId);

    this.route.navigate(['/viewAcceptPurposal/' + proposalId]);
  }
  async getProposal() {
    let i = 0;
    for (let project of this.ActivProjects) {
 const proposal = await this.proposalService
        .getProposalOfProject(project.id, this.userId)
        .toPromise();

      this.proposal = proposal;
     this.ActivProjects[i].proposalId = this.proposal[0].id;
      i++;
    }
  }
}
