import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: Socket;
  url = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.url, {transports: ['websocket', 'pulling', 'flashsockert']});
  }

  joinRoom(data: any) {
    this.socket.emit('join', data);
  }

  sendMessage(data: any) {
    this.socket.emit('message', data);
  }

  getMessage() {
    return new Observable(observable => {
      this.socket.on('new message', (data) => {
        observable.next(data);
      })
    })
  }

}
