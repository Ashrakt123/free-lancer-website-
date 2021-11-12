import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/_models/user';
@Pipe({
  name: 'review'
})
export class ReviewPipe implements PipeTransform {
  
 transform( Developers:User[],searchRate:string): User[]  {
   
    if (!Developers || !searchRate){
      return Developers ;
    }
      
    return Developers.filter(User =>
      User.rate.toString().toLocaleLowerCase().includes(searchRate.toLocaleLowerCase()) 

   )
  }
  
}
