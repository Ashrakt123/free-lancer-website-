import { Component, OnInit } from '@angular/core';
import {Client } from 'src/app/_models/job';
import { JobsService } from 'src/app/service/jobs.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  val:number=3
  searchjob:String="";


  jobs:Client[]=[];

  constructor(public job: JobsService){}

  ngOnInit(): void {
    this.jobs=this.job.all();
  }


}





