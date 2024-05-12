import { Injectable } from "@angular/core";
import { ComponentsService } from "./components.service";
import { environment } from '../../environments/environment.development';
import { HttpClient } from "@angular/common/http";
import { DialogComponent } from "../components/dialog/dialog.component";
import { NbDialogService } from "@nebular/theme";
import { Reply } from "../models/Reply.model";
@Injectable({ providedIn: 'root' })
export class ConversationService {

  constructor(private componentsService: ComponentsService, private http: HttpClient, private dialogService: NbDialogService
  ) {

  }

  public sendMessage(event: any) {
    console.log('mensagem no servico de conversacao', event)
    //envia interação p/ tela
    const files = !event.files ? [] : event.files.map((file: any) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.componentsService.sendMsg({
      text: event.message,
      date: new Date(),
      reply: false,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
      },
    })

    //envia interação p/ o backend
    this.http.post(environment.apiUrl, { input: event.message }).subscribe({
      next: response => {
        const res = response as Reply
        const reply: string = res.output.generic[0].text
        this.componentsService.sendR({
          text: reply,
          date: new Date(),
          reply: true,
          type: 'text',
          files: files,
          user: {
            name: 'Seu parceiro WatsonX Assistant',
            avatar: 'https://gifer.com/pt/LCPT',
          },
        })
      },
      error: e => {
        const closeOnBackdropClick = true
        const hasBackdrop = true
        this.dialogService.open(DialogComponent, { closeOnBackdropClick, hasBackdrop, context:  {title: 'Erro', description: e.message ? e.message : JSON.stringify(e)} });

      },
      complete: () => { }
    })
  }
}