import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  BaseUrl = 'http://127.0.0.1:8000/api/messages';
    constructor(private httpClient:HttpClient){
    }
    headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')||'{}')
    })
    sendMessage(message:any){

        return this.httpClient.post(this.BaseUrl,message),{headers:this.headers};
      }

}
