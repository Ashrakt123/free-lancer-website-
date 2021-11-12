import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/_models/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

 
 
  model:Contact = new Contact();
 // mes=false;
  //submitted = false;
  /*onSubmit(){ 
    this.submitted = true; }*/

data:any;
  constructor(private route: ActivatedRoute,private contactService: ProjectService) {}

  ngOnInit(): void {
      this.save();
      
}

 save(){
  return this.contactService.contact(this.model).subscribe(res => {
     this.data= res ;
     console.log(res);
    
  });
 

  }






  

 
  

}
