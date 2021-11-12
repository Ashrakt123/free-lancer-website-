import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private httpClient:HttpClient) { }

  apiURL = "http://127.0.0.1:8000/api/";
  baseURL = "http://127.0.0.1:8000/api/portfolio/";
  headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')||'{}')
  })

  getAllPortfolio(id:any){
    return this.httpClient.get(this.baseURL+'all/'+id);
  }

  getPortfolio(id:any){
    return this.httpClient.get(`${this.baseURL}${id}`)
  }

  addPortfolio(portfolio:any , id:any){
    return this.httpClient.post(this.baseURL+id , portfolio );
}

  updatePortfolio(id:any,Portfolio:any){
    return this.httpClient.put(`${this.baseURL}${id}`,Portfolio,{headers:this.headers});
  }
  deletePortfolio(id:any){
    return this.httpClient.delete(this.baseURL + id,{headers:this.headers});
  }

  countPortfolio(user_id:any){
    return this.httpClient.get(`${this.baseURL}count/${user_id}`);
  }

  // upload(data :any , id:any){
  //   return this.httpClient.post(`${this.baseURL}upload/${id}`,data );
  // }


}
