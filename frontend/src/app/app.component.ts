import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  message = 'frontend';
  messages: string[] = [];
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getMessage().subscribe((data: any) => {
      this.message = data.message;
      this.messages.push(this.message);
    });
  }

  sendMessage() {
    this.chatService.sendMessage({ message: this.message });
    this.messages.push(this.message);
    this.message = '';
  }
}
