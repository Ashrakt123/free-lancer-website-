import { Injectable } from '@angular/core';
import {Client } from 'src/app/_models/job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor() { }

  private jobs:Client[]=[
    new Client(1 , "android" ,"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",3,150,120 ,"mansuora","processing",new Date("1-3-2020") ,new Date("5-1-2020 ")),
    new Client(2 , "IOS" ,"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",3,130,100 ,"cairo","processing",new Date ("1-3-2020") ,new Date("5-5-2020 ")) ,
    new Client(3 , "PHP Developer" ,"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",3,100,170 ,"cairo","processing",new Date ("4-4-2020") ,new Date("4-5-2020 ")),
    new Client(4 , "web" ,"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",3,150,120 ,"elx","processing",new Date ("1-1-2020") ,new Date("5-1-2020 ") )

   ];
   
 all(){
  return this. jobs ;
}

}