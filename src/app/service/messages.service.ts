import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  onlineUser: User = new User();
  xx:any;
  sender_id:any;
  userData: any;
  BaseUrl = 'http://127.0.0.1:8000/api/realTimeChat/';
  headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')||'{}')
  })
  constructor(private httpClient: HttpClient , private userservice: UserService) { }

  getMessages(reciever_id:any , sender_id:any){
    this.xx = this.BaseUrl + reciever_id + "/" + sender_id;
    return this.httpClient.get(this.xx);

  }

  addMessage(message:any){

    return this.httpClient.post(this.BaseUrl,message,{headers:this.headers});
  }

  getUser(id: any) {
    return this.userservice.getUser(id).subscribe((res) => {
      this.userData = res;
      this.onlineUser = this.userData;
      console.log(this.onlineUser.type);

    });
  }


  ngOnInit(): void {

    this.onlineUser.id = localStorage.getItem('id');
    this.getUser(this.onlineUser.id);
  }
}
