import { Component, OnInit } from '@angular/core';
import { CatagoriesService } from 'src/app/service/catagories.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models/user';
import { Catagory } from 'src/app/_models/catagory';
@Component({
  selector: 'app-selected-cat',
  templateUrl: './selected-cat.component.html',
  styleUrls: ['./selected-cat.component.css']
})
export class SelectedCatComponent implements OnInit {
   developers:User= new User();
   Developers:any=[];
   catagories:Catagory[]=[];
   searchCity:String="";
   searchName:String="";
   searchRate:any;

   catagory:any=[];
   categoryName:any;

   data:any ;
   id:any ;
  type:any ;
  constructor(public selectcat:CatagoriesService ,public ar:ActivatedRoute  ,private httpClient : HttpClient) { }


  //  retrievedObject = localStorage.getItem('data');


  ngOnInit(): void {

   /* this.httpClient.get("http://localhost:8000/api/categories/name").subscribe(res=>{
      console.log(res);
      this.Developers=res as User [] ;
    })*/

    console.log(this.data = JSON.parse(localStorage.getItem('data')!));
    // console.log(this.id = JSON.parse(localStorage.getItem('id')!));
    // console.log(this.type = JSON.parse(localStorage.getItem('type')!));
    // console.log('retrievedObject: ', JSON.parse(this.retrievedObject!))
    // console.log(localStorage.getItem('data'))


    this.view();
    this.httpClient.get("http://localhost:8000/api/categories/").subscribe(res=>{
      this.catagories=res as Catagory [] ;

    })
}
  view(){
    this.selectcat.getCatagory(this.ar.snapshot.params.name).subscribe(res=>{
         console.log(res);
         this.categoryName=this.ar.snapshot.params.name;
        this.Developers=res as User [] ;

      })
  }




  readonly:boolean=true;
  cancel:boolean=false;
}
