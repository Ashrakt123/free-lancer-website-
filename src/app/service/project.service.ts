import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { Contact } from 'src/app/_models/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {



  constructor(private httpClient:HttpClient) { }

  TopDevelopersURL= "http://127.0.0.1:8000/api/developers";
  baseUrl="http://localhost:8000/api/project/";
  Url="http://localhost:8000/api/contact";
  RUrl="http://localhost:8000/api//review/";
  MostProjectsURL= "http://localhost:8000/api/mostProjects";
  headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')||'{}')
  })

  getAllProject(){
    return this.httpClient.get(this.MostProjectsURL);
  }

  getAllProjects(){
    return this.httpClient.get(this.baseUrl);
  }
  getProject(id:any){
    return this.httpClient.get(this.baseUrl + id)
  }

  addPortproject(project:any , id :any){
    return this.httpClient.post(this.baseUrl+id , project ) ;
  }

  updateProject(id:any,project:any){
    return this.httpClient.put(`${this.baseUrl}${id}`, project );
  }


  deleteProject(id:any){
    return this.httpClient.delete(this. baseUrl + id);
  }

  countProjects(id :any , status:any){
    return this.httpClient.get(this. baseUrl +'count/'+id+'/'+status);
  }

  getActiveProjects(id:any){
    return this.httpClient.get(this. baseUrl +'active/'+ id);
  }

  getRecentProject(category_id:any){
    return this.httpClient.get(this. baseUrl +'recent/'+category_id);
  }

  getProjects(){
    return this.httpClient.get(this.MostProjectsURL);
  }

  getDevelopers(){
    return this.httpClient.get(this.TopDevelopersURL);
  }
  contact(ob:any){

    return this.httpClient.post(this.Url,ob);

  }

  download(fileName: string): Observable <Blob> {
    return this.httpClient.get(fileName, {
      responseType: 'blob'
    })
  }


}


