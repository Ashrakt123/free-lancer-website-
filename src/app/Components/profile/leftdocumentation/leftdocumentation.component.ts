import { Component, OnInit } from '@angular/core';
import { faCertificate, faCheckDouble, faFileContract, faFileSignature, faSignal, faUserCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-leftdocumentaion',
  templateUrl: './leftdocumentation.component.html',
  styleUrls: ['./leftdocumentation.component.css']
})
export class LeftdocumentationComponent implements OnInit {

  constructor() { }
  faFileContract=faFileSignature;
  faBadgeCheck=faCheckDouble;
  faUserCheck=faUserCheck;
  ngOnInit(): void {
  }

}
