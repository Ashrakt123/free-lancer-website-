import { Pipe, PipeTransform } from '@angular/core';
import {Client } from 'src/app/_models/job';
@Pipe({
  name: 'job'
})
export class JobPipe implements PipeTransform {

  transform(jobs:Client[],  searchjob:String):Client[] {
    if (!jobs || !searchjob){
      return jobs ;
    }

    return jobs.filter(Client => 
      
     Client.name.toLowerCase().indexOf(searchjob.toLowerCase())  !==-1  


)
  }

}
