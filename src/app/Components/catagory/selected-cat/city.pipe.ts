import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/_models/user';
@Pipe({
  name: 'city'
})
export class CityPipe implements PipeTransform {

  transform(Developers:User[]=[],  searchCity:String): User[] {
          if (!Developers || !searchCity){
            return Developers ;
          }

          return Developers.filter(User =>

            User.city.toLowerCase().indexOf(searchCity.toLowerCase())  !==-1


    )
  }

}
