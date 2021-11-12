import { Pipe, PipeTransform } from '@angular/core';
import { Project } from 'src/app/_models/project';

@Pipe({
  name: 'project'
})
export class ProjectPipe implements PipeTransform {

  transform(projects:  Project [],searchjob:String):Project []{
    if (!projects || !searchjob){
      return projects ;
    }

    return projects.filter(Project => 
      
      Project.cat_name.toLowerCase().indexOf(searchjob.toLowerCase())  !==-1  


)



  }

}
