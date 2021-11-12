import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessagesService } from 'src/app/service/messages.service';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  Message:any = new Message();
  message :any = 'message';
  SentMessage :Message = new Message();

  sender_id:any=1;
  constructor(private messagesService : MessagesService , private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.SentMessage.reciever_id = this.route.snapshot.params.id;
    console.log(this.route.snapshot.params.id);
    this.SentMessage.sender_id = this.sender_id;
    this.SentMessage.message = 'message';
    this.getAllMessages()
  }

  getAllMessages(){
    return this.messagesService.getMessages(this.route.snapshot.params.id , this.sender_id).subscribe(res=>{
      this.Message = res;
      console.log(this.Message);
    })
  }
  addmessage(){
    return this.messagesService.addMessage(this.SentMessage).subscribe(res => {
      console.log(this.SentMessage);
    })
   }

}
