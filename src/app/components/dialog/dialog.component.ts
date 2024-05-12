import { Component, Input } from '@angular/core';
import { NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input() title!: string;
  @Input() description!: string;

  constructor(protected dialogRef: NbDialogRef<DialogComponent>) {
  }

  public close() {
    this.dialogRef.close();
  }
}
