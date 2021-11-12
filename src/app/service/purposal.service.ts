import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PurposalService {

  constructor(private httpClient:HttpClient) { }

  baseUrl="http://localhost:8000/api/purposal/";
  // PurposalURL= "http://127.0.0.1:8000/api/purposal";
  headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')||'{}')
  })

  getAllPurposals(projectId:any){
    return this.httpClient.get(this.baseUrl+'all/'+projectId );
  }
  getPurposal(id:any){
    return this.httpClient.get(this.baseUrl + id)
  }

  addPurposal(purposal:any){
    return this.httpClient.post(this.baseUrl , purposal ,{headers:this.headers}) ;
  }

  updatePurposal(id:any,purposal:any){
    return this.httpClient.put(`${this.baseUrl}${id}`, purposal ,{headers:this.headers});
  }
  getProposalOfProject(projectID:any , userId : any){
    return this.httpClient.get(this.baseUrl +'project/'+ projectID+'/'+ userId);
  }
}
