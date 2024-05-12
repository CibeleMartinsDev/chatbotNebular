import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: any[];

  constructor(private conversationService:ConversationService, private componentsService: ComponentsService) {
    this.messages = []
  }

  ngOnInit() {
    this.componentsService.sendMessage.subscribe(message => this.messages.push(message))
    this.componentsService.sendReply.subscribe(reply => this.messages.push(reply))
  }

  public sendMessage(event: any) {
    this.conversationService.sendMessage(event)
  }
}
