import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

// import { map, filter} from 'rxjs/operators';
// import { Observable } from 'rxjs';


@Component({
  selector: 'app-Passing-dynamic-data',
  templateUrl: './Passing-dynamic-data.component.html',
  styleUrls: ['./Passing-dynamic-data.component.css']
})
export class PassingDynamicDataComponent implements OnInit {

  passingdata: any;

  constructor(private router:Router, private activatedRoute:ActivatedRoute) {
    console.log(this.router.getCurrentNavigation()!.extras.state);
  }



  ngOnInit() {
    this.passingdata=history.state;
  }

}
