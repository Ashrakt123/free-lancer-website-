import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Catagory } from '../_models/catagory';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatagoriesService {
  allcatagories:any=[];

    baseURL = "http://localhost:8000/api/categories";


  constructor(public r:Router , private httpClient : HttpClient) { }

    getAllCatagories(){

      return this.httpClient.get(this.baseURL);
  }
  getCatagory(name:any){
    return this.httpClient.get(this.baseURL+name )
  }
 
  
}
