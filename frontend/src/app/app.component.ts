import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('messageBox') messageBox?: ElementRef;
  message?: string;
  messages: any[] = [
    { userId: 1, message: 'Kaise ho?' },
    { userId: 2, message: 'Hum to majeme hai' },
    { userId: 1, message: 'Kaise ho? Hum to majeme hai Hum to majeme hai' },
    { userId: 2, message: 'Hum to majeme hai Hum to majeme hai' },
    { userId: 1, message: 'Kaise ho?' },
    { userId: 2, message: 'Kaise ho? Hum to majeme hai Hum to majeme hai' },
    { userId: 1, message: 'Kaise ho?' },
    { userId: 2, message: 'Hum to majeme hai' },
    { userId: 1, message: 'Kaise ho? Hum to majeme hai Hum to majeme hai' },
    { userId: 2, message: 'Hum to majeme hai Hum to majeme hai' },
    { userId: 1, message: 'Kaise ho?' },
    { userId: 2, message: 'Kaise ho? Hum to majeme hai Hum to majeme hai' },
  ];
  loginUser: any = {
    id: null
  };
  userList = [
    {
      id: 1,
      name: 'Kalpesh Bhadane',
      image: './../assets/kalpesh.png'
    },
    {
      id: 2,
      name: 'Sau Bhadane',
      image: './../assets/sau-kalpesh.jpg'
    },
    {
      id: 3,
      name: 'Umesh Bhadane',
      image: './../assets/umesh.jpg'
    },
    {
      id: 4,
      name: 'Jyoti Bhadane',
      image: './../assets/bhau-vahini.jpg'
    },
    {
      id: 1,
      name: 'Kalpesh Bhadane',
      image: './../assets/kalpesh.png'
    },
    {
      id: 2,
      name: 'Sau Bhadane',
      image: './../assets/sau-kalpesh.jpg'
    },
    {
      id: 3,
      name: 'Umesh Bhadane',
      image: './../assets/umesh.jpg'
    }
  ]
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getMessage().subscribe((data: any) => {
      this.message = data.message;
      this.messages.push(data);
      this.scrollToBottom();
    });
  }

  sendMessage(newMessage: any) {
    this.message = newMessage.value;
    const messageData = { message: this.message, userId: this.loginUser.id };
    this.chatService.sendMessage(messageData);
    this.messages.push(messageData);
    this.message = newMessage.value = '';
    this.scrollToBottom();
  }
  login(loginUser: any) {
    this.loginUser.id = loginUser.value;
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      if (this.messageBox) {
        this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight+100;
        
      }
    } catch (err) {
      console.error('Scrolling failed', err);
    }
  }
}


