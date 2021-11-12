import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  TopDevelopersURL= "http://127.0.0.1:8000/api/developers";
  baseApi= "http://127.0.0.1:8000/api/";
  photoApi="http://127.0.0.1:8000/api/upload/"
  userUrl = `${this.baseApi}users/`;
  headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')||'{}')
  })
  next: any;
  isLoggedin: boolean = false;
  constructor(private httpClient:HttpClient) { }
  checkCookie(){
    return this.httpClient.get("http://localhost:8000/sanctum/csrf-cookie");
  }
  register(user:any){
    return this.httpClient.post(this.baseApi + "register", user);
  }
  login(cred:any){
    return this.httpClient.post(this.baseApi + "login", cred,{withCredentials:true});
    // return this.httpClient.post(this.baseApi + "login", cred,{withCredentials:true}).pipe(
    //   catchError((error:any) => {
    //           if (error.status === 401) {
    //             return alert("error");
    //           }
    //           return alert(error);
    //       })
    //   );;

  }
  logout(){
    return this.httpClient.post(this.baseApi +"logout",{},{headers:this.headers});
  }
  // isLoggedIn() {

  //   if (JSON.parse(localStorage.getItem('token')!).auth_token == null) {
  //     this.isLoggedin = false;
  //     return this.isLoggedin;
  //   }
  //   else {
  //     return true;
  //   }
  // }
  // isLoggedIn() {

  //   if (JSON.parse(localStorage.getItem('token')!).auth_token =='{}') {
  //     this.isLoggedin = false;
  //     return this.isLoggedin;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  getAllUsers(){
    return this.httpClient.get(this.userUrl);
  }
  getUser(id:any){
    return this.httpClient.get(this.userUrl + id)
  }

  // get_logginUser(id:any,user:any){
  //   return this.httpClient.get(this.userUrl + id,{headers:this.headers});
  // }
  addUser(user:any){
    return this.httpClient.post(this.userUrl,user,{headers:this.headers});
  }
  updateUser(id:any,user:any){
    return this.httpClient.put(this.userUrl + id,user,{headers:this.headers});
  }
  deleteUser(id:any){
    return this.httpClient.delete(this.userUrl + id,{headers:this.headers});
  }
  uploadData(data:any,id:number){
    const head = new HttpHeaders;
    return this.httpClient.post(this.photoApi +id,data,{headers:head});

  }

  getUserCategory(id:any){
    return this.httpClient.get(this. userUrl +'category/'+id , {headers:this.headers});
  }



  getDevelopers(){
    return this.httpClient.get(this.TopDevelopersURL);
  }

}
