import { Inject, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ChatMessage } from "../models/ChatMessage.model";

@Injectable({providedIn: 'root'})
export class ComponentsService {

    public sendMessage: Subject<ChatMessage> = new Subject<ChatMessage>();
    public sendReply: Subject<string> = new Subject<string>();

    public sendMsg(ChatMessage: ChatMessage) {
        return this.sendMessage.next(ChatMessage)
    }

    public sendR(reply: any) {
        this.sendReply.next(reply)
    }
}